import { GPT_API_KEY } from "constants/GPT_API_KEY";
import OpenAI from "openai";
import { selectFile } from "utils/selecFile";

export async function startTunning() {
  const client = new OpenAI({
    apiKey: GPT_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const file = await selectFile();
  const res = await client.files.create({
    file: file,
    purpose: "fine-tune",
  });
  client.fineTuning.jobs.create({
    training_file: res.id,
    model: "gpt-3.5-turbo",
  });
}
