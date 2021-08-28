import { combineReducers } from 'redux';
import app from './app';
import photos from './photos';

export default combineReducers({
  app,
  photos,
});
