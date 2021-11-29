import firebase from 'firebase/app';
import axiosClient from './axiosClient';

const userApi = {
  getUser: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = firebase.auth().currentUser;

        resolve({
          id: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          photoUrl: currentUser.photoURL,
          phoneNumber: currentUser.phoneNumber,
        })
      }, 500);
    })
  },

  isUserExist: (params) => {
    const url = '/user';
    return axiosClient.get(url, { params });
  },

  addNewUser: (data) => {
    const url = '/user/add/user';
    return axiosClient.post(url, data);
  },
  
  getUserData: (params) => {
    const url = '/user/get/currentuser';
    return axiosClient.get(url, {params});
  },
}

export default userApi;