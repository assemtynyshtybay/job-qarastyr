import { Container, Grid, styled } from '@mui/material';
import { FC, useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { JobItem } from '../job/JobItem';
import { fetchFavours } from '../store/actions/jobActionCreator';
const Favorites = styled('div')`
    margin: 20px auto;
`
type Props = {
  token: string;
};
const Favourites: FC<Props> = ({ token }) => {
  const jobs = useTypedSelector((state: any) => state.job.favourites);
  useEffect(() => {
    fetchFavours();
  }, [token]);
  return (
    <Favorites>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columnSpacing={{ xs: 1, sm: 2, md: 5 }}
        columns={{ xs: 2, sm: 8, md: 12 }}>
        {jobs?.map((item: any) => (
          <Grid item xs={2} sm={4} md={4}>
            <JobItem key={item.id} job={item} />
          </Grid>
        ))}
      </Grid>
    </Favorites>
  );
};

export default Favourites;
