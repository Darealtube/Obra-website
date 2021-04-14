import moment, { MomentInput } from "moment";

export type State = {
  name: string;
  country: string;
  birthday: string;
  artLevel: string;
  artStyles: string[];
  artKinds: string[];
  userBio: string;
  image: string;
  placeholder: string;
  backdrop: string;
  backdropholder: string;
};

export type Action = {
  type: string;
  payload?: string | Date | ArrayBuffer | string[] | any;
  field?: string;
  initialState?: State;
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.field]: action.payload };
    case "DATE_CHANGE":
      return { ...state, birthday: moment(action.payload).format("l") };
    case "RESET":
      return action.initialState;
    default:
      return state;
  }
};
