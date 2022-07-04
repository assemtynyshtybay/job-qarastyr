import { Button, FormControl, OutlinedInput, ThemeProvider } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import search from '../../assets/search-svgrepo-com.svg';
import style from '../../style/style';
import './Search.css';

type Props = {
  getSearchPanelData: (arg: any) => void;
  token: string | null;
};

export const Search: FC<Props> = ({ getSearchPanelData, token }) => {
  const [searchF, setSearch] = useState('');
  const navigate = useNavigate();
  const handleSearchData = useCallback(() => {
    if (token) {
      getSearchPanelData(searchF);
    } else {
      navigate('/sign-up');
    }
  }, [searchF, token]);
  return (
    <ThemeProvider theme={style}>
      <div className="container">
        <FormControl sx={{ m: 2, width: '100ch' }} variant="outlined">
          <OutlinedInput
            color="secondary"
            style={{ borderRadius: '10px', fontSize: '16px' }}
            value={searchF}
            onChange={(e) => setSearch(e.target.value)}
            endAdornment={<img src={search} className="S-logo" alt="logo" />}
            aria-describedby="outlined-weight-helper-text"
          />
        </FormControl>
        <Button
          color="secondary"
          size="large"
          style={{ fontSize: '20px', padding: '5px', marginRight: '10px' }}
          variant="text"
          onClick={handleSearchData}>
          Поиск
        </Button>
      </div>
    </ThemeProvider>
  );
};
