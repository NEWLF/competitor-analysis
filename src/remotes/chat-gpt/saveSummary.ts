import { Result } from "types/Result";
import axios from "axios";

export async function saveSummary(data: Result) {
  await axios.post("http://localhost:3001/summary", data);
}
