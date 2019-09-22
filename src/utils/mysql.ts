import knex from 'knex';
import Bluebird from 'bluebird';
import config from '../../config';
import { logger } from '../../middleware/logger';

const mgrStore: { [key: string]: knex } = {};

export function getMySQLConnMgr(dbName: string): knex {
  logger.info(`desired config.db config: ${JSON.stringify(config)}`);
  // find manager
  let manager = mgrStore[dbName];
  // create manager
  if (!manager) {
    manager = knex(config.db);
    mgrStore[dbName] = manager;
  }
  return manager;
}

export function destroyConnections() {
  return Promise.all(Object.keys(mgrStore).map(key => {
    const mgr = mgrStore[key];
    if (mgr) {
      mgr.destroy();
      delete mgrStore[key];
    }
    return null;
  }));
}

export async function execQuery(
  dbName: string,
  callback: (mgr: knex) => Promise<any> | knex.QueryBuilder | knex.Raw | Bluebird<any>,
  autoclose: boolean = true,
) {
  let rows;
  const mgr = getMySQLConnMgr(dbName);
  if (mgr) {
    try {
      const builder = callback(mgr);
      logger.info(`SQL: ${builder.toString()}`);
      rows = await builder;
      logger.info(`SQL result: ${JSON.stringify(rows || [])}`);
    } catch (e) {
      logger.error(`mysql query failed. error: ${JSON.stringify(e)}`);
      logger.error(e && e.stack);
    }
  } else {
    logger.error(`get mysql connection failed. config.db name: ${dbName}`);
  }
  if (autoclose) {
    await destroyConnections();
  }
  return rows;
}
