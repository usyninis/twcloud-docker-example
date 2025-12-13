import { type FastifyPluginAsync } from 'fastify';

import { readAssetsManifest } from '@alfalab/scripts-server';
import { BookModel } from './api/book-model';

export const indexPagePlugin: FastifyPluginAsync = async (fastify) => {
    fastify.get('*', async (request, reply) => {
        const assets = await readAssetsManifest(['vendor', 'main']);

        const books = await BookModel.findAll({
            limit: 10,
            order: [['createdAt', 'DESC']]
        });

        return reply.type('text/html').send(`<!DOCTYPE html>
                <html lang="ru">
                <head>
                <meta charset="utf-8">
                <title>title</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                ${assets.css.map((cssFile) => `<link rel="stylesheet" href="/${cssFile}" />`).join('')}
                </head>
                <body>
                <div id="app"></div>
                <pre>${JSON.stringify(books, null, 4)}</pre>
                ${assets.js
                    .map((jsFile) => `<script type="text/javascript" src="/${jsFile}" ></script>`)
                    .join('')}
                </body>
                </html>`);
    });
};
