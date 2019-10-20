import {getRepository, Connection} from "typeorm";
import { User } from '../entity/User';
export class UserDao {
    private conn = null;
    constructor(connection : Connection) {
        this.conn = connection;
    }

    public async findUser (name: String) {
        const usersRepositoy = this.conn.getRepository(User);
        const users = await usersRepositoy.findOne( { where: {name}} );
        return users;
    }
}
