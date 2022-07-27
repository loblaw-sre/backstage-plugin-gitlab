export type ContributorData = {
	project_web_url: string;
	project_default_branch: string;
	name: string;
	email: string;
	avatar_url: string;
};

export type MergeRequest = {
	id: string;
	project_id: string;
	state: string;
	created_date: string;
	author: {
		username: string;
	};
	title: string;
	created_at: string;
	merged_at: string;
	updated_at: string;
	closed_at: string;
	web_url: string;
};

export type PipelineObject = {
	id: string;
	project_id: string;
	ref: string;
	status: string;
	web_url: string;
	project_name: string;
	onRestartClick: () => void;
	created_at: string;
	updated_at: string;
};

export type RepositoryFileObject = {
	file_name: string;
	file_path: string;
	size: number,
	encoding: string;
	content: string;
	content_sha256: string;
	ref: string;
	blob_id: string;
	commit_id: string;
	last_commit_id: string;
};

export type MergeRequestState = 'opened' | 'closed' | 'all';
