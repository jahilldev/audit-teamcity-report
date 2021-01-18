import { argv } from 'yargs';
import { IOptions } from './options.model';

/* -----------------------------------
 *
 * Options
 *
 * -------------------------------- */

const cliOptions: IOptions = {
  auditChildren: !!argv.auditChildren,
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { cliOptions };
