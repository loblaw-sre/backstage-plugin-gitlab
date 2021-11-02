import { createApiRef } from '@backstage/core-plugin-api';
import {
	ContributorData,
	MergeRequest,
	PipelineObject,
	ReadMeData,
} from '../components/types';

export interface PipelineSummary {
	getPipelinesData: PipelineObject[];
}

export interface ContributorsSummary {
	getContributorsData: ContributorData[];
}

export interface ReadMeContent {
	getReadMeContent: ReadMeData;
}

export interface MergeRequestsSummary {
	getMergeRequestsData: MergeRequest[];
}

export interface MergeRequestsStatusSummary {
	getMergeRequestsStatusData: MergeRequest[];
}

export interface LanguagesSummary {
	getLanguagesData: any;
}

export const GitlabCIApiRef = createApiRef<GitlabCIApi>({
	id: 'plugin.gitlabci.service',
	description: 'Used by the GitlabCI plugin to make requests',
});

export type GitlabCIApi = {
	getPipelineSummary(projectID: string): Promise<PipelineSummary | undefined>;
	getContributorsSummary(
		projectID: string,
	): Promise<ContributorsSummary | undefined>;
	getReadMeContent(
		projectID: string,
		readmePath: string,
		defaultBranch: string,
	): Promise<ReadMeContent | undefined>;
	getMergeRequestsSummary(
		projectID: string,
	): Promise<MergeRequestsSummary | undefined>;
	getMergeRequestsStatusSummary(
		projectID: string,
		count: number,
	): Promise<MergeRequestsStatusSummary | undefined>;
	getProjectName(projectID: string): Promise<string | undefined>;
	getLanguagesSummary(projectID: string): Promise<LanguagesSummary | undefined>;
	retryPipelineBuild(
		projectID: string,
		pipelineID: string,
	): Promise<Object | undefined>;
	getProjectDetails(projectSlug: string): Promise<Object | undefined>;
};