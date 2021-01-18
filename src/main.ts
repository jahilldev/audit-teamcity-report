import registry from 'npm-registry-fetch';
import { IReport, IRequest } from './lib/audit.model';
import { readDependencies } from './lib/readDependencies';
import { outputReport } from './lib/outputReport';

/* -----------------------------------
 *
 * Service
 *
 * -------------------------------- */

async function auditService(request: IRequest): Promise<IReport> {
  const config = {
    color: true,
    json: true,
    unicode: true,
    method: 'POST',
    gzip: false,
    body: request,
  };

  return registry.json('/-/npm/v1/security/audits', config);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IReport, readDependencies, auditService, outputReport };
