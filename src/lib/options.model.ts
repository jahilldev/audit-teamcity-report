/* -----------------------------------
 *
 * Options
 *
 * -------------------------------- */

interface IOptions {
  /**
   * Only audit packages installed directly
   * into your project, e.g no child dependencies
   */
  topLevelOnly: boolean;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IOptions };
