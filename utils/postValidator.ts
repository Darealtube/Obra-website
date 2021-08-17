import { State } from "../Hooks/Reducers/PostReducer";

export const PostValidate = (state: State) => {
  const actualPrice = +state.price.replaceAll(",", "");
  if (state.title.length > 40) {
    return {
      error: true,
      errMessage: "Title is too long!",
    };
  } else if (state.description.length > 400) {
    return {
      error: true,
      errMessage: "Description is too long! Explain it more briefly.",
    };
  } else if (state.tags.length > 4 || state.tags.length == 0) {
    return {
      error: true,
      errMessage: "Please provide no more than 4 tags.",
    };
  } else if (actualPrice > 9999) {
    // FOR NOW
    return {
      error: true,
      errMessage: "The price is too high!",
    };
  } else {
    return {
      error: null,
      errMessage: null,
    };
  }
};

export const EditValidate = (state: State) => {
  if (state.title.length > 40) {
    return {
      error: true,
      errMessage: "Title is too long!",
    };
  } else if (state.description.length > 400) {
    return {
      error: true,
      errMessage: "Description is too long! Explain it more briefly.",
    };
  } else if (state.tags.length > 4 || state.tags.length == 0) {
    return {
      error: true,
      errMessage: "Please provide no more than 4 tags.",
    };
  } else {
    return {
      error: null,
      errMessage: null,
    };
  }
};
