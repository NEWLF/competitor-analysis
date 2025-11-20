import { GPT_API_KEY } from "constants/GPT_API_KEY";
import OpenAI from "openai";
import { selectFile } from "utils/selecFile";

export async function requestBatch() {
  const client = new OpenAI({
    apiKey: GPT_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const file = await selectFile();
  const res = await client.files.create({
    file: file,
    purpose: "batch",
  });
  const batch = await client.batches.create({
    input_file_id: res.id,
    endpoint: "/v1/chat/completions",
    completion_window: "24h",
  });
  console.log(batch);
}
