import { GET_PHOTOS_FAIL, GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS } from '../actions/photos';

const initialState = {

  photoList: [],
  photoListInfo: {},
  photoListStatus: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS_REQUEST: {
      return {
        ...state,
        photoList: [],
        photoListStatus: 'request',
      };
    }
    case GET_PHOTOS_FAIL: {
      return {
        ...state,
        photoListStatus: 'fail',
      };
    }
    case GET_PHOTOS_SUCCESS: {
      const {
        results,
        ...photoListInfo
      } = action.payload.data;
      console.log(photoListInfo);
      return {
        ...state,
        photoList: results,
        photoListInfo,
        photoListStatus: 'ok',
      };
    }
    default: {
      return state;
    }
  }
}
