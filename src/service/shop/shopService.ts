import knex from 'knex';
import { execQuery } from '../../utils/mysql';

export const getShopById = async (id: number) => (
  execQuery('shop', (mgr: knex) => (
    mgr.first()
      .from('shop')
      .where({ id })
  ))
);
