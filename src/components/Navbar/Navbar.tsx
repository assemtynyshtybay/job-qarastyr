import React, { FC, useCallback } from 'react';
import { AppBar, Box, Button, styled, Container, Toolbar, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_jq.svg';
import style from '../../style/style';
import { Auth } from '../../context/Auth';

const Img = styled('img')`
  padding: 5px;
`;
type Props = {
  token: string | null;
  logout(): void;
};
export const Navbar: FC<Props> = ({ token, logout }) => {
  const navigate = useNavigate();
  const logOut = useCallback(() => {
    logout();
    localStorage.clear();
    navigate('sign-in');
  }, []);
  return (
    <ThemeProvider theme={style}>
      <AppBar position="static" color="secondary">
        <Container fixed>
          <Toolbar disableGutters>
            <Img src={logo} className="App-logo" alt="logo" />
            <Box sx={{ flexGrow: 0.1 }}>
              <Button
                onClick={() => navigate('/')}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                Главная
              </Button>
            </Box>
            <Box sx={{ flexGrow: 3 }}>
              <Button
                onClick={() => navigate('/about-us')}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                О нас
              </Button>
            </Box>
            {token ? (
              <div style={{ display: 'flex' }}>
                 <Box sx={{ flexGrow: 0 }}>
                  <Button
                    onClick={() => navigate('/favourites')}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                    Избранные 
                  </Button>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Button onClick={logOut} sx={{ my: 2, color: 'white', display: 'block' }}>
                    Выход
                  </Button>
                </Box>
              </div>
            ) : (
              <div style={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 0 }}>
                  <Button
                    onClick={() => navigate('/sign-in')}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                    Вход
                  </Button>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Button
                    onClick={() => navigate('/sign-up')}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                    Регистрация
                  </Button>
                </Box>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
function useContext(Auth: any): { token: any; login: any } {
  throw new Error('Function not implemented.');
}
