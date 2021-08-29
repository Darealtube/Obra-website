import moment from "moment";

type Options = "CHANGE" | "DATE_CHANGE" | "RESET" | "ERROR";

export type State = {
  name: string;
  phone: string;
  age: string;
  country: string;
  birthday: string;
  artLevel: string;
  userBio: string;
  image: string;
  placeholder: string;
  backdrop: string;
  backdropholder: string;
  error: boolean;
  errMessage: string;
};

export type Action = {
  type: Options;
  payload?: string | Date | ArrayBuffer | string[] | any;
  field?: string;
  initialState?: State;
  message?: string;
};

// This is the reducer used in the useReducer function inside the settings page.
// We should only use reducers on complex state in which when one field changes,
// another does too, or on big states in general.

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.field]: action.payload };
    case "DATE_CHANGE":
      return {
        ...state,
        birthday: moment(action.payload).format("l"),
        age: `${moment().diff(action.payload, "years")}`,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        ...(action.message && { errMessage: action.message }),
      };
    case "RESET":
      return action.initialState;
    default:
      return state;
  }
};
