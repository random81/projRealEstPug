import jade from 'jade';
import express from 'express';
import bodyParser from 'body-parser';
import routes from '../app/routes/index_es6.routes.js';

const app = express();
// changing to dist folder of webpack
app.set('views', './dist');
// USE keyword means express is mediating between middleware logic and client. static file via get
// changing to dist folder of webpack
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.engine('jade', jade.__express);
// mount route
app.use('/', routes);
export default app;
