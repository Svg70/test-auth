import { IUser } from '../Interfaces/IUser';
import bcrypt from 'bcrypt-nodejs';

const bcryptService = () => {
  const password = (user: IUser) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);

    return hash;
  };

  const comparePassword = (pw: string, hash: string) => (
    bcrypt.compareSync(pw, hash)
  );

  return {
    password,
    comparePassword,
  };
};

export default bcryptService;