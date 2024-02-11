import http from 'http';
import express, { json, urlencoded } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { applyRoutes } from 'helpers';
import { Route } from 'sn-types-backend';
import { Optional } from 'sn-types-general';

const app = express();
export async function server(
    port: number,
    routes: Route[]
): Promise<Optional<http.Server>> {
    try {
        app.use(helmet());

        app.use(cors());

        app.use(compression());
        app.use(json());
        app.use(urlencoded({ extended: false }));

        applyRoutes({ app, routes });

        return http.createServer(app).listen(port, () => {
            console.log(`Express with Typescript! http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}
