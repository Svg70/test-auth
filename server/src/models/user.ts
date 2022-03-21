import { Model, DataTypes } from "sequelize"
import sequelizeConnection from '../db/db';

interface UserAttributes {
  id: number;
  username: string;
  passwordHash: string;
  email: string;
}

 export class User extends Model<UserAttributes> implements UserAttributes {
  public readonly id!: number
  public username!: string
  public passwordHash!: string
  public email!: string
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
})

interface NoteAttributes {
  id: number;
  title: string;
  createdAt?: Date;
}

export class Note extends Model<NoteAttributes> implements NoteAttributes {
  public id!: number
  public title!: string
  // timestamps!
  public readonly createdAt!: Date;
}

Note.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
},);

User.hasMany(Note, { as: 'notes', foreignKey: 'userId' });
Note.belongsTo(User, {foreignKey: 'userId'});