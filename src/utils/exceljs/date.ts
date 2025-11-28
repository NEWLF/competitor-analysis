// y, m, d 토큰을 순서대로 뽑아내는 유틸
const extractDateTokens = (format: string) => {
  type Token = { type: "y" | "M" | "d"; length: number };

  const tokens: Token[] = [];
  let i = 0;

  while (i < format.length) {
    const ch = format[i];

    if (/[yY]/.test(ch)) {
      let len = 1;
      let j = i + 1;
      while (j < format.length && /[yY]/.test(format[j])) {
        len++;
        j++;
      }
      tokens.push({ type: "y", length: len >= 4 ? 4 : len });
      i = j;
      continue;
    }

    if (/[mM]/.test(ch)) {
      let len = 1;
      let j = i + 1;
      while (j < format.length && /[mM]/.test(format[j])) {
        len++;
        j++;
      }
      tokens.push({ type: "M", length: 2 }); // 월은 보통 2자리로 취급
      i = j;
      continue;
    }

    if (/[dD]/.test(ch)) {
      let len = 1;
      let j = i + 1;
      while (j < format.length && /[dD]/.test(format[j])) {
        len++;
        j++;
      }
      tokens.push({ type: "d", length: 2 }); // 일도 보통 2자리로 취급
      i = j;
      continue;
    }

    i++;
  }

  return tokens;
};

// 정규식에서 사용할 리터럴 escape
const escapeRegExp = (str: string) =>
  str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

const parseDateValue = (raw: any, format?: string): Date | null => {
  if (!raw || !format) return null;

  if (raw instanceof Date && !isNaN(raw.getTime())) {
    return raw;
  }

  const str = String(raw).trim();
  if (!str) return null;

  const tokens = extractDateTokens(format);
  if (!tokens.length) return null;

  // 1) 구분자가 포함된 문자열 형태 먼저 시도 (예: '2025.12.31', '2025/12/31')
  let regexStr = "";
  let lastIndex = 0;
  const TOKEN_REGEX = /(y+|Y+|m+|M+|d+|D+)/g;
  let match: RegExpExecArray | null;

  while ((match = TOKEN_REGEX.exec(format)) !== null) {
    // 토큰 앞의 리터럴(구분자 등)
    if (match.index > lastIndex) {
      const literal = format.slice(lastIndex, match.index);
      regexStr += escapeRegExp(literal);
    }

    // 토큰 자체는 숫자 캡처 그룹으로
    const token = match[0];
    regexStr += "(\\d{1,4})"; // 유연하게 1~4자리 허용
    lastIndex = match.index + token.length;
  }

  if (lastIndex < format.length) {
    const literal = format.slice(lastIndex);
    regexStr += escapeRegExp(literal);
  }

  const regex = new RegExp(`^${regexStr}$`);
  const m = regex.exec(str);

  let year: number | undefined;
  let month: number | undefined;
  let day: number | undefined;

  if (m) {
    // 정규식 그룹 순서대로 tokens에 매핑
    let groupIndex = 1;
    tokens.forEach((t) => {
      const part = m![groupIndex++];
      const v = part ? parseInt(part, 10) : NaN;

      if (Number.isNaN(v)) return;

      if (t.type === "y") year = v;
      if (t.type === "M") month = v;
      if (t.type === "d") day = v;
    });
  } else {
    // 2) 숫자만 꽉 찬 형태 시도 (예: '202512', '20251231')
    const digits = str.replace(/\D/g, "");
    if (!digits) return null;

    const totalLenForCompact = tokens.reduce((sum, t) => {
      if (t.type === "y") return sum + (t.length >= 4 ? 4 : 2);
      return sum + 2;
    }, 0);

    if (digits.length !== totalLenForCompact) {
      // 길이가 안 맞으면 포기
      return null;
    }

    let pos = 0;
    tokens.forEach((t) => {
      const len = t.type === "y" ? (t.length >= 4 ? 4 : 2) : 2;
      const part = digits.slice(pos, pos + len);
      pos += len;

      const v = parseInt(part, 10);
      if (Number.isNaN(v)) return;

      if (t.type === "y") {
        year = len === 2 ? 2000 + v : v; // 2자리 연도일 경우 2000년대 가정
      }
      if (t.type === "M") month = v;
      if (t.type === "d") day = v;
    });
  }

  if (!year) return null;
  if (!month || month < 1 || month > 12) month = 1;
  if (!day || day < 1 || day > 31) day = 1;

  const date = new Date(year, month - 1, day);
  if (isNaN(date.getTime())) return null;

  return date;
};

export { parseDateValue };
