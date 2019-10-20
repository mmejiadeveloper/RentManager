import {getRepository, Connection} from "typeorm";
import { Location } from '../entity/Location';
export class LocationDao {
    private conn = null;
    constructor(connection : Connection) {
        this.conn = connection;
    }

    public async getLocations () {
        const locationRepositoy = this.conn.getRepository(Location);
        const locations = await locationRepositoy.find();
        return locations;
    }
}
