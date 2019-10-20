import express from 'express';
import bodyParser from 'body-parser';
import { OptionDao } from './Daos/optionDao';
import { LocationDao } from './Daos/locationDao';
import { StateDao } from './Daos/stateDao';
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
require('dotenv').config()
import session from 'express-session';
import { UserDao } from './Daos/userDao';

export class Server {

    readonly app = express();
    readonly port = 3000;

    private async openUrl(connection: Connection) {

        const auth = function (req, res, next) {
            if (req.session && req.session.acessKey)
                return next();
            else
                return res.status(401).send('No tiene autorizacion para ingresar a este modulo. <br><a href="/" >Debe Ingrese nuevamente a la aplicacion <a>');
        };

        this.app.use(express.static('public'));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        this.app.get('/', (req, res) => {
            res.render('access', { title: 'Bienvenido', message: 'Por favor ingrese la clave de acceso' });
        });

        this.app.get('/dashboard', auth, (req, res) => {
            res.render('index', { permission: req.session.permissions });
        });

        this.app.get('/create', auth, (req, res) => {
            res.render('create', { permission: req.session.permissions });
        });

        this.app.get('/loadOptions', async (req, res) => {
            const access = new OptionDao(connection);
            res.json({ data: await access.getOptions() });
        });

        this.app.get('/loadSettings', async (req, res) => {
            const accessData = {
                data: {
                    states: await new StateDao(connection).getStates(),
                    locations: await new LocationDao(connection).getLocations()
                }
            };
            res.json(accessData);
        });

        this.app.post('/save', async (req, res) => {
            const access = new OptionDao(connection);
            res.json(await access.saveData(req.body));
        });

        this.app.post('/loadRow', async (req, res) => {
            const access = new OptionDao(connection);
            res.json({ data: await access.loadRow(req.body.id) });
        });

        this.app.post('/editRow', async (req, res) => {
            const access = new OptionDao(connection);
            res.json(await access.saveData(req.body));
        });

        this.app.post('/filter', async (req, res) => {
            const access = new OptionDao(connection);
            res.json({ data: await access.getFilteredOptions(req.body.link) });
        });

        this.app.post('/verifiyAccessKey', async (req, res) => {
            const access = new UserDao(connection);
            const user = await access.findUser(req.body.accesskey);
            if (user != null) {
                req.session.acessKey = user.name;
                req.session.permissions = {
                    read: user.read,
                    write: user.write,
                };
                req.session.cookie.maxAge = 3600000;
                return res.json({ data: { response: 1 } });
            }
            return res.json({ data: { response: 0 } });
        });

        this.app.get('/logout', async (req, res) => {
            req.session.destroy(()=>{
                res.redirect('/');
            });
        });
    }

    private openPorts() {
        this.app.listen(this.port, err => {
            if (err) {
                return console.error(err);
            }
            return console.log(`server is listening on ${this.port}`);
        });
    }

    private setViewEngine() {
        this.app.set('view engine', 'ejs');
    }

    public launch() {
        createConnection().then(async connection => {

            this.app.use(session({
                secret: 'i-love-husky',
                resave: false,
                saveUninitialized: true,
            }));


            this.openUrl(connection);
            this.openPorts();
            this.setViewEngine();
        }).catch((error) => {
            console.log(error);
        });
    }
}
const server = new Server;
server.launch(); 
