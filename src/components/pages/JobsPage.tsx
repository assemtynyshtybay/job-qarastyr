import axios from 'axios';
import { FC, useCallback } from 'react';
import { useEffect } from 'react';
import { JobItem } from '../job/JobItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../store/actions/jobActionCreator';
import { useTypedSelector } from '../hooks/useTypedSelector';
import {
  Container,
  FormControl,
  Grid,
  Pagination,
  Stack,
  styled,
  ThemeProvider,
} from '@mui/material';
import style from '../../style/style';
type Props = {
  search: any;
};
const JobsPage: FC<Props> = ({ search }) => {
  const jobs = useTypedSelector((state: any) => state.job.jobs);
  const { page, total_page } = useTypedSelector((state: any) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs({ search: search }) as any);
  }, [dispatch, search]);

  const fetchJobsPerPage = useCallback(
    ({ page = 0, searchText = search }) => {
      dispatch(fetchJobs({ page, search: searchText }) as any);
    },
    [dispatch],
  );

  return (
    <FormControl fullWidth>
      <ThemeProvider theme={style}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columnSpacing={{ xs: 1, sm: 2, md: 5 }}
          columns={{ xs: 2, sm: 8, md: 12 }}>
          {jobs?.map((item: any) => (
            <Grid key={item.id} item xs={2} sm={4} md={4}>
              <JobItem job={item} />
            </Grid>
          ))}
        </Grid>
        <Container
          maxWidth="xl"
          style={{
            marginLeft: '50%',
            marginTop: '20px',
            marginBottom: '20px',
            transform: 'translate(-25%, 50%)',
          }}>
          <Pagination
            count={total_page}
            page={page}
            variant="outlined"
            color="secondary"
            onChange={(e, value) => fetchJobsPerPage({ page: value })}
          />
        </Container>
      </ThemeProvider>
    </FormControl>
  );
};

export default JobsPage;
