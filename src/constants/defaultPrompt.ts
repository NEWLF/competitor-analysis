import { Result } from "types/Result";

export const defaultPrompt = `
아래 상품평 리뷰를 분석하여 총점, 장점, 개선점을 요약해줘
1. 요약된 장점, 개선점과 관련된 모든 리뷰 ID를 함께 제공해줘. 유사한 내용의 장단점이 중복되지 않도록 해줘.
2. 예시 총평: "많은 구매고객들이 제품의 품질, 편안한 착용감, 그리고 스타일에 만족해하고 있습니다. 이로 인해 여러 명이 재구매 의사를 밝히고 있으며, 선물로도 많이 구매하고 있습니다."
3. 예시 장점: "린넨 소재로 시원하며, 살짝 구김이 있지만 고급스러운 느낌을 줍니다. 여름철에 적합한 시원한 착용감을 제공합니다."
4. 예시 개선점: "단추와 마감 품질에서 개선이 필요하다는 의견이 있으며, 일부 구매고객들은 단추가 튼튼하지 않다고 언급합니다."
5. 고객이나 리뷰어를 지칠할 때는 '구매고객' 이라고 해줘.
6. 요약은 만연체로 작성해줘.
`;

export const combiningPrompt = (prevResult: Result) =>
  defaultPrompt +
  `
        This is privous summary :
        ${JSON.stringify({
          summary: prevResult.summary,
          pros: prevResult.pros,
          cons: prevResult.cons,
        })}
        
        Analyze the following reviews and combine it with the previous summary. If there are any newly analyzed pros and cons, please add them.:`;
