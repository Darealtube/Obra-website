import moment from "moment";

type Options =
  | "CHANGE"
  | "DATE_CHANGE"
  | "NEXT_PAGE"
  | "PREVIOUS_PAGE"
  | "ERROR"
  | "COUNTRY_CHANGE";

export type State = {
  name: string;
  age: string;
  language: string;
  country: string;
  birthday: Date;
  artLevel: string;
  artStyles: string[];
  artKinds: string[];
  phone: string;
  page: number;
  error: boolean;
  errMessage: string;
};

export type Action = {
  type: Options;
  payload?: any;
  payload2?: any;
  message?: string;
  field?: string;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.field]: action.payload };
    case "DATE_CHANGE":
      return {
        ...state,
        birthday: action.payload,
        age: `${moment().diff(action.payload, "years")}`,
      };
    case "NEXT_PAGE":
      return { ...state, page: state.page + 1 };
    case "PREVIOUS_PAGE":
      return { ...state, page: state.page - 1 };
    case "COUNTRY_CHANGE":
      return { ...state, country: action.payload, language: action.payload2 };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        ...(action.message && { errMessage: action.message }),
      };
    default:
      return state;
  }
};
