import axiosClient from './axiosClient';

const ticketApi = {
   getAllTicket: (params) => {
      const url = '/ticket';
      return axiosClient.get(url, {params});
   },
   addNewTicket: (data) => {
       const url = '/ticket/add';
       return axiosClient.post(url, data);
   },
   getUserTicket: (params) => {
      const url = '/ticket/myticket';
      return axiosClient.get(url, {params});
   },
   getDetailTicket: (params) => {
      const url = '/ticket/detail';
      return axiosClient.get(url, {params});
   }
};

export default ticketApi;