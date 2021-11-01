import { useApi } from '@backstage/core-plugin-api';
import { scmIntegrationsApiRef } from '@backstage/integration-react';
import { Entity, parseLocationReference } from '@backstage/catalog-model';

const defaultGitlabIntegration = {
  hostname: 'gitlab.com',
  baseUrl: 'https://gitlab.com/api/v4',
};

export const useEntityGitlabScmIntegration = (entity: Entity) => {
  const integrations = useApi(scmIntegrationsApiRef);
  if (!entity) {
    return defaultGitlabIntegration;
  }
  const location = parseLocationReference(
    entity.metadata.annotations!!['backstage.io/managed-by-location'] || '',
  );
  const scm = integrations.gitlab.byUrl(location.target);
  if (scm) {
    return {
      hostname: scm.config.host,
      baseUrl: scm.config.apiBaseUrl,
    };
  }
  return defaultGitlabIntegration;
};