import { type FastifyPluginAsync } from 'fastify';
import { sequelize } from './sequelize';
import { BookModel } from './book-model';

export const apiPlugin: FastifyPluginAsync = async (fastify) => {
    // const { enabled = true } = options;
    // await initAssociations();
    await sequelize.sync({ alter: true });

    fastify.get('/api', async (request) => {
        const result = await BookModel.create({
            name: String(new Date().getTime()),
        });

        return result;
    });
};
