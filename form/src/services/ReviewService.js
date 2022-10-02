import http from '../http-common'
const create = (formField) => {
  return http.post('/create', formField);
};

const ReviewService = {
  create,
};

export default ReviewService;
