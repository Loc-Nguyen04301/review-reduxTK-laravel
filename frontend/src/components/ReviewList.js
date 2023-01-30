import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./ReviewList.css";
import "./pagination.css";

import { retrieveReviews, deleteAllReview } from "../slices/review";

import ReactStars from "react-rating-stars-component";
import ReactPaginate from "react-paginate";

const ReviewList = () => {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const reviews = useSelector((state) => state.review.reviews);
  // eslint-disable-next-line
  const searchedReviews = reviews.filter((review) => {
    if (search === "") {
      return review;
    }
    if (
      review.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      review.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      review.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      review.description
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase())
    ) {
      return review;
    }
  });

  // Pagination
  const reviewPerPage = 4;
  const visitedPage = pageNumber * reviewPerPage;
  const displayPage = searchedReviews.slice(
    visitedPage,
    visitedPage + reviewPerPage
  );
  // Number of page
  const pageCount = Math.ceil(searchedReviews.length / reviewPerPage);
  const handleChangePage = ({ selected }) => {
    setPageNumber(selected);
  };

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

  const handleClickRemoveAllReviews = useCallback(() => {
    dispatch(deleteAllReview());
  }, [dispatch]);

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
        </div>
      </div>

      <div className="col-12 d-flex flex-column justify-content-between">
        <h4 className="Review-List">Review List</h4>
        <ul className="list-group">
          {displayPage.map((review, index) => {
            const firstExample = {
              size: 30,
              count: 5,
              activeColor: "#ffd700",
              value: review.ratedValue,
              edit: false,
            };
            let ImageArray = [];

            if (review.base64Image != null) {
              const base64ImageArray = review.base64Image.split(" ");
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
            }
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

      <div>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handleChangePage}
          nextLabel="Next>"
          previousLabel="<Previous"
          containerClassName="paginationBtn"
        />
      </div>
    </div>
  );
};

export default ReviewList;
