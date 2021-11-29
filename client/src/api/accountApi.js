import axiosClient from './axiosClient';

const accountApi = {
    getAllUsers: (params) => {
        const url = '/admin';
        return axiosClient.get(url, { params });
    },
    addRole: (data) => {
        const url = '/admin/add/role';
        return axiosClient.patch(url, data);
    }
}

export default accountApi;