// import Note from '../models/Note'
import { User, Note } from '../models/User'

const dbInit = () => {
  User.sync()
  Note.sync()
}
export default dbInit