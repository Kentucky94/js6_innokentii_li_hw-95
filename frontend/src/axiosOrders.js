import axios from 'axios';
import {store} from "./index";

const axiosOrders = axios.create({
  baseURL: 'http://localhost:8080'
});

axiosOrders.interceptors.request.use(config => {
  try{
    config.headers['Authorization'] = 'Token ' + store.getState().users.user.token;
  }catch(error){}

  return config;
});

export default axiosOrders;