import { useReducer, useEffect } from 'react';
import axios from 'axios';

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  UPDATE_HAS_NEXT_PAGE: 'update-has-next-page',
  ERROR: 'error',
};

// We add https://cors-anywhere.herokuapp.com before our original URL
// to work around CORS errors messages in development
// it basically access a proxy for us
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

// A reducer takes in the current state and an action
// which is what we are going to pass to the dispatch
// to update the state
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };
    case ACTIONS.GET_DATA:
      return {
        ...state, loading: false, jobs: action.payload.jobs,
      };
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return {
        ...state, hasNextPage: action.payload.hasNextPage,
      };
    case ACTIONS.ERROR:
      return {
        ...state, loading: false, error: action.payload.error, jobs: [],
      };
    default:
      return state;
  }
}

export default function useFetchJobs(params, page) {
  // useReducer returns an array and takes in a reducer
  // and an initial value as parameters, the later is passed in as an object
  // state corresponds to the initial value we are passing: { jobs: [], loading: false }
  // dispatch corresponds to the function we call in order to update our state
  // i.e. the reducer
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: false });

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
    const cancelToken2 = axios.CancelToken.source();

    // we just set our state to Loading
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios.get(BASE_URL, {
      cancelToken: cancelToken1.token,
      params: { markdown: true, page, ...params },
    }).then(res => {
      dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
    }).catch(e => {
      if (axios.isCancel(e)) return;
      dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
    });

    axios.get(BASE_URL, {
      cancelToken: cancelToken2.token,
      params: { markdown: true, page: page + 1, ...params },
    }).then(res => {
      dispatch({
        type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
        payload: { hasNextPage: res.data.length !== 0 },
      });
    }).catch(e => {
      if (axios.isCancel(e)) return;
      dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
    });

    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
    // whenever params or page change, we re-run the useEffect hook
  }, [params, page]);

  return state;
}
