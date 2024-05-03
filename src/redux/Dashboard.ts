import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { API_KEY } from '../resources/ApiKeys';
import { Strings } from '../resources/Strings';
import { movieItem } from '../types';

const dashboardReducer = createSlice({
  name: 'dashboardReducer',
  initialState: { dashboardData: [] },
  reducers: {
    updateDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    }
  },
});

export const { updateDashboardData } =
dashboardReducer.actions;
export default dashboardReducer.reducer;

export const fetchDashboardData = (page) => {
  return (dispatch) => {
    return new Promise<movieItem[]>((resolve, reject) => {
      fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }).then(async (res) => {
        let response = await res.json()
        response.results = response.results.map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`
          }
        })
        dispatch(updateDashboardData(response))
        resolve(response.results as movieItem[])
        }).catch(e => {
          reject(e)
        })
      })
    }
}


