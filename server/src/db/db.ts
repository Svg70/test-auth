import { Dialect, Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbPassword = process.env.DB_PASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "sqlite",
  storage: ":inmemory:",
  //sync: { force: true },
});

export default sequelizeConnection
