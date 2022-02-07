import { StringRegexOptions } from "joi";
import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  DataType,
  BeforeCreate,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

enum status {
  CANCELLED = "cancelled",
  DELETED = "deleted",
  PAID = "paid",
  "NOT PAID" = "not paid",
}
interface InvoiceAttributes {
  id: string;
  title: string;
  created_by: string;
  issued_to: string;
  discount: number;
  start_date: Date;
  end_date: Date;
  invoice_number: number;
  invoice_data: [
    {
      item: string;
      quantity: number;
      price: number;
    }
  ];
  description: string;
  status: status;
}

interface InvoiceCreationAttributes
  extends Optional<InvoiceAttributes, "id" | "status"> {}

@Table({
  tableName: "invoice",
  timestamps: true,
  paranoid: true,
  underscored: true,
  charset: "utf8",
  collate: "utf8_general_ci",
  modelName: "Invoice",
})
export class Invoice extends Model<
  InvoiceAttributes,
  InvoiceCreationAttributes
> {
  @Column({
    type: DataType.STRING(30),
    primaryKey: true,
    autoIncrement: false,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  created_by!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  issued_to!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  discount!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date!: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  invoice_number!: number;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  invoice_data!: Array<object>;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.ENUM,
    defaultValue: "not paid",
    values: ["not paid", "paid", "cancelled", "deleted"],
  })
  status!: status;

  @BeforeCreate
  static async invoiceExists(instance: Invoice) {
    while (
      await Invoice.findOne({
        where: {
          id: instance.id,
        },
      })
    ) {
      instance.id = uuidv4();
    }
  }
}
