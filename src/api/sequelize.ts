import { Sequelize } from 'sequelize';

// const chalk = require('chalk');

const DB_HOST = process.env.DB_HOST ?? undefined;
const DB_NAME = process.env.DB_NAME ?? '';
const DB_USERNAME = process.env.DB_USERNAME ?? '';
const DB_PASSWORD = process.env.DB_PASSWORD ?? '';
const DB_PORT = Number(process.env.DB_PORT) ?? 0;

let seq: Sequelize;

if (process.env.E2E === '1') {
    seq = new Sequelize('sqlite::memory:', {
        logging: false,
        dialect: 'sqlite',
        pool: {
            max: 1,
            min: 0,
            idle: 10000,
            acquire: 30000,
            evict: 10000,
        },
        retry: {
            max: 3,
        },
    });

    console.log('✅ Using SQLite in-memory database');
} else {
    console.log('DB_NAME', DB_NAME, 'DB_USERNAME', DB_USERNAME);
    seq = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 3000,
            idle: 10000,
        },
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true,
        },
        port: DB_PORT,
        // logging: (sql) => console.log(chalk.magentaBright('\n\r 󠁯•󠁏'), chalk.grey(sql.split(':', 2)[1].trim())),
        // eslint-disable-next-line no-console
        logging: console.log,
    });
}

export const sequelize = seq;
