export interface Result {
  summary: string;
  pros: [number, string, string, number[]][];
  cons: [number, string, string, number[]][];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  cost?: number;
  source: { id: number; content: string }[];
}
