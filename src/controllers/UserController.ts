import { Users } from "../models/Users";
import { Response, Request } from "express";
import { loginValidator, createUserValidator } from "../services/Validators";

export default class UserController {
  // Login user in
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // validate email and password
      const userValidated = loginValidator(email, password);
      if (userValidated) return res.status(400).send(userValidated);

      //   check if user exists
      const user = await Users.validUser(email, password);

      if (!user)
        return res.status(400).send("Invalid email or password combination");

      req.session.user = {
        email,
        id: user.id,
        name: user.name,
        role: user.role,
      };

      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  //   Create user account
  /**
   *
   * @param req Request
   * @param res Response
   * @returns User
   */
  static async createAccount(req: Request, res: Response) {
    //   destructure request body
    const { name, email, password, role } = req.body;
    const validateUser = createUserValidator(name, email, password, role);
    if (validateUser) return res.status(400).send(validateUser);

    try {
      //   check if user exists
      const userExists = await Users.userExists(email);
      if (userExists) return res.status(400).send("User already exists");
      // create user
      const user = await Users.create({
        name,
        email,
        password,
        role,
      });

      req.session.user = {
        email,
        id: user.id,
        name: user.name,
        role: user.role,
      };

      return res.status(201).send(req.session);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async userProfile(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await Users.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["password"],
        },
      });
      if (!user) return res.status(404).send("User not found");
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
