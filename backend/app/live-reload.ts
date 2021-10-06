import express from 'express';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import { PATH_TO_FE_DIST } from './constants';

export function runLiveReload(app: express.Router) {
  const lrServer = livereload.createServer();

	lrServer.watch(PATH_TO_FE_DIST);
	lrServer.server.once("connection", () => {
		setTimeout(() => {
			lrServer.refresh("/");
		}, 100);
	});

	app.use(connectLivereload());
}
