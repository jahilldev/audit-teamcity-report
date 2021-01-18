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
  const result = formatPackage(packageJson);

  if (options.topLevelOnly) {
    return result;
  }

  if (packageLock) {
    return formatPackage(packageLock);
  }

  if (yarnLock) {
    return formatPackage(yarnToNpm('./'));
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

function formatPackage(fileContents: string): IRequest {
  const { name, version, dependencies, devDependencies = {} } = JSON.parse(fileContents);

  const packages = Object.assign(dependencies, devDependencies);
  const keys = Object.keys(packages);

  const manifest = keys.reduce((result, key) => {
    const { version = packages[key] } = packages[key];

    result[key] = { version };

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
