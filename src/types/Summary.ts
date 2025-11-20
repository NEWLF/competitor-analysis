import { SourceReview } from "./SoruceReview";

export interface Summary {
  id: string;
  content: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  createdAt: Date;
  gptAnalCode: string;
  items: SummaryItem[];
  sources: SourceReview[];
  stcl?: string;
}

export interface SummaryItem {
  id: string;
  type: string;
  title: string;
  content: string;
  tag: string;
  maps: { source: SourceReview }[];
}
