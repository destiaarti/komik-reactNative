import {
  GET_FAVS_PENDING,
  GET_FAVS_FULFILLED,
  GET_FAVS_REJECTED,
} from '../_redux/types';

export const fetchData = res => {
  return {
    type: GET_FAVS_PENDING,
    payload: res,
  };
};

export const fetchDataFulfilled = data => {
  return {
    type: GET_FAVS_FULFILLED,
    payload: data,
    isLoading: false,
  };
};

export const fetchDataRejected = error => {
  return {
    type: GET_FAVS_REJECTED,
    payload: error,
    isLoading: false,
  };
};
