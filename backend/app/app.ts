import express, { Response } from 'express';
import bodyParser from 'body-parser';
import { RegisterRoutes } from '../tsoa-build/routes';
import swaggerUi from 'swagger-ui-express';
import { serveAngular } from './serve-angular';
import { runLiveReload } from './live-reload';
import compression from 'compression';

/* eslint-disable */

export const app: express.Express = express();

app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: '10mb'
	})
);

app.use(compression());

app.use(bodyParser.json({
	limit: '10mb'
}));

RegisterRoutes(app);

app.use('/docs', swaggerUi.serve, async (_: any, response: Response) => {
	return response.send(swaggerUi.generateHTML(await import(__dirname + '/../tsoa-build/swagger.json')));
});

serveAngular(app);

runLiveReload(app);

/* eslint-disable */
