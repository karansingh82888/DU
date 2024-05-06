import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { API_KEY } from '../resources/ApiKeys';
import { BASE_URL } from '../resources/Endpoints';
import { movieItem } from '../types';

const dashboardReducer = createSlice({
  name: 'dashboardReducer',
  initialState: { dashboardData: [] },
  reducers: {
    updateDashboardData: (state, action) => {
      state.dashboardData = [...state.dashboardData,...action.payload] as any;
        
    }
  },
});

export const { updateDashboardData } =
dashboardReducer.actions;
export default dashboardReducer.reducer;

export const fetchDashboardData = (page,lang) => {
  return (dispatch) => {
    return new Promise<movieItem[]>((resolve, reject) => {
      fetch(`${BASE_URL}?language=${lang=="En"?'en-US':'ar'}&page=${page}`, {
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
        dispatch(updateDashboardData(response.results))
        resolve(response.results as movieItem[])
        }).catch(e => {
          reject(e)
        })
      })
    }
}


