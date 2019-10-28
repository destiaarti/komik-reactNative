import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/toons';
import {API} from '../config/api';

//   const toons = (user_id, isSearch, title) => {
//     return dispatch => {
//       if (isSearch) {
//         dispatch(fetchData(false));
//         API.get(`/webtoons?title=${title}`)
//           .then(res => {
//             dispatch(fetchDataFulfilled(res.data));
//           })
//           .catch(error => {
//             dispatch(fetchDataRejected(error));
//           });
//       } else {
//         dispatch(fetchData(true));
//         API.get(`/webtoons`)
//           .then(res => {
//             dispatch(fetchDataFulfilled(res.data));
//           })
//           .catch(error => {
//             dispatch(fetchDataRejected(error));
//           });
//       }
//     };
//   };

//   export default toons;

export const getToons = () => {
  return dispatch => {
    dispatch(fetchData(true));
    API.get(`/webtoons`)
      .then(res => {
        dispatch(fetchDataFulfilled(res.data));
      })
      .catch(error => {
        dispatch(fetchDataRejected(error));
      });
  };
};

export default getToons;
