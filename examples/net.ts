import axios from 'axios';
import { NetBase } from 'astraea';

export class Net extends NetBase {
  get = async (url, params, extra) => {
    return (await axios.get(url, {
      params,
      ...extra,
    })).data;
  }

  put = async (url, params, extra) => {
    return (await axios.put(url, params, extra)).data;
  }

  post = async (url, params, extra) => {
    return (await axios.post(url, params, extra)).data;
  }

  delete = async (url, params, extra) => {
    return (await axios.delete(url, {
      params,
      ...extra,
    })).data;
  }
}

export const net = new Net();