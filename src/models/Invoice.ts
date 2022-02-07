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
  invoice_data: string;
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
    type: DataType.STRING,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
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
    get: function () {
      return JSON.parse(this.getDataValue("invoice_data"));
    },
    set: function (val) {
      return this.setDataValue("invoice_data", JSON.stringify(val));
    },
  })
  invoice_data!: string;

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
