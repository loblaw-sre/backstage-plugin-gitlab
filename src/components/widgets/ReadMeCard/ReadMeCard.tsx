import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { InfoCard, Progress, MarkdownContent} from '@backstage/core-components';
import { GitlabCIApiRef } from '../../../api';
import { useApi } from '@backstage/core-plugin-api';
import { useAsync } from 'react-use';
import { gitlabAppData, gitlabAppSlug } from '../../gitlabAppData';
import { ReadMeData } from '../../types';
import { useEntityGitlabScmIntegration } from '../../../hooks/useEntityGitlabScmIntegration';
import { Entity } from '@backstage/catalog-model';
import { useEntity } from '@backstage/plugin-catalog-react';

const useStyles = makeStyles(theme => ({
	infoCard: {
	  marginBottom: theme.spacing(3),
	  '& + .MuiAlert-root': {
		marginTop: theme.spacing(3),
	  },
	  '& .MuiCardContent-root': {
		padding: theme.spacing(2, 1, 2, 2),
	  },
	},
	readMe: {
	  overflowY: 'auto',
	  paddingRight: theme.spacing(1),
	  '&::-webkit-scrollbar-track': {
		backgroundColor: '#F5F5F5',
		borderRadius: '5px',
	  },
	  '&::-webkit-scrollbar': {
		width: '5px',
		backgroundColor: '#F5F5F5',
		borderRadius: '5px',
	  },
	  '&::-webkit-scrollbar-thumb': {
		border: '1px solid #555555',
		backgroundColor: '#555',
		borderRadius: '4px',
	  },
	},
  }));
  

type Props = {
	entity?: Entity;
	maxHeight?: number;
};
  // Decoding base64 ⇢ UTF8
function b64DecodeUnicode(str: string): string {
	return decodeURIComponent(
	  Array.prototype.map
		// eslint-disable-next-line func-names
		.call(atob(str), function(c) {
		  // eslint-disable-next-line prefer-template
		  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		})
		.join(''),
	);
}

const getRepositoryDefaultBranch = (url: string) => {
	const repositoryUrl = new URL(url).searchParams.get('ref');
	return repositoryUrl;
};
  
export const ReadMeCard = (props: Props) => {
	const { entity } = useEntity();
	const classes = useStyles();
	const GitlabCIAPI = useApi(GitlabCIApiRef);
	const { project_id } = gitlabAppData();
	const { project_slug } = gitlabAppSlug();
	const { hostname } = useEntityGitlabScmIntegration(entity);
	const { value, loading, error } = useAsync(async (): Promise<
		ReadMeData
	> => {
		let projectDetails: any = await GitlabCIAPI.getProjectDetails(project_slug);
		let projectId = project_id ? project_id : projectDetails?.id;
		let readMePath = "README.md";
		const gitlabObj = await GitlabCIAPI.getReadMeContent(projectId, readMePath);
		console.log(gitlabObj)
		const data = gitlabObj?.getReadMeContent;
		return data!;
	}, []);

	if (loading) {
		return <Progress />;
	} else if (error) {
		return (
			<Alert severity='error' className={classes.infoCard}>
				{error.message}
			</Alert>
		);
	}
	return value?.content && project_id ? (
		<InfoCard
		  title="Read me"
		  className={classes.infoCard}
		  deepLink={{
			link: `//${hostname}//${project_id}/`,
			title: 'Read me',
			onClick: e => {
			  e.preventDefault();
			  window.open(
				`//${hostname}//${project_id}/`,
			  );
			},
		  }}
		>
		  <div
			className={classes.readMe}
			style={{
				maxHeight: `${props.maxHeight}px`,
			}}
		  >
			<MarkdownContent
			  content={b64DecodeUnicode(value.content)
				.replace(
				  /\[([^\[\]]*)\]\((?!https?:\/\/)(.*?)(\.png|\.jpg|\.jpeg|\.gif|\.webp)(.*)\)/gim,
				  '[$1]' +
					`(//${hostname}/${project_slug}/raw/` +
					'$2$3$4)',
				)
				.replace(
				  /\[([^\[\]]*)\]\((?!https?:\/\/)docs\/(.*?)(\.md)\)/gim,
				  '[$1](docs/$2/)',
				)
				.replace(
				  /\[([^\[\]]*)\]\((?!https?:\/\/)(.*?)(\.md)\)/gim,
				  '[$1]' +
					`(//${hostname}/${project_slug}/blob/` +
					'$2$3)',
				)}
			/>
		  </div>
		</InfoCard>
	  ) : (
		<></>
	  );
};