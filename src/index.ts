import express, { Application } from "express";
import sequelize from "./db/DbInstance";
const app: Application = express();
const port = 3000;
import session from "express-session";
import path from "path";
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

declare module "express-session" {
  interface Session {
    user: object | string;
  }
}
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// user route
import router from "./routes/users";
app.use("/api/users", router);

import publicRoute from "./publicRoute";
app.use(publicRoute);

const initDb = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Db successfully synced and authenticated");
  } catch (error) {
    console.log("Errorrrrrrrrrr" + error);
  }

  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
};

initDb();
