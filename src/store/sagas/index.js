import { all, fork } from 'redux-saga/effects';
import photos from './photos';

export default function* watchers() {
  yield all([
    photos,
  ].map(fork));
}
