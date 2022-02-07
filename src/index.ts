import express, { Application } from "express";
import sequelize from "./db/DbInstance";
const app: Application = express();
const port = 3000;
import session from "express-session";
import path from "path";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface UserSession {
  id: string;
  email?: string;
  name?: string;
  role?: string;
}

declare module "express-session" {
  interface Session {
    user: UserSession;
  }
}
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// API ROUTES
import userRouter from "./routes/users";
app.use("/api/users", userRouter);

// API ROUTES
import invoiceRouter from "./routes/invoice";
app.use("/api/invoice", invoiceRouter);

// PUBLIC ROUTES
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
