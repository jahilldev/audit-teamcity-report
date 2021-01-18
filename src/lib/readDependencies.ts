import { parse as parseYarn } from '@yarnpkg/lockfile';
import { getYarnLockPackage } from './yarnLock';
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
    const data = formatYarn(yarnLock);

    return { ...result, ...data };
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
 * Format
 *
 * -------------------------------- */

function formatYarn(lockFile: string): Partial<IRequest> {
  const { object: packages } = parseYarn(lockFile);
  const keys = Object.keys(packages);

  const requires = keys.reduce((result, key) => {
    const name = getYarnLockPackage(key);

    result[name] = packages[key].version;

    return result;
  }, {});

  const manifest = keys.reduce((result, key) => {
    const name = getYarnLockPackage(key);

    result[name] = { version: packages[key].version };

    return result;
  }, {});

  return {
    requires,
    dependencies: manifest,
  };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { readDependencies };
