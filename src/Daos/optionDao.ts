import { Like, Connection } from "typeorm";
import { Option } from '../entity/Option';
export class OptionDao {
    private conn = null;
    constructor(connection: Connection) {
        this.conn = connection;
    }

    public async saveData(data: any) {

        try {
            let optionModel = null;
            const optionRepositoy = this.conn.getRepository(Option);
            if (data.id != null) {
                optionModel = await optionRepositoy.findOne({ relations: ["state", "location"], where: { id: data.id } });
            } else {
                optionModel = new Option();
            }
            optionModel.link = data.enlace;
            optionModel.location = data.municipio;
            optionModel.adress = data.direccion;
            optionModel.contact = data.contacto;
            optionModel.checked = data.visitado == "Si" ? 1 : 0;
            optionModel.state = data.estado;
            optionModel.doesLike = data.deseable;
            optionModel.notes = data.observaciones;
            await optionRepositoy.save(optionModel);
            return { result: 1, message: 'Opcion guardada', state: 'success' };
        } catch (error) {
            console.log('This just happened:: ', error.message);
            return { result: 2, message: 'No se pudo guardar.', state: 'error' };
        }

    }

    public async getOptions() {
        const optionRepositoy = this.conn.getRepository(Option);
        const options = await optionRepositoy.find({ relations: ["state", "location"] });
        return options;
    }

    public async getFilteredOptions(dataFilter: string) {
        const loadedPosts = await this.conn.getRepository(Option).find({
            relations: ["state", "location"],
            where: {
                link: Like("%" + dataFilter + "%")

            }
        });

        return loadedPosts;
    }

    public async loadRow(id: number) {
        const optionRepositoy = this.conn.getRepository(Option);
        const options = await optionRepositoy.findOne({ relations: ["state", "location"], where: { id } });
        return options;
    }
}
