export interface SourceReview {
  id: string;
  review_id: number;
  mall_code: string;
  stcl2_code: string;
  title: string;
  content: string;
  score: number;
  mem_id?: string;
  calday: string;
  age_gb?: string;
  sex_gb?: string;
  cmus_size?: string;
  mem_height?: number;
  mem_weight?: number;
}
