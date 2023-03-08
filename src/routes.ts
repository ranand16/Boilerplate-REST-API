import { Express, Request, Response } from "express";
import {
  createProductHandler,
  updateProductHandler,
} from "./controller/product.controller";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import { requireUser } from "./middleware/requireUser";
import validate from "./middleware/validateResource";
import {
  createProductSchema,
  updateProductSchema,
  updateProductSchemaParams,
} from "./schema/product.schema";
import { createUserSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

export default function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post("/api/users", validate(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validate(createUserSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post(
    "/api/products",
    [requireUser, validate(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validate(updateProductSchema)],
    createProductHandler
  );
  app.get(
    "/api/products/:productId",
    validate(updateProductSchemaParams),
    createProductHandler
  );
  app.delete(
    "/api/products/:productId",
    [requireUser, validate(updateProductSchemaParams)],
    createProductHandler
  );
}
