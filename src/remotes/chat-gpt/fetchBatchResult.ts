import { GPT_API_KEY } from "constants/GPT_API_KEY";
import { orderBy } from "lodash";
import OpenAI from "openai";

export async function fetchBatchResult() {
  const client = new OpenAI({
    apiKey: GPT_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const list = await client.batches.list();
  for (const item of list.data) {
    const res = await client.files.content(item.output_file_id);
    const content = await res.text();
    const result = content
      .split("\n")
      .filter((line) => !!line)
      .map((line) => {
        const completion = JSON.parse(line).response.body;
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
              i[3],
              // i[3].map((idx) => data[idx]?.id).filter((i) => !!i),
            ]),
            (i) => i[3].length,
            "desc"
          ).slice(0, 5),
          cons: orderBy(
            parsed.cons.map((i) => [
              i[0],
              i[1],
              i[2],
              i[3],
              // i[3].map((idx) => data[idx]?.id).filter((i) => !!i),
            ]),
            (i) => i[3].length,
            "desc"
          ).slice(0, 5),
          usage: completion.usage,
          // source: data,
        };
      });
    console.log(result);
  }
}
