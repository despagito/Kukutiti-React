import { contentConstants } from '../constants';

const API_BASE = 'https://www.reddit.com';

export const fetchKKTT = (params = {}) => {
  const request = data => ({ type: contentConstants.GET_REDDIT_POSTS_REQUEST, data });
  const success = data => ({ type: contentConstants.GET_REDDIT_POSTS_SUCCESS, data });
  const failure = error => ({ type: contentConstants.GET_REDDIT_POSTS_FAILURE, error });

  const { sort = 'hot' } = params;

  return (dispatch) => {
    console.log('fetchKKTT.type', sort);
    dispatch(request({ sort }));

    fetch(`${API_BASE}/${sort}.json`)
      .then(response => response.json())
      .then(
        (json) => {
          console.log('fetchKKTT.data', json);
          dispatch(success(json.data));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

export const fetchSubKT = (params = {}) => {
  const request = data => ({ type: contentConstants.GET_SUBREDDIT_POSTS_REQUEST, data });
  const success = data => ({ type: contentConstants.GET_SUBREDDIT_POSTS_SUCCESS, data });
  const failure = error => ({ type: contentConstants.GET_SUBREDDIT_POSTS_FAILURE, error });

  const { sub, sort = 'hot' } = params;

  return (dispatch) => {
    console.log('fetchSubKT.type', sort);
    dispatch(request({ sort }));

    fetch(`${API_BASE}/r/${sub}/${sort}.json`)
      .then(response => response.json())
      .then(
        (json) => {
          console.log('fetchSubKT.data', json);
          dispatch(success(json.data));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

export const fetchSubKTList = () => {
  const request = () => ({ type: contentConstants.GET_SUBREDDIT_LIST_REQUEST });
  const success = data => ({ type: contentConstants.GET_SUBREDDIT_LIST_SUCCESS, data });
  const failure = error => ({ type: contentConstants.GET_SUBREDDIT_LIST_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    fetch(`${API_BASE}/subreddits.json`)
      .then(response => response.json())
      .then(
        (json) => {
          console.log('fetchSubKTList.data', json);
          dispatch(success(json.data));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

export const changeKTSorting = (params = {}) => {
  const request = newSort => ({ type: contentConstants.CHANGE_SORT_REQUEST, newSort });

  const { sort = 'hot' } = params;

  return (dispatch) => {
    console.log('changeKTSorting.type', sort);
    dispatch(request(sort));
  };
}

export const expandItem = (item) => {
  const request = itemName => ({ type: contentConstants.EXPAND_ITEM_REQUEST, itemName });

  return (dispatch) => {
    console.log('expandItem.item', item);
    dispatch(request(item.name));
  };
}

export const setModalContentItem = (item) => {
  const request = item => ({ type: contentConstants.SET_MODAL_ITEM_REQUEST, item });

  return (dispatch) => {
    console.log('setModalContentItem.item', item);
    dispatch(request(item));
  };
}

export const loadMoreKTItems = (params = {}) => {
  const request = data => ({ type: contentConstants.LOAD_MORE_REQUEST, data });
  const success = data => ({ type: contentConstants.LOAD_MORE_SUCCESS, data });
  const failure = error => ({ type: contentConstants.LOAD_MORE_FAILURE, error });

  const { sort = 'hot', after } = params;

  return (dispatch) => {
    console.log('loadMoreKTItems.sort, after', sort, after);
    dispatch(request({ sort }));

    fetch(`${API_BASE}/${sort}.json?after=${after}`)
      .then(response => response.json())
      .then(
        (json) => {
          console.log('loadMoreKTItems.data', json);
          dispatch(success(json.data));
        },
        (error) => {
          dispatch(failure(error));
          // dispatch(alertActions.fail({ ...error, method: 'fetchKKTT' }));
        },
      );
  }
}

export const loadMoreSubKTItems = (params = {}) => {
  const request = data => ({ type: contentConstants.LOAD_MORE_REQUEST, data });
  const success = data => ({ type: contentConstants.LOAD_MORE_SUCCESS, data });
  const failure = error => ({ type: contentConstants.LOAD_MORE_FAILURE, error });

  const { sub, sort = 'hot', after } = params;

  return (dispatch) => {
    console.log('loadMoreSubKTItems.sort, after', sort, after);
    dispatch(request({ sort }));

    fetch(`${API_BASE}/r/${sub}/${sort}.json?after=${after}`)
      .then(response => response.json())
      .then(
        (json) => {
          console.log('loadMoreSubKTItems.data', json);
          dispatch(success(json.data));
        },
        (error) => {
          dispatch(failure(error));
          // dispatch(alertActions.fail({ ...error, method: 'fetchKKTT' }));
        },
      );
  }
}

export const fetchPostComments = (item) => {
  const request = data => ({ type: contentConstants.GET_POST_COMMENTS_REQUEST, data });
  const success = (data, item) => ({ type: contentConstants.GET_POST_COMMENTS_SUCCESS, data, item });
  const failure = error => ({ type: contentConstants.GET_POST_COMMENTS_FAILURE, error });

  return (dispatch) => {
    console.log('fetchPostComments.item', item);
    dispatch(request({ item }));

    // remove the last slash from the permalink
    const commentEndpoint = item.permalink.replace(/\/$/, '');

    fetch(`${API_BASE}/${commentEndpoint}.json`)
      .then(response => response.json())
      .then(
        (json) => {
          console.log('fetchPostComments.data', json);
          dispatch(success(json[1].data, item));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}
