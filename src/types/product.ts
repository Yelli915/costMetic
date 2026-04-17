import type { CalculatedProduct } from "@/lib/validation/productSchema";

export type RankedProduct = CalculatedProduct & {
  rank: number;
  isBestValue: boolean;
  isWorstValue: boolean;
};
