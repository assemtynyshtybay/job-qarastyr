import React, { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import style from '../../style/style';
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
const formValidation = yup.object().shape({
  email: yup
    .string()
    .required('**Почта обязательна!')
    .max(50, '**Длина пароля должна быть не менее 8 символов!')
    .matches(/^\S+@\S+$/i, '**Не правильный формат!'),
  name: yup.string().required('**Имя обязателльно!'),
  password: yup
    .string()
    .required('**Пароль обязателен!')
    .min(8, '**Пароль должен содержать как минимум 8 символов!'),
  cPassword: yup
    .string()
    .required('**Подтвердите пароль!')
    .min(8, '**Пароль должен содержать как минимум 8 символов!')
    .oneOf([yup.ref('password')], '**Пароли не совпадают!'),
});
type Props = {
  login(token: string | null): void;
};
const SignUp: FC<Props> = ({ login }) => {
  const [visibility, setVisibility] = useState(true);
  const [cVisibility, setCVisibility] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [text, setText] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<User>({
    mode: 'onTouched',
    resolver: yupResolver(formValidation),
  });
  const onSubmit: SubmitHandler<User> = (data: User) => {
    sendUserData(data);
  };
  function handleClose() {
    setIsOpen(false);
  }
  const handleClickShowPassword = () => {
    setVisibility(!visibility);
  };
  const handleClickShowCPassword = () => {
    setCVisibility(!cVisibility);
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const sendUserData = (userData: User) => {
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkn13xO0ineF9mhiNyIOQTKWf7GnJWKLM`,
        {
          email: userData.email,
          password: userData.password,
          returnSecureToken: true,
        },
      )
      .then((data) => {
        setText('Успешно✅');
        setIsOpen(true);
        login(data.data.idToken);
        localStorage.setItem('idToken', data.data.idToken);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((error) => {
        setText('Такой пользователь уже существует!');
        setIsOpen(true);
      });
  };

  return (
    <ThemeProvider theme={style}>
      <div>
        <Container maxWidth="sm">
          <div style={{ marginTop: '10px' }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Typography
                color="secondary"
                style={{ textAlign: 'center', marginBottom: '5px' }}
                mt={2}>
                Регистрация
              </Typography>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <OutlinedInput {...register('email')} id="email" type="text" label="E-mail" />
                {errors.email?.message}
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="name">Имя</InputLabel>
                <OutlinedInput {...register('name')} id="name" type="text" label="Name" />
                {errors.name?.message}
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="password">Пароль</InputLabel>
                <OutlinedInput
                  {...register('password')}
                  id="password"
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
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="cPassword">Повторите пароль</InputLabel>
                <OutlinedInput
                  {...register('cPassword')}
                  id="cPassword"
                  type={!cVisibility ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end">
                        {cVisibility ? (
                          <VisibilityOff color="secondary" />
                        ) : (
                          <Visibility color="secondary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Повторите пароль"
                />
                {errors.cPassword?.message}
              </FormControl>
              <Buttons style={{ marginTop: '10px' }}>
                <Button type="submit" variant="contained" color="secondary">
                  Регистрация
                </Button>
              </Buttons>
              {/* { token ? 'AUTHORISED' : 'NOT AUTHORISED'} */}
            </Form>
            <Dialog onClose={handleClose} open={isOpen}>
              <DialogTitle>{text}</DialogTitle>
            </Dialog>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default SignUp;
