import {
  GET_ALL_TOONS_PENDING,
  GET_ALL_TOONS_FULFILLED,
  GET_ALL_TOONS_REJECTED,
} from '../_redux/types';

export const fetchData = res => {
  return {
    type: GET_ALL_TOONS_PENDING,
    payload: res,
  };
};

export const fetchDataFulfilled = data => {
  return {
    type: GET_ALL_TOONS_FULFILLED,
    payload: data,
    isLoading: false,
  };
};

export const fetchDataRejected = error => {
  return {
    type: GET_ALL_TOONS_REJECTED,
    payload: error,
    isLoading: false,
  };
};
