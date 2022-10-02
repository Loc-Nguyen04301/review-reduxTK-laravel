import http from "../http-common";
const readOne = (id) => {
  return http.get(`/readOne/${id}`);
};
const readAll = () => {
  return http.get("/readAll");
};
const readAllBySearch = (search) => {
  return http.get(`/readAllBySearch/${search}`);
}
const update = (id, data) => {
  return http.put(`/update/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/delete/${id}`);
};
const removeAll = () => {
  return http.delete(`/deleteAll`);
};

const ReviewService = {
  readAll,
  readAllBySearch,
  readOne,
  update,
  remove,
  removeAll,
};
export default ReviewService;
