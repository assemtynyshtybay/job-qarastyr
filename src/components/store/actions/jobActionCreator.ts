import axios from 'axios';
import { Dispatch } from 'react';
import { string } from 'yup';
import { Job, JobActionType } from '../../types/jobsTypes';
 
export const fetchJobs = ({page = 0, perPage= 9, search = ''}={}) =>(dispatch: Dispatch<any>) => {
    axios.get(`https://api.hh.ru/vacancies?page=${page}&per_page=${perPage}&text=${search}`)
    .then(res => {
        dispatch({type: JobActionType.FETCH_JOBS, payload: res.data.items});
        dispatch({
                type: JobActionType.FETCH_PAGE,
                payload: {
                    page: res.data.page,
                    total_pages: +Math.min(res.data.pages, 100)
                }
            })
    })
};
type Data = {
    token: string,
    favourites: Job[]
}
export const putFavours= (data: Data[]) => {
  return axios
    .put(
      "https://diploma-414a7-default-rtdb.firebaseio.com/data.json?api_key=AIzaSyAkn13xO0ineF9mhiNyIOQTKWf7GnJWKLM",
      data
    )
    .then((res) => res.data);
};
export const fetchFavours = () => {
  return axios
    .get<Data[]>(
      `https://diploma-414a7-default-rtdb.firebaseio.com/data.json?api_key=AIzaSyAkn13xO0ineF9mhiNyIOQTKWf7GnJWKLM/`,
    )
    .then((res) => console.log(res.data));
};

