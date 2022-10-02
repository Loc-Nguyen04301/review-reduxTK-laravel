import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ReviewList.css";

import {
  retrieveReviews,
  findBySearch,
  deleteAllReview,
} from "../slices/review";

import ReactStars from "react-rating-stars-component";
const ReviewList = () => {
  const [search, setSearch] = useState("");

  const reviews = useSelector((state) => state.review.reviews);
  const dispatch = useDispatch();

  const getAllReviews = useCallback(() => {
    dispatch(retrieveReviews());
    // res = gia tri return khi tra ve o createAsyncThunk
  }, [dispatch]);

  useEffect(() => {
    getAllReviews();
  }, [getAllReviews]);

  const handleChangeSearch = useCallback(
    (e) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  const navigate = useNavigate();
  const handleClickFindBySearch = () => {
    if (search) {
      dispatch(findBySearch({ search: search }));
      navigate(`/reviews/search/keyword=${search}`);
    } else {
      getAllReviews();
      navigate("/");
    }
  };

  const handleClickRemoveAllReviews = useCallback(() => {
    dispatch(deleteAllReview());
  }, [dispatch]);

  // const printImage = (base64Image) => {
  //   const base64ImageArray = base64Image.split("  ");
  //   base64ImageArray.map((item, index) => {
  //     return console.log(
  //       <li key={index}>
  //         <img src={item} alt="React_IMG" width="100px" height="100px"></img>
  //       </li>
  //     );
  //   });
  // };

  return (
    <div className="list column">
      <div className="col-12">
        <div className="input-group mt-3 ">
          <input
            type="text"
            className="form-control"
            placeholder="Search Anything ..."
            value={search}
            onChange={handleChangeSearch}
          />
          <div className="input-group-append ms-2">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleClickFindBySearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 d-flex flex-column justify-content-between">
        <h4 className="Review-List">Review List</h4>
        <ul className="list-group">
          {reviews.map((review, index) => {
            const firstExample = {
              size: 30,
              count: 5,
              activeColor: "#ffd700",
              value: review.ratedValue,
              edit: false,
            };
            const base64ImageArray = review.base64Image.split("  ");
            var ImageArray = [];

            base64ImageArray.forEach((item, index) => {
              ImageArray.push(
                <img
                  src={item}
                  alt="React_IMG"
                  className="image m-3"
                  key={index}
                ></img>
              );
            });
            var dateFormat = new Date(review.updated_at);
            return (
              <li className="list-group-item my-3 border" key={index}>
                <Link
                  to={`/reviews/${review.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="d-flex justify-content-between align-items-end">
                    <p className="name">{review.name}</p>
                    <p className="email">{review.email}</p>
                  </div>
                  <ReactStars {...firstExample} />
                  <p className="updated_at">{dateFormat.toString()}</p>
                  <h1 className="response">Phản hồi của khách hàng</h1>
                  <p className="title">Tiêu đề: {review.title}</p>
                  <p className="description">Nội dung: {review.description}</p>
                  <div className="d-flex flex-wrap">
                    {ImageArray.map((item) => item)}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        {search.length === 0 ? (
          <button
            className="mt-3 btn btn-sm btn-danger"
            onClick={handleClickRemoveAllReviews}
          >
            Remove All
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
