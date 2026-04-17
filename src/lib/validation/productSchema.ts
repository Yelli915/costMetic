import { z } from "zod";

const uncertainField = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    value: schema.nullable(),
    uncertain: z.boolean(),
  });

export const ParsedProductSchema = z.object({
  name: uncertainField(z.string().min(1)),
  brand: uncertainField(z.string()),
  imageUrl: uncertainField(z.string().url()),
  price: uncertainField(z.number().positive()),
  volume: uncertainField(z.number().positive()),
  sourceUrl: z.string().url(),
  rawDescription: z.string(),
});

export const CalculatedProductSchema = ParsedProductSchema.extend({
  totalVolume: uncertainField(z.number().positive()),
  unitPrice: uncertainField(z.number().positive()),
});

export const UrlInputSchema = z.object({
  url: z
    .string()
    .url({ message: "올바른 URL 형식이 아닙니다" })
    .refine(
      (url) =>
        process.env.NODE_ENV === "development"
          ? url.startsWith("http://") || url.startsWith("https://")
          : url.startsWith("https://"),
      {
      message: "https:// 로 시작하는 URL만 지원합니다",
      },
    ),
});

export const ReviewFormSchema = z.object({
  name: z.string().min(1, { message: "상품명을 입력해주세요" }),
  brand: z.string().optional(),
  price: z.number().positive({ message: "가격은 0보다 커야 합니다" }),
  volume: z.number().positive({ message: "용량은 0보다 커야 합니다" }),
  totalVolume: z.number().positive(),
});

export type ParsedProduct = z.infer<typeof ParsedProductSchema>;
export type CalculatedProduct = z.infer<typeof CalculatedProductSchema>;
export type UrlInput = z.infer<typeof UrlInputSchema>;
export type ReviewFormInput = z.infer<typeof ReviewFormSchema>;
