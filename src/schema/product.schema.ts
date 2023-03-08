import { number, object, string, TypeOf } from "zod";

export const createProductSchema = object({
  body: object({
    title: string({
      required_error: "Title is required!",
    }),
    description: string({
      required_error: "Description is required",
    }).min(120, "Description should be minimum of 120 characters long."),
    price: number({
      required_error: "Price is required",
    }),
    image: string({
      required_error: "Image is required",
    }),
  }),
});

export const updateProductSchemaParams = object({
  productId: string({
    required_error: "productId is required.",
  }),
});

export const updateProductSchema = object({
  body: createProductSchema,
  params: updateProductSchemaParams,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
