import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./constants";
import { User, Note } from "./models/User";
import bcryptService from "./services/bcrypt.service";
import { IRepeatPassword } from "./Interfaces/IRepeatPassword";
import { ILogin } from "./Interfaces/ILogin";
import { IRegister } from "./Interfaces/IRegister";

export const resolvers = {
  Query: {
    getAllUsers: async () => {
        return await User.findAll();
      },
      getUser: async (_: any, {id}: {id: string}) => {
        const user = await User.findOne({ where: { id } });
        return user;
      },
      getAllNotes: async () => {
        const notes = await Note.findAll();
        return notes;
      },
      getUserNotes: async (_: any, {id}: {id: string}) => {
        //@ts-ignore
        const notes = await Note.findAll({ where: { userId: id } });
        return notes;
      },
  },
  Mutation: {
    register: async (_: any, { email, password, username }: IRegister) => {
      const hash = bcryptService().password({email, password, username})

      //@ts-ignore
      await User.create({
        email,
        passwordHash: hash,
        username
      });
  
      return true;
    },
    login: async (_: any, { email, password }: ILogin) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }
  
      //@ts-ignore
      const valid = bcryptService().comparePassword(password, user.passwordHash)
  
      if (!valid) {
        return null;
      }
  
      //@ts-ignore
      const accessToken = sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: "60min"
      });

      // const refreshToken = sign(
      //   { userId: user.id },
      //     REFRESH_TOKEN_SECRET,
      //   {
      //     expiresIn: "7d"
      //   }
      // );
  
      //res.cookie("refresh-token", refreshToken);
      //res.cookie("access-token", accessToken);
  
      return { user, token: accessToken };
    },
    resetPassword: async (_: any, {email, newPassword, repeatNewPassword}: IRepeatPassword) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }

      if (newPassword !==  repeatNewPassword) {
        return null;
      }

      const hash = bcryptService().password({
        email,
        password: newPassword,
        //@ts-ignore
        username: user.username
      })

      await User.update(
        { passwordHash: hash },
        { where: { email } }
      )

      return true;
    },
    createNote: async (_: any, {title}: {title: string}, context: any) => {
      if (!context.userId) {
        return null;
      }

      const user = await User.findOne({ where: { id: context.userId } });

      if (!user) {
        return null;
      }
      
      const note = await Note.create({
        title,
        //@ts-ignore
        userId: context.userId
      });

      return note;
    },
    // deleteNote: async ({id}: {id: string}) => {
    //   const note = await Note.findOne({ where: { id } });
  
    //   if(!note) {
    //     return null;
    //   }
  
    //   await Note.destroy({where: {id}})
  
    //   return true;
    // }
  }
};