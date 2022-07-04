import { Favorite } from '@mui/icons-material';
import { Container, FormControl, Grid, styled } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { Search } from '../search-panel/Search';
import Favourites from './Favourites';
import JobsPage from './JobsPage';

const Header = styled('h1')`
  padding: 50px auto 20px;
  margin-top: 50px;
  margin-bottom: 10px;
  font-size: 50px;
  text-align: center;
`;
type Props = {
  token: string | null;
};
const MainPage: FC<Props> = ({ token }) => {
  const [search, setSearch] = useState('');
  const handleGetSearchPanelData = useCallback((data: any) => {
    setSearch(data);
  }, []);
  return (
    <Container>
      <Grid item xs={12} md={3} sm={6}></Grid>
      <Header>Мы нашли для вас работу! </Header>
      <Search getSearchPanelData={handleGetSearchPanelData} token={token} />
      <JobsPage search={search} />
    </Container>
  );
};
export default MainPage;
