import { range } from "lodash";
import { ReactNode } from "react";
import { SummaryData } from "remotes/legacy/procedure/fetchList";

export function setHighlight(content: string, key: string, data: SummaryData) {
  const result: ReactNode[] = [];
  let lastIndex = 0;

  for (const idx of range(1, 11)) {
    const strIndex = data[`STR_${key}_${idx.toString().padStart(2, "0")}`];
    const endIdx = data[`END_${key}_${idx.toString().padStart(2, "0")}`];
    if (endIdx == null) {
      break;
    }
    result.push(content.substring(lastIndex, strIndex));
    result.push(
      <span style={{ background: "#ffead3" }}>
        {content.substring(strIndex, endIdx)}
      </span>
    );
    lastIndex = endIdx;
  }
  result.push(content.substring(lastIndex));
  return result;
}
