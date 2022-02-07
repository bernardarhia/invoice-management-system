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
    role: Joi.string().required(),
  });
  const { error } = schema.validate({ name, email, password, role });
  return error!?.details[0].message;
};

export const invoiceValidator = (
  title: string,
  issued_to: string,
  discount: number,
  start_date: Date,
  end_date: Date,
  invoice_number: number,
  invoice_data: [
    {
      item: string;
      quantity: number;
      price: number;
    }
  ],
  description: string
): string => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    issued_to: Joi.string().required(),
    discount: Joi.number(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    invoice_number: Joi.number().required(),
    invoice_data: Joi.array().required(),
    description: Joi.string().required(),
  });
  const { error } = schema.validate({
    title,
    issued_to,
    discount,
    start_date,
    end_date,
    invoice_number,
    invoice_data,
    description,
  });
  return error!?.details[0].message;
};
