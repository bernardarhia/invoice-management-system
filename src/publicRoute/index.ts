import { Response, Request, Router } from "express";

const publicRoute = Router();

publicRoute.get("/", (req: Request, res: Response) => {
  console.log(req.session.user);
  res.render("index", {
    data: req.session,
  });
});
export default publicRoute;
