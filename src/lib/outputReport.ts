import teamcity from 'teamcity-service-messages';
import { IReport } from './audit.model';

/* -----------------------------------
 *
 * Output
 *
 * -------------------------------- */

function outputReport({ advisories }: IReport) {
  const advisoryItems = Object.keys(advisories);

  if (!advisoryItems.length) {
    teamcity.inspectionType({
      category: 'security',
      description: 'https://docs.npmjs.com/cli/audit.html',
      id: 'audit-teamcity-report',
      name: 'NPM Audit: TeamCity Report',
      message: 'No security vulnerabilities found',
    });

    return;
  }

  teamcity.inspectionType({
    category: 'security',
    description: 'https://docs.npmjs.com/cli/audit.html',
    id: 'audit-teamcity-report',
    name: 'NPM Audit: TeamCity Report',
  });

  advisoryItems.forEach((advisoryId) => {
    const advisory = advisories[advisoryId];

    teamcity.inspection({
      SEVERITY: 'WARNING',
      file: `module: "${advisory.module_name}"`,
      message: `
        overview: ${advisory.overview},
        severity: ${advisory.severity},
        vulnerable_versions: ${advisory.vulnerable_versions},
        patched_versions: ${advisory.patched_versions},
        recommendation: ${advisory.recommendation},
        advisory: ${advisory.url},
      `,
      typeId: 'npm-audit',
    });
  });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { outputReport };
