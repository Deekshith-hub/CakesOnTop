import express from 'express';
import { userRouter } from "./router/user";
import { cakesRouter } from "./router/cakes";

const app = express();
app.use(express.json());

app.use("/user", userRouter)
app.use("/cakes", cakesRouter)






const server = app.listen(8080, () => {
  const { port } : any = server.address();
  console.info(`Server Started on port ${port}`);
});
