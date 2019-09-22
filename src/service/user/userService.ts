import knex from 'knex';
import { execQuery } from '../../utils/mysql';

export const getUserInfo = async () => (
  execQuery('user', (mgr: knex) => (
    mgr.first().from('user')
  ))
);
