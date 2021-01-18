import { IOptions } from './lib/options.model';
import { cliOptions } from './lib/cliOptions';
import { readDependencies } from './lib/readDependencies';
import { outputReport } from './lib/outputReport';
import { auditService } from './main';

/* -----------------------------------
 *
 * Runner
 *
 * -------------------------------- */

async function auditRunner(options: IOptions) {
  const project = await readDependencies(options);
  const result = await auditService(project);

  outputReport(result);
}

/* -----------------------------------
 *
 * Report
 *
 * -------------------------------- */

auditRunner(cliOptions);
