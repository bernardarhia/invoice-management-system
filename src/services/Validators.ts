import Joi from "joi";
export const loginValidator = (
  email: string,
  password: string
): string | object => {
  const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  const { error } = schema.validate({ email, password });
  return error!?.details[0].message;
};
export const createUserValidator = (
  name: string,
  email: string,
  password: string,
  role: string
): string | object => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).alphanum().required(),
    role: Joi.string().required().valid("user", "admin"),
  });
  const { error } = schema.validate({ name, email, password, role });
  return error!?.details[0].message;
};
