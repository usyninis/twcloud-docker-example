import 'dotenv/config';
import Fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { indexPagePlugin } from './index-page-plugin';
import { apiPlugin } from './api';

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), '.build/assets/'),
    prefix: '/assets/',
});

fastify.get('/health', async (request, response) => {
  return response.status(200).send({ "status": "healthy" });
});

fastify.register(apiPlugin);
fastify.register(indexPagePlugin);

const start = async () => {
  try {
    await fastify.ready(); // Wait for all plugins and setup to complete
    await fastify.listen({ port: 4000, host: '0.0.0.0' });
    console.log('Server running on http://localhost:4000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
