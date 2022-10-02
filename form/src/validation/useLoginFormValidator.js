import { useState } from 'react';
import { emailValidator, descriptionValidator } from './validator';



const touchErrors = (errors) => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useLoginFormValidator = (form) => {
  const [errors, setErrors] = useState({
    email: {
      dirty: false,
      error: false,
      message: '',
    },
    description: {
      dirty: false,
      error: false,
      message: '',
    },
  });

  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { email, description } = form;

    if (nextErrors.email.dirty && (field ? field === 'email' : true)) {
      const emailMessage = emailValidator(email, form);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      if (emailMessage) isValid = false;
    }

    if (
      nextErrors.description.dirty &&
      (field ? field === 'description' : true)
    ) {
      const descriptionMessage = descriptionValidator(description, form);
      nextErrors.description.error = !!descriptionMessage;
      nextErrors.description.message = descriptionMessage;
      if (descriptionMessage) isValid = false;
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = (e) => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};
