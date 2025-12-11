import Fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { indexPagePlugin } from './index-page-plugin';

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), '.build/assets/'),
    prefix: '/assets/',
});

fastify.get('/health', async () => {
  return 'ok';
});

fastify.register(indexPagePlugin);


const start = async () => {
  try {
    await fastify.listen({ port: 8080, host: '0.0.0.0' });
    console.log('Server running on http://localhost:8080');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();