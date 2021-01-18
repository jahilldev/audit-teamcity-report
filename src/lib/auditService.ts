import registry from 'npm-registry-fetch';
import { IReport } from './audit.model';

/* -----------------------------------
 *
 * Service
 *
 * -------------------------------- */

async function auditService(packageJson: string): Promise<IReport> {
  const options = {
    color: true,
    json: true,
    unicode: true,
    method: 'POST',
    gzip: false,
    body: await getRequestBody(packageJson),
  };

  return registry.json('/-/npm/v1/security/audits', options);
}

/* -----------------------------------
 *
 * Request
 *
 * -------------------------------- */

async function getRequestBody(packageJson: string) {
  const { name, version, dependencies, devDependencies } = JSON.parse(
    packageJson
  );

  const packages = Object.assign(dependencies, devDependencies);
  const keys = Object.keys(packages);

  const manifest = keys.reduce((result, key) => {
    result[key] = { version: packages[key] };

    return result;
  }, {});

  return {
    name,
    version,
    requires: packages,
    dependencies: manifest,
  };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { auditService };
