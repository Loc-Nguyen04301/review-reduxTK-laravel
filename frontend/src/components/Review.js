import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ReviewService from "../services/ReviewService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ReactStars from "react-rating-stars-component";

import {
  // extraReducer
  updateReview,
  deleteReview,
  retrieveOneReview,
  //reducer
  setCurrentReview,
} from "../slices/review";

const Review = () => {
  const dispatch = useDispatch();
  var currentReview = useSelector((state) => state.review.currentReview);
  // get id param from the URL that match by <Route path>
  //<Route path="/reviews/:id" element={<Review />} />
  const { id } = useParams();
  const navigate = useNavigate();

  const getReview = useCallback(() => {
    dispatch(retrieveOneReview({ id })).unwrap();
  }, [dispatch, id]);

  useEffect(() => getReview(), [getReview]);

  const handleChangeInput = useCallback(
    (e) => {
      dispatch(
        setCurrentReview({ ...currentReview, [e.target.name]: e.target.value })
      );
      console.log(currentReview);
    },
    [currentReview, dispatch]
  );

  const handleClickRemoveReview = useCallback(() => {
    dispatch(deleteReview({ id: id }));
  }, [dispatch, id]);

  const handleClickUpdate = useCallback(() => {
    dispatch(updateReview({ id: id, data: currentReview })).unwrap();
  }, [dispatch, id, currentReview]);

  const notify = () =>
    toast.success("Successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      <div>
        {currentReview ? (
          <div className="edit-form">
            <h4>REVIEW</h4>
            <form>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  name="id"
                  placeholder={currentReview.id}
                  disabled={true}
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder={currentReview.name}
                  disabled={true}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder={currentReview.email}
                  disabled={true}
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={currentReview.title || ""}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={currentReview.description || ""}
                  onChange={handleChangeInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Rated Star</label>
                <input
                  type="text"
                  className="form-control"
                  id="ratedValue"
                  name="ratedValue"
                  placeholder={currentReview.ratedValue}
                  disabled={true}
                />
              </div>
            </form>

            <button
              className="badge text-bg-danger"
              onClick={() => {
                handleClickRemoveReview();
                notify();
                setTimeout(() => {
                  navigate("/");
                }, 4000);
              }}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge text-bg-success"
              onClick={() => {
                handleClickUpdate();
                notify();
                setTimeout(() => {
                  navigate("/");
                }, 4000);
              }}
            >
              Update
            </button>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Review;
