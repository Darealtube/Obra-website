import { initializeApollo } from "../apollo/apolloClient";
import { USER_EXISTS } from "../apollo/apolloQueries";
import { isValidPhoneNumber } from "libphonenumber-js";
import countryList from "react-select-country-list";
import { State } from "../Hooks/Reducers/UserReducer";

// This is the Validator functions that we use throughout forms in our website.
// They usually take two or more parameters including the state, and if there are
// problems in validation, this is the right place to check.

export const userValidator = async (state: State, userId: string) => {
  const apolloClient = initializeApollo();
  const {
    data: { userExists },
  } = await apolloClient.query({
    query: USER_EXISTS,
    variables: {
      userName: state.name,
      userId,
    },
  });

  if (userExists === true) {
    return {
      error: true,
      errMessage: "Username already exists",
    };
  } else if (
    +state.age <= 0 ||
    +state.age > 100 ||
    !Number.isInteger(+state.age)
  ) {
    return {
      error: true,
      errMessage: "Age is invalid",
    };
  } else if (
    isValidPhoneNumber(state.phone, countryList().getValue(state.country)) ===
    false
  ) {
    return {
      error: true,
      errMessage: "Phone is invalid",
    };
  } else {
    return {
      error: null,
      errMessage: null,
    };
  }
};
