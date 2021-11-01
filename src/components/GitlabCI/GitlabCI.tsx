import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Page,
  Content,
} from '@backstage/core-components';
import {
  ContributorsCard,
  LanguagesCard,
  MergeRequestsTable,
  PipelinesTable,
  MergeRequestStats,
  ReadMeCard,
} from '../widgets';

export const GitlabCI = () => (
  <Page themeId="tool">
    <Content>
      <Grid container spacing={6} direction="row" alignItems="stretch">
        <Grid item sm={12} md={6} lg={4}>
          <ContributorsCard />
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <LanguagesCard />
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <MergeRequestStats />
        </Grid>
        <Grid item sm={12} md={8} lg={8}>
          <ReadMeCard  maxHeight={450}/>
        </Grid>
        <Grid item md={12}>
          <PipelinesTable />
        </Grid>
        <Grid item md={12}>
          <MergeRequestsTable />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
