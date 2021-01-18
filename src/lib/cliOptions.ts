import { argv } from 'yargs';
import { IOptions } from './options.model';

/* -----------------------------------
 *
 * Options
 *
 * -------------------------------- */

const cliOptions: IOptions = {
  topLevelOnly: !!argv.topLevelOnly,
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { cliOptions };
