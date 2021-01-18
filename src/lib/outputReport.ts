import teamcity from 'teamcity-service-messages';
import { IReport } from './audit.model';

/* -----------------------------------
 *
 * Output
 *
 * -------------------------------- */

function outputReport({ advisories, metadata }: IReport) {
  const advisoryItems = Object.keys(advisories);

  if (!advisoryItems.length) {
    teamcity.inspectionType({
      category: 'security',
      description: 'https://docs.npmjs.com/cli/audit.html',
      id: 'audit-teamcity-report',
      name: 'NPM Audit: TeamCity Report',
      message: `No security vulnerabilities found
        total_dependencies: ${metadata.totalDependencies} audited
      `,
    });

    return;
  }

  teamcity.inspectionType({
    category: 'security',
    description: 'https://docs.npmjs.com/cli/audit.html',
    id: 'audit-teamcity-report',
    name: 'NPM Audit: TeamCity Report',
    message: `
      total_dependencies: ${metadata.totalDependencies} audited
      low_risk: ${metadata.vulnerabilities.low}
      moderate_risk: ${metadata.vulnerabilities.moderate}
      high_risk: ${metadata.vulnerabilities.high}
      critical_risk: ${metadata.vulnerabilities.critical}
    `,
  });

  advisoryItems.forEach((advisoryId) => {
    const advisory = advisories[advisoryId];

    teamcity.inspection({
      SEVERITY: 'WARNING',
      file: `module: "${advisory.module_name}"`,
      message: `${advisory.overview},
        severity: ${advisory.severity},
        vulnerable_versions: ${advisory.vulnerable_versions},
        patched_versions: ${advisory.patched_versions},
        recommendation: ${advisory.recommendation},
        advisory: ${advisory.url},
      `,
      typeId: 'audit-teamcity-report',
    });
  });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { outputReport };
