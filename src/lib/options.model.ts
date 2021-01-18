/* -----------------------------------
 *
 * Options
 *
 * -------------------------------- */

interface IOptions {
  /**
   * Run security audit on child packages, e.g
   * dependencies of your dependencies
   */
  auditChildren: boolean;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IOptions };
