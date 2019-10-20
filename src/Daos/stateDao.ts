import {getRepository, Connection} from "typeorm";
import { State } from '../entity/State';
export class StateDao {
    private conn = null;
    constructor(connection : Connection) {
        this.conn = connection;
    }

    public async getStates () {
        const stateRepositoy = this.conn.getRepository(State);
        const states = await stateRepositoy.find();
        return states;
    }
}
