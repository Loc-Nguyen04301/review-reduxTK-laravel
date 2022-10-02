

export const emailValidator = (email) => {
    if (!email) {
      return 'EMAIL is required';
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
      return 'Incorrect EMAIL format';
    }
    return '';
  };
  
  
  
  export const descriptionValidator = (description) => {
    if (!description) {
      return 'DESCRIPTION is required';
    } else if (description.length < 8) {
      return 'DESCRIPTION must have a minimum 8 characters';
    }
    return '';
  };
  
  
  