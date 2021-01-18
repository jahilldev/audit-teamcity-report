import { yarnToNpm } from 'synp';
import { IOptions } from './options.model';
import { IRequest } from './audit.model';
import { readFile } from './readFile';

/* -----------------------------------
 *
 * Manifest
 *
 * -------------------------------- */

const manifestFiles = ['package.json', 'package-lock.json', 'yarn.lock'];

/* -----------------------------------
 *
 * Dependenies
 *
 * -------------------------------- */

async function readDependencies(options: IOptions): Promise<IRequest> {
  const [packageJson, packageLock, yarnLock] = await readManifests();
  const result = formatPackage(JSON.parse(packageJson));

  if (!options.auditChildren) {
    return result;
  }

  if (packageLock) {
    return formatPackage(JSON.parse(packageLock));
  }

  if (yarnLock) {
    return formatPackage(JSON.parse(yarnToNpm('./')));
  }

  return result;
}

/* -----------------------------------
 *
 * Read
 *
 * -------------------------------- */

async function readManifests() {
  return Promise.all(
    manifestFiles.map(async (fileName) => {
      try {
        return await readFile(fileName);
      } catch {
        return null;
      }
    })
  );
}

/* -----------------------------------
 *
 * Format
 *
 * -------------------------------- */

function formatPackage(packageJson: any): IRequest {
  const { name, version, dependencies, devDependencies = {} } = packageJson;

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

export { readDependencies };
