import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_PHOTOS_FAIL, GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS } from '../actions/photos';
import Api from '../../Api';

export default function* watcher() {
  yield takeLatest(GET_PHOTOS_REQUEST, handleGetPhotos);
}

function* handleGetPhotos(action) {
  try {
    const {
      query,
      page,
    } = action.payload;
    const { data } = yield call(Api.search, page, query);
    yield put({
      type: GET_PHOTOS_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (e) {
    yield put({
      type: GET_PHOTOS_FAIL,
      message: e.message,
      payload: {
        data: e.response?.data,
      },
    });
  }
}
