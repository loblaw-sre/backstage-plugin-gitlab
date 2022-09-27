import { Entity } from '@backstage/catalog-model';
import React from 'react';
import { MissingAnnotationEmptyState } from '@backstage/core-components';
import { Button } from '@material-ui/core';
import { GitlabCI } from './components/GitlabCI';
import { useEntity } from '@backstage/plugin-catalog-react';

const GITLAB_ANNOTATION_PROJECT_ID = 'gitlab.com/project-id';
export const GITLAB_ANNOTATION_PROJECT_SLUG = 'gitlab.com/project-slug';

export const isGitlabAvailable = (entity: Entity) =>
isGitlabProjectIDAnnotationAvailable(entity) || isGitlabSlugAnnotationAvailable(entity)


export const isGitlabProjectIDAnnotationAvailable = (entity: Entity) =>
	Boolean(entity.metadata.annotations?.[GITLAB_ANNOTATION_PROJECT_ID]);

export const isGitlabSlugAnnotationAvailable = (entity: Entity) =>
	Boolean(entity.metadata.annotations?.[GITLAB_ANNOTATION_PROJECT_SLUG]);

type Props = {
	/** @deprecated The entity is now grabbed from context instead */
	entity?: Entity;
};

export const Router = (_props: Props) => {
	const { entity } = useEntity();

	if (
		isGitlabAvailable(entity)
	) {
		return <GitlabCI />;
	}

	return (
		<>
			<MissingAnnotationEmptyState annotation={GITLAB_ANNOTATION_PROJECT_ID} />
			<MissingAnnotationEmptyState
				annotation={GITLAB_ANNOTATION_PROJECT_SLUG}
			/>
			<Button
				variant='contained'
				color='primary'
				href='https://github.com/loblaw-sre/backstage-plugin-gitlab/blob/main/README.md'
			>
				Read Gitlab Plugin Docs
			</Button>
		</>
	);
};
