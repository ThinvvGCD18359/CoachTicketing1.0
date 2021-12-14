import axiosClient from './axiosClient';

const coachApi = {
   getAllCoaches: (params) => {
      const url = '/coach';
      return axiosClient.get(url, {params});
   },
   getOwnerCoaches: (params) => {
      const url = '/coach/mycoach';
      return axiosClient.get(url, {params});
   },
   getPopularCoaches: (params) => {
      const url = '/coach/popular';
      return axiosClient.get(url, {params});
   },
   createCoach: (data) => {
      const url = '/coach/create/coach';
      return axiosClient.post(url, data);
   },
   createRoute: (data) => {
      const url = '/coach/create/route';
      return axiosClient.post(url, data);
   },
   getCoachDetail: (params) => {
      const url = '/coach/detail';
      return axiosClient.get(url, {params})
   },
   deleteCoach: (data) => {
      const url = '/coach/delete';
      return axiosClient.delete(url, {data});
   },
   editCoachDetail: (data) => {
      const url = '/coach/edit';
      return axiosClient.patch(url, data);
   },
   searchCoaches: (params) => {
      const url = '/coach/search';
      return axiosClient.get(url, {params})
   },
   getStatistic: () => {
      const url = '/coach/statistic/route/all';
      return axiosClient.get(url);
   },
   getBalanceStatistic: () => {
      const url = '/coach/statistic/balance';
      return axiosClient.get(url);
   },
   getBalanceDetail: () => {
      const url = '/coach/statistic/balance/detail';
      return axiosClient.get(url);
   }
};

export default coachApi;