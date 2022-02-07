import { Router } from "express";
import { InvoiceController } from "../controllers/InvoiceController";
import { requireLogin } from "../middlewares/requireLogin";
const invoiceRouter = Router();

invoiceRouter.post("/create", requireLogin, InvoiceController.createInvoice);
invoiceRouter.get("/:id", requireLogin, InvoiceController.getInvoice);
// invoiceRouter.get("/:id", requireLogin, InvoiceController.createInvoice);
export default invoiceRouter;
