/* -----------------------------------
 *
 * IReport
 *
 * -------------------------------- */

interface IReport {
  actions: IAction[];
  advisories: {
    [id: string]: IAdvisory;
  };
}

/* -----------------------------------
 *
 * IAction
 *
 * -------------------------------- */

interface IAction {
  module: string;
  resolves: IResolve[];
  target: string;
  action: string;
  isMajor?: boolean;
  depth?: number;
}

/* -----------------------------------
 *
 * IResolve
 *
 * -------------------------------- */

interface IResolve {
  id: number;
  path: string;
  dev: boolean;
  optional: boolean;
  bundled: boolean;
}

/* -----------------------------------
 *
 * IAdvisory
 *
 * -------------------------------- */

interface IAdvisory {
  findings: IFinding[];
  id: number;
  created: string;
  updated: string;
  deleted: null;
  title: string;
  found_by: {
    link?: string;
    name: string;
  };
  reported_by: {
    link?: string;
    name: string;
  };
  module_name: string;
  cves: string[];
  vulnerable_versions: string;
  patched_versions: string;
  overview: string;
  recommendation: string;
  references: string;
  access: 'public' | 'private';
  severity: 'moderate' | 'low' | 'high';
  cwe: string;
  metadata: {
    module_type: string;
    exploitability: number;
    affected_components: string;
  };
  url: string;
}

/* -----------------------------------
 *
 * IFinding
 *
 * -------------------------------- */

interface IFinding {
  version: string;
  paths: string[];
  dev: boolean;
  optional: boolean;
  bundled: boolean;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IReport };
