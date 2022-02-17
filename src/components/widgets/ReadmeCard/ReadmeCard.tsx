import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { InfoCard, MarkdownContent, Progress } from '@backstage/core-components';
import { makeStyles } from "@material-ui/core";
import { Entity } from "@backstage/catalog-model";
import { useApi } from '@backstage/core-plugin-api';
import { useAsync } from 'react-use';
import { GitlabCIApiRef } from '../../../api';
import { gitlabAppData } from '../../gitlabAppData';

type Props = {
  entity?: Entity;
  maxHeight?: number;
};

const useStyles = makeStyles((theme) => ({
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
export const ReadmeCard = (props: Props) => {
  const GitlabCIAPI = useApi(GitlabCIApiRef);
  const { project_id } = gitlabAppData();
  // This should probably be moved into annotations
  const filename = "README.md";
  const ref = "master";

  const { value, loading, error } = useAsync(async (): Promise<string> => {
    const content = await GitlabCIAPI.getFileContent(project_id, filename, ref)
    if (!content) {
      throw new Error("No content could be found for the specified filename")
    }
    return content;
  });

  const classes = useStyles();

  if (loading) {
    return <Progress/>;
  } else if (error) {
    return <Alert severity="error">
      {error.message}
    </Alert>
  }

  return (
    <InfoCard title={filename}>
      <div
        className={classes.readMe}
        style={{
          maxHeight: `${props.maxHeight}px`,
        }}>
        <MarkdownContent
          content={value || "_README.md missing or contents are empty_"}
        />
      </div>
    </InfoCard>
  );
};
