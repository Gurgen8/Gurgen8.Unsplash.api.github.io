export const GET_PHOTOS_REQUEST = 'GET_PHOTOS_REQUEST';
export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const GET_PHOTOS_FAIL = 'GET_PHOTOS_FAIL';

export function getPhotosRequest(page, query = {}) {
  return {
    type: GET_PHOTOS_REQUEST,
    payload: {
      query,
      page,
    },
  };
}
