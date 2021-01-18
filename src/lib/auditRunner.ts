import { readFile } from './readFile';
import { auditService } from './auditService';
import { outputReport } from './outputReport';

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
 * Export
 *
 * -------------------------------- */

export { auditRunner };
