import { readFile } from './lib/readFile';
import { outputReport } from './lib/outputReport';
import { auditService } from './main';

/* -----------------------------------
 *
 * Runner
 *
 * -------------------------------- */

async function auditRunner() {
  const packageJson = await readFile('./package.json');
  const result = await auditService(packageJson);

  outputReport(result);
}

/* -----------------------------------
 *
 * Report
 *
 * -------------------------------- */

auditRunner();
