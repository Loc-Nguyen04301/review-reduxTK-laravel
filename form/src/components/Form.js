import React, { useCallback, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Form.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStars } from "stars-rating-react-hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeDescription,
  ChangeEmail,
  ChangeName,
  ChangeRatedValue,
  ChangeTitle,
  ChangeBase64Image,
  createReview,
  RemoveBase64Image,
} from "../slices/review";
import { useLoginFormValidator } from "../validation/useLoginFormValidator";

const Form = () => {
  const review = useSelector((state) => state.review);
  const [form, setForm] = useState({
    email: "",
    description: "",
  });
  const { errors, validateForm } = useLoginFormValidator(form);

  const dispatch = useDispatch();

  const notify = () =>
    toast.success("Create Successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  // Star Rating
  const config = {
    totalStars: 5,
    initialSelectedValue: 0,
    renderFull: "★",
    renderEmpty: "☆",
  };
  const { stars, getStarProps, getStarWrapperProps, selectingValue } =
    useStars(config);
    
  const handleChangeName = useCallback(
    (e) => {
      dispatch(ChangeName(e.target.value));
    },
    [dispatch]
  );

  const handleChangeDescription = useCallback(
    (e) => {
      dispatch(ChangeDescription(e.target.value));
      const field = e.target.name;
      const nextFormState = {
        ...form,
        [field]: e.target.value,
      };
      setForm(nextFormState);
      if (errors[field].dirty)
        validateForm({
          form: nextFormState,
          errors,
          field,
        });
    },
    [dispatch, errors, form, validateForm]
  );

  const handleChangeEmail = useCallback(
    (e) => {
      dispatch(ChangeEmail(e.target.value));
      const field = e.target.name;
      const nextFormState = {
        ...form,
        [field]: e.target.value,
      };
      setForm(nextFormState);
      if (errors[field].dirty)
        validateForm({
          form: nextFormState,
          errors,
          field,
        });
    },
    [dispatch, errors, form, validateForm]
  );

  const handleChangeTitle = useCallback(
    (e) => {
      dispatch(ChangeTitle(e.target.value));
    },
    [dispatch]
  );

  const handleChangeImage = useCallback(
    async (e) => {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      dispatch(ChangeBase64Image(base64));
    },
    [dispatch]
  );

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { isValid } = validateForm({
        form,
        errors,
        forceTouchErrors: true,
      });
      if (!isValid) return;
      // const
      const base64Image = review.base64Image.join("  ");
      const { name, email, title, description, ratedValue } = review;
      const data = {
        name,
        email,
        title,
        description,
        ratedValue,
        base64Image,
      };

      // yeu cau rate star
      if(ratedValue==null){
        alert('You must rate Value',ratedValue);
      }
      else{
        dispatch(createReview(data))
        .unwrap()
        .then(() => {
          notify();
        });
      }
     
    },
    [dispatch, errors, form, validateForm, review]
  );

  const removeImageHandleClick = useCallback(
    (index) => {
      dispatch(RemoveBase64Image(index));
    },
    [dispatch]
  );

  return (
    <div className="form-body">
      <div className="row">
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Review Form</h3>
              <p>Fill in the data below.</p>
              <form
                className="requires-validation"
                onSubmit={handleSubmit}
                method="POST"
                encType="multipart/form-data"
              >
                <div className="col-12">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChangeName}
                  />
                </div>

                <div className="col-12">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="E-mail Address"
                    onChange={handleChangeEmail}
                  />
                  {errors.email.dirty && errors.email.error ? (
                    <p>{errors.email.message}</p>
                  ) : null}
                </div>

                <div className="col-12">
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleChangeTitle}
                  />
                </div>

                <div className="col-12">
                  <input
                    className="form-control"
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={handleChangeDescription}
                  />
                  {errors.description.dirty && errors.description.error ? (
                    <p>{errors.description.message}</p>
                  ) : null}
                </div>

                <div className="col-12">
                  <h4>
                    Star Rating:
                    {selectingValue}
                  </h4>
                  <span
                    {...getStarWrapperProps({
                      style: {
                        cursor: "pointer",
                      },
                    })}
                  >
                    {stars?.map((star, index) => (
                      <span
                        key={index}
                        name="ratedValue"
                        {...getStarProps(index, {
                          style: {
                            fontSize: "40px",
                            color: "gold",
                          },
                          onClick: (event, ratedValue) => {
                            alert(`You just rated ${ratedValue} Stars!!`);
                            dispatch(ChangeRatedValue(ratedValue));
                          },
                        })}
                      >
                        {star}
                      </span>
                    ))}
                  </span>
                </div>

                <div className="col-12">
                  <input
                    className="form-control"
                    type="file"
                    name="base64Image"
                    onChange={handleChangeImage}
                  />
                </div>
                <div className="col-12 d-flex flex-row flex-wrap justify-content-around">
                  {review.base64Image.map((item, index) => {
                    return (
                      <React.Fragment>
                        <li key={index} className="card m-3 image">
                          <button
                            key={index}
                            className="btn btn-close btn-image"
                            aria-label="Close"
                            onClick={() => {
                              removeImageHandleClick(index);
                            }}
                          ></button>
                          <img src={item} alt=""></img>
                        </li>
                      </React.Fragment>
                    );
                  })}
                </div>

                <div
                  className="form-button mt-3 form-group"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>

                  <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
