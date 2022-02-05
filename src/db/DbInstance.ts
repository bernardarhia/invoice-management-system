import { Sequelize } from "sequelize-typescript";
import { Users } from "../models/Users";
import { sequelizeConfig } from "../config/sequelize";
const sequelize = new Sequelize({
  database: sequelizeConfig.dbName,
  username: sequelizeConfig.dbUser,
  password: sequelizeConfig.dbPw,
  dialect: sequelizeConfig.sequelizeInfo.dialect as any,
  host: sequelizeConfig.sequelizeInfo.host,
});

sequelize.addModels([Users]);

export default sequelize;
