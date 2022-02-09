import yargs from 'yargs';
import { IOptions } from './options.model';

/* -----------------------------------
 *
 * API
 *
 * -------------------------------- */

const argv = yargs(process.argv.slice(2)).options({
  topLevelOnly: { type: 'boolean', default: false }
}).parseSync();

/* -----------------------------------
 *
 * Options
 *
 * -------------------------------- */

const cliOptions: IOptions = {
  topLevelOnly: argv.topLevelOnly
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { cliOptions };
