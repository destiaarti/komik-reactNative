import {
  GET_FAVS_PENDING,
  GET_FAVS_FULFILLED,
  GET_FAVS_REJECTED,
} from '../_redux/types';

const initialState = {
  data: [],
  error: null,
  isLoading: true,
};

const favorite = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVS_PENDING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_FAVS_FULFILLED:
      return {
        ...state,
        favorite: action.payload,
        isLoading: action.isLoading,
      };
    case GET_FAVS_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default favorite;
