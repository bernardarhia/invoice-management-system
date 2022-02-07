import { Invoice } from "../models/Invoice";
import { Response, Request } from "express";
import { invoiceValidator } from "../services/Validators";

export class InvoiceController {
  static async createInvoice(req: Request, res: Response) {
    const {
      title,
      issued_to,
      discount,
      start_date,
      end_date,
      invoice_number,
      invoice_data,
      description,
    } = req.body;

    try {
      const validateInvoice = invoiceValidator(
        title,
        issued_to,
        discount,
        start_date,
        end_date,
        invoice_number,
        invoice_data,
        description
      );
      if (validateInvoice) return res.status(400).send(validateInvoice);

      const created_by = req.session.user.id;
      const invoiceInserted = await Invoice.create({
        title,
        created_by,
        issued_to,
        discount,
        start_date,
        end_date,
        invoice_number,
        invoice_data,
        description,
      });

      if (invoiceInserted) return res.status(201).send(invoiceInserted);
      return res.status(400).send("Unable to create Invoice");
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
