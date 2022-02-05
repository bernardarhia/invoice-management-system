import {
  Model,
  Table,
  DataType,
  Column,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

@Table({
  tableName: "users",
  timestamps: false,
  paranoid: true,
  underscored: true,
  charset: "utf8",
  collate: "utf8_general_ci",
  modelName: "Users",
})
export class Users extends Model {
  public validPassword!: (password: string) => Promise<boolean>;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING({ length: 255 }),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING({ length: 255 }),
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING({ length: 255 }),
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING({ length: 255 }),
    allowNull: false,
  })
  role!: string;
  static async generateHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
  }
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: Users) {
    if (instance.password) {
      instance.password = await Users.generateHash(instance.password);
    }
  }

  @BeforeCreate
  static async generateId(instance: Users) {
    const { id } = instance;
    const isExists = await Users.findOne({
      where: {
        id,
      },
    });
    while (isExists) instance.id = uuidv4();
  }
}

Users.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password!);
};
