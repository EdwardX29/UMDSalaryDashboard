import { router } from "../trpc";
import salariesRouter from "./salaries";

export const appRouter = router({
  salary: salariesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
