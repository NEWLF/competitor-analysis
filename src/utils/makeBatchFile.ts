import { defaultPrompt } from "constants/defaultPrompt";

export function maekBatchFile(
  list: {
    id: string;
    data: { id: number; content: string }[];
  }[]
) {
  return list
    .map((item) => makeBatchJob(item.id, item.data))
    .map((i) => JSON.stringify(i))
    .join("\n");
}

export function makeBatchJob(
  id: string,
  data: { id: number; content: string }[]
) {
  return {
    custom_id: id,
    method: "POST",
    url: "/v1/chat/completions",
    body: {
      model: "gpt-4o",
      messages: [
        { role: "system", content: defaultPrompt },
        {
          role: "user",
          content: JSON.stringify(
            data.map((i, idx) => ({ id: idx, content: i.content })),
            null,
            2
          ),
        },
      ],
      functions: [
        {
          name: "summarize",
          description: "",
          parameters: {
            type: "object",
            properties: {
              summary: {
                type: "string",
                description: "Summary of the overall sentiment",
              },
              pros: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    0: {
                      type: "number",
                      description: "Uniq id of pro",
                    },
                    1: { type: "string", description: "Title of the pro" },
                    2: {
                      type: "string",
                      description: "Detailed summarized reviews of the pro",
                    },
                    3: {
                      type: "array",
                      items: {
                        type: "string",
                        description: "List of relevant review IDs",
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
                      description: "Uniq id of con",
                    },
                    1: { type: "string", description: "Title of the con" },
                    2: {
                      type: "string",
                      description: "Detailed summarized reviews of the con",
                    },
                    3: {
                      type: "array",
                      items: {
                        type: "string",
                        description: "List of relevant review IDs",
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
    },
  };
}
