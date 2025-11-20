import { flatMap, groupBy, orderBy, uniq } from "lodash";
import OpenAI from "openai";
import { Result } from "types/Result";

export async function requestFirst(
  prompt: string,
  data: { id: number; content: string }[]
) {
  const client = new OpenAI({
    apiKey: "",
    dangerouslyAllowBrowser: true,
  });
  const completion = await client.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.9,
    functions: [
      {
        name: "summarize",
        description: "",
        parameters: {
          type: "object",
          properties: {
            summary: {
              type: "string",
              description: "리뷰에 대한 전체적인 요약 총평",
            },
            pros: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  0: {
                    type: "number",
                    description: "해당 장점의 고유 ID",
                  },
                  1: { type: "string", description: "장점의 제목" },
                  2: {
                    type: "string",
                    description: "장점에 대한 구체적인 내용",
                  },
                  3: {
                    type: "array",
                    items: {
                      type: "string",
                      description: "해당 장점에 관련된 리뷰의 ID",
                    },
                  },
                },
              },
            },
            cons: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  0: {
                    type: "number",
                    description: "개선점의 고유 ID",
                  },
                  1: { type: "string", description: "개선점의 제목" },
                  2: {
                    type: "string",
                    description: "개선점에 대한 구체적인 내용",
                  },
                  3: {
                    type: "array",
                    items: {
                      type: "string",
                      description: "해당 개선점에 관련된 리뷰의 ID",
                    },
                  },
                },
              },
            },
          },
          required: ["summary"],
        },
      },
    ],
    function_call: { name: "summarize" },
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: JSON.stringify(
          data.map((i, idx) => ({ id: idx, content: i.content })),
          null,
          2
        ),
      },
    ],
  });

  const parsed = JSON.parse(
    completion.choices[0].message.function_call.arguments
  );
  return {
    ...parsed,
    pros: orderBy(
      parsed.pros.map((i) => [
        i[0],
        i[1],
        i[2],
        i[3].map((idx) => data[idx]?.id).filter((i) => !!i),
      ]),
      (i) => i[3].length,
      "desc"
    ).slice(0, 5),
    cons: orderBy(
      parsed.cons.map((i) => [
        i[0],
        i[1],
        i[2],
        i[3].map((idx) => data[idx]?.id).filter((i) => !!i),
      ]),
      (i) => i[3].length,
      "desc"
    ).slice(0, 5),
    usage: completion.usage,
    source: data,
  };
}

export function combineResults(prev: Result, data2: Result) {
  return {
    ...data2,
    pros: orderBy(
      Object.entries(groupBy([...data2.pros, ...prev.pros], (i) => i[0])).map(
        ([, i]) => [
          i[0][0],
          i[0][1],
          i[0][2],
          uniq(flatMap(i.map((i2) => i2[3]))),
        ]
      ),
      (i: [number, string, string, number[]]) => i[3].length,
      "desc"
    ).slice(0, 5),
    cons: orderBy(
      Object.entries(groupBy([...data2.cons, ...prev.cons], (i) => i[0])).map(
        ([, i]) => [
          i[0][0],
          i[0][1],
          i[0][2],
          uniq(flatMap(i.map((i2) => i2[3]))),
        ]
      ),
      (i: [number, string, string, number[]]) => i[3].length,
      "desc"
    ).slice(0, 5),
  };
}
