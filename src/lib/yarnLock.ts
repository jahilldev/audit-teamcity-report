/* -----------------------------------
 *
 * Name
 *
 * -------------------------------- */

function getYarnLockPackage(value: string) {
  let [name] = value.split('@').slice(0);

  if (value.split('@').length > 2) {
    [name] = value.split('@').slice(1);
  }

  return name;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { getYarnLockPackage };
