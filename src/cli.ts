import { IOptions } from './lib/options.model';
import { cliOptions } from './lib/cliOptions';
import { readFile } from './lib/readFile';
import { outputReport } from './lib/outputReport';
import { auditService } from './main';

/* -----------------------------------
 *
 * Runner
 *
 * -------------------------------- */

async function auditRunner(options: IOptions) {
  const packageJson = await readFile('./package.json');
  const result = await auditService(packageJson, options);

  outputReport(result);
}

/* -----------------------------------
 *
 * Report
 *
 * -------------------------------- */

auditRunner(cliOptions);
