import { Router } from "express";
import * as UserModel from "../models/users";
import { regexParams } from "../resources/mapping";

export const usersRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.get("/", async (req, res) => {
  const { ci, name, date, delivered, userCount } = req.query;

  const ciParser =
    !regexParams.number.test(ci as string) || ci === undefined
      ? undefined
      : +ci;

  const nameParser = name === "" ? undefined : (name as string);

  const deliveredParser = !regexParams.delivered.test(delivered as string)
    ? undefined
    : Boolean(delivered);

  const dateParser = !regexParams.date.test(date as string)
    ? undefined
    : (date as string);

  const userCountParser =
    !regexParams.number.test(userCount as string) || userCount === undefined
      ? 0
      : +userCount;

  const result = await UserModel.getFilterLazy({
    ci: ciParser,
    name: nameParser,
    delivered: deliveredParser,
    date: dateParser,
    userCount: userCountParser,
  });

  if (result.error != null) {
    return res.status(400).json(result.error);
  }

  const resultLenght = await UserModel.getFilterLenght({
    ci: ciParser,
    name: nameParser,
    delivered: deliveredParser,
    date: dateParser,
    userCount: userCountParser,
  });

  return res.status(200).json([result.data, resultLenght]);
});

usersRouter.patch("/", (_req, _res) => {});

usersRouter.delete("/", (_req, _res) => {});
