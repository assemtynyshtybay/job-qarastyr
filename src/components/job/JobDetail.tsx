import React, { useCallback, useEffect, useState } from 'react';
import { Button, styled } from '@mui/material';
import { Job, JobActionType } from '../types/jobsTypes';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Loc from '../../assets/Lock.svg';
import icons from '../../assets/icons.png';

const Box = styled('div')`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 50px;
  font-size: 45px;
  position: relative;

  /* background: linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.8) 80.79%); */
`;
const SimilarJob = styled('button')`
  display: flex;
  flex-basis: 500px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 10px;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 10px;
  font-size: 24px;
  text-align: left;
  font-size: large;
  /* background: linear-gradient(180deg, rgba(150, 29, 29, 0) 0%, rgba(29, 29, 29, 0.8) 99.79%); */
`;
const SimilarJobs = styled('div')`
  display: flex;
  margin: 0 auto;
  padding: 48px 0px;
  width: 55%;
  overflow-x: auto;
  background: linear-gradient(180deg, #9d355d 0%, rgba(29, 29, 29, 0.8) 99.79%);
`;
const Title = styled('div')`
  font-weight: bold;
  color: #000000;
  font-size: 36px;
  /* font-weight: 400; */
  font-style: normal;
  line-height: 42px;
  height: 100%;
  overflow: hidden;
`;

const Description = styled('div')`
  font-size: 24px;
  margin-top: 10px;
`;
const Salary = styled('div')`
  font-size: 24px;
  margin-top: 10px;
`;

const Time = styled('div')`
  font-size: 32px;
  margin: 20px;
  color: #585858;
`;

const Text = styled('div')`
  text-align: center;
  font-size: 38px;
`;

const Location = styled('div')``;
const Img = styled('img')`
  height: 5vmin;
  /* display: flex; */
`;
const ImgLike = styled('img')`
  height: 5vmin; ;
`;

const JobDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [job, setData] = useState<Job>();

  const [similarJobs, setSimilarJobs] = useState<Job[]>();
  const navigate = useNavigate();
  const handleLike = useCallback( (job: Job)=>{ 
    dispatch({type: JobActionType.ADD_FAVOUR, payload: job})
  }, [dispatch])

  useEffect(() => {
    fetch(`https://api.hh.ru/vacancies/${params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
    fetch(`https://api.hh.ru/vacancies/${params.id}/similar_vacancies`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSimilarJobs(data.items);
      });
  }, [params.id]);

  return (
    <>
      {job && (
        <Box>
          <Title>
            {job.name} / {job.schedule.name}
            <Button onClick = { () => handleLike(job) }
            >
              <ImgLike src={icons} />
            </Button>
          </Title>
          <Time>
            Вакансия опубликована:&nbsp;{moment(job.published_at).format('hh:mm DD/MM/YYYY')}
          </Time>

          <Location>
            <Img src={Loc} className="Loc-logo" alt="l-logo" /> {job.area.name}
          </Location>

          <Salary>
            Зарплата:&nbsp;
            {job.salary ? '' : 'Не указано'}
            {job.salary?.from} {job.salary?.from ? 'KZT' : null} {job.salary?.to ? 'до' : null}{' '}
            {job.salary?.to} {job.salary?.to ? 'KZT' : null}
          </Salary>
          <Description>Описание:</Description>
          <Description>{job.snippet?.requirement}</Description>
          <Description>{job.snippet?.responsibility}</Description>

          <Button
            variant="contained"
            onClick={() => {
              navigate(`/profile/${job.id}`);
            }}
            style={{
              fontSize: '15px',
              padding: '10px',
              width: '20%',
              color: 'white',
              backgroundColor: '#9D355D',
              marginTop: '20px',
            }}>
            Откликнуться
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            style={{
              fontSize: '15px',
              padding: '10px',
              color: 'white',
              width: '20%',
              backgroundColor: '#9D355D',
              marginTop: '20px',
            }}>
            Назад
          </Button>
        </Box>
      )}

      <Text>Похожие запросы</Text>

      <SimilarJobs>
        {similarJobs?.map((job) => (
          <SimilarJob
            key={job.id}
            style={{ backgroundColor: '#F8D198' }}
            onClick={() => navigate(`/job-details/${+job.id}`)}>
            <Title>{job.name}</Title>
            <Description>{job.schedule.name}</Description>
            <Salary>
              Зарплата:
              {job.salary ? '' : 'Не указано'}
              {job.salary?.from} {job.salary?.from ? 'KZT' : null} {job.salary?.to ? 'до' : null}{' '}
              {job.salary?.to} {job.salary?.to ? 'KZT' : null}
            </Salary>
          </SimilarJob>
        ))}
      </SimilarJobs>
    </>
  );
};

export default JobDetails;
