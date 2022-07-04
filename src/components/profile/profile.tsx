import { yupResolver } from '@hookform/resolvers/yup';
import emailjs, { init } from 'emailjs-com';
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import style from '../../style/style';
import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
init('OKXxmjNErUNHOPGT8');
const Box = styled('div')`
  margin: 0 auto;
  width: 50%;
`;
const Block = styled('div')`
  display: flex;
  flex-direction: column;

  width: 50%;
`;
const formValidation = yup.object().shape({
  email: yup
    .string()
    .required('**Почта обязательна!')
    .max(50, '**Длина пароля должна быть не менее 8 символов!')
    .matches(/^\S+@\S+$/i, '**Не правильный формат!'),
  phone: yup
    .string()
    .required('**Телефон обязателен!')
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
      '**Не правильный формат(+18888888888)!',
    ),
  fname: yup.string().required('**Имя обязательно!').max(50, '**Длина привышает!'),
  sname: yup.string().required('**Фамилия обязательна!').max(50, '**Длина привышает!'),
});

const Profile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(formValidation),
  });
  const params = useParams();
  const [attempt, setAttempt] = useState(true);
  const [job, setJob] = useState({});
  const [univer, setUniver] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.hh.ru/vacancies/${params.id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [params.id]);

  const handleSubmitToJob = (user: any, job: any) => {
    const templateId = 'template_bblkwws';
    const message = `
      Здравствуйте, я ${user.fname} ${user.sname}, хотела бы работать в вашей компании!
      Ниже предоставляю данные обо мне:\n
      Номер телефона: ${user.phone};\n
      Почта: ${user.email};\n
    `;
    sendFeedback(templateId, {
      message: message,
      from_name: `${user.fname} ${user.sname}`,
      to_name: job.employer.name,
    });
  };
  const sendFeedback = (templateId: string, variables: Record<string, unknown> | undefined) => {
    emailjs
      .send('service_jq_01', templateId, variables)
      .then((res) => {
        alert('Заявка отправлена!');
      })
      .catch((err) =>
        console.error('Oh well, you failed. Here some thoughts on the error that occured:', err),
      );
  };
  const onSubmit = (data: any) => {
    localStorage.setItem('profile', JSON.stringify(data));
    handleSubmitToJob(data, job);
    navigate('/');
  };

  return (
    <ThemeProvider theme={style}>
      <Container style={{ padding: '20px', textAlign: 'center' }}>
        <Box>
          <Typography fontSize={50}>Ваш профиль</Typography>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              margin: '0 auto',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
            }}
            onSubmit={handleSubmit(onSubmit)}>
            <Typography color="secondary" fontSize={30}>
              Контактные данные
            </Typography>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="email">*E-mail</InputLabel>
              <OutlinedInput {...register('email')} id="email" type="text" label="E-mail" />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="phone">*Номер телефона</InputLabel>
              <OutlinedInput {...register('phone')} id="phone" type="text" label="phone" />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="fname">*Имя</InputLabel>
              <OutlinedInput {...register('fname')} id="fname" type="text" label="fname" />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="sname">*Фамилия</InputLabel>
              <OutlinedInput {...register('sname')} id="sname" type="text" label="sname" />
            </FormControl>
            <Typography color="secondary" fontSize={30}>
              Основная информация
            </Typography>
            <Block>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <TextField
                  id="date"
                  label="Дата рождения"
                  type="date"
                  size="medium"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('brth')}
                  style={{ marginTop: '25px' }}
                />
              </FormControl>
            </Block>
            <FormControl style={{ display: 'flex', textAlign: 'left', margin: '10px 10px' }}>
              <FormLabel id="demo-radio-buttons-group-label">Пол:</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group">
                <FormControlLabel
                  value="Female"
                  control={<Radio {...register('gender')} />}
                  label="Женский"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio {...register('gender')} />}
                  label="Мужской"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio {...register('gender')} />}
                  label="Другое"
                />
              </RadioGroup>
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="citizenship">Гражданство</InputLabel>
              <OutlinedInput
                {...register('citizenship')}
                id="citizenship"
                type="text"
                label="E-mail"
              />
            </FormControl>
            <FormControl style={{ display: 'flex', textAlign: 'left', margin: '10px 10px' }}>
              <FormLabel id="demo-radio-buttons-group-label">Опыт работы:</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="no"
                name="radio-buttons-group">
                <FormControlLabel
                  value="есть"
                  control={<Radio {...register('experience')} />}
                  label="есть"
                />
                <FormControlLabel
                  value="нет"
                  control={<Radio {...register('experience')} />}
                  label="нет"
                />
              </RadioGroup>
            </FormControl>
            <Typography color="secondary" fontSize={30}>
              Образование
            </Typography>
            <Block>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel id="univer">Университет</InputLabel>
                <Select
                  style={{}}
                  labelId="univer"
                  id="demo-multiple-name"
                  value={univer}
                  {...register('univer')}
                  onChange={(e) => setUniver(e.target.value)}>
                  <MenuItem value="КБТУ" key="1">
                    КБТУ
                  </MenuItem>
                  <MenuItem value="АУЭС" key="2">
                    АУЭС
                  </MenuItem>
                  <MenuItem value="МУИТ" key="3">
                    МУИТ
                  </MenuItem>
                  <MenuItem value="СДУ" key="4">
                    СДУ
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="degree">Степень</InputLabel>
                <OutlinedInput {...register('degree')} id="degree" type="text" label="E-mail" />
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="specialty">Специальность</InputLabel>
                <OutlinedInput
                  {...register('specialty')}
                  id="specialty"
                  type="text"
                  label="E-mail"
                />
              </FormControl>
            </Block>
            <Button type="submit" style={{}} size="large" color="secondary" variant="outlined">
              Отправить
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Profile;
