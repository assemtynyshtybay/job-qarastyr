import React, { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import {
  Container,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  ThemeProvider,
} from '@mui/material';
import { Login, Visibility, VisibilityOff } from '@mui/icons-material';
import styled from '@emotion/styled';
import style from '../../style/style';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';

import { User } from '../../types/user';

const Form = styled('form')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column;
  padding: 20px 20px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;
const Buttons = styled('div')`
  margin: 0 auto;
`;
export const formValidationIn = yup.object().shape({
  email: yup.string().required(''),
  password: yup.string().required(''),
});
type Props = {
  login(token: string | null): void;
};
const SignIn: FC<Props> = ({ login }) => {
  const [visibility, setVisibility] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<User>({
    mode: 'onTouched',
    resolver: yupResolver(formValidationIn),
  });

  const onSubmit = (data: User) => {
    setUserData(data);
  };

  function handleClose() {
    setIsOpen(false);
  }
  const handleClickShowPassword = () => {
    setVisibility(!visibility);
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  function setUserData(data: User) {
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkn13xO0ineF9mhiNyIOQTKWf7GnJWKLM`,
        {
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        },
      )
      .then((data) => {
        login(data.data.idToken);
        localStorage.setItem('idToken', data.data.idToken);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch((error) => {
        setText('Такой пользователь не существует!');
        alert(`Failed to Authorize. Error message: ${error.response.data.error.message}`);
      });
  }
  return (
    <ThemeProvider theme={style}>
      <Container maxWidth="sm">
        <div className="sign-in">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="email">Почта</InputLabel>
              <OutlinedInput {...register('email')} id="email" type="text" label="Почта" />
              {errors.email?.message}
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="password">Пароль</InputLabel>
              <OutlinedInput
                id="password"
                {...register('password')}
                type={!visibility ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {visibility ? (
                        <VisibilityOff color="secondary" />
                      ) : (
                        <Visibility color="secondary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Пароль"
              />
              {errors.password?.message}
            </FormControl>
            <Buttons>
              <Button type="submit" variant="contained" color="secondary">
                Войти
              </Button>
            </Buttons>
            {/* {JSON.parse(`${localStorage.getItem('idToken')}`) ? 'AUTHORISED' : 'NOT AUTHORISED'} */}
          </Form>
          <Dialog onClose={handleClose} open={isOpen}>
            <DialogTitle>{text}</DialogTitle>
          </Dialog>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
