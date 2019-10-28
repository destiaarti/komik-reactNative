import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/favorite';
import axios from 'axios';

export const getFav = (id, token) => {
  return dispatch => {
    dispatch(fetchData(true));
    axios({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      url: `192.168.1.67:2019/api/v1/user/${id}/favorites`,
    })
      .then(res => {
        dispatch(fetchDataFulfilled(res.data));
      })
      .catch(error => {
        dispatch(fetchDataRejected(error));
      });
  };
};

export default getFav;
