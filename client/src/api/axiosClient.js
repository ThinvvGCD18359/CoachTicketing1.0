import axios from 'axios';
import queryString from 'query-string';
import firebase from 'firebase/app';


const getFirebaseToken = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) return currentUser.getIdToken();
  
    const hasRememberedAccount = localStorage.getItem('user');
    if (!hasRememberedAccount) return null;
  
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(null);
        console.log('Reject timeout');
      }, 10000);
  
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
          reject(null);
        }
  
        const token = await user.getIdToken();
        resolve(token);
  
        unregisterAuthObserver();
        clearTimeout(timer);
      });
    });
  }

const axiosClient = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
    'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await getFirebaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    
    return response;
}, (error) => {
    throw error;
});

export default axiosClient;