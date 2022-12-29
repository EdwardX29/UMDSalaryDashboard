import { router } from "../trpc";
import { exampleRouter } from "./example";
import salariesRouter from "./salaries";

export const appRouter = router({
  example: exampleRouter,
  salary: salariesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
