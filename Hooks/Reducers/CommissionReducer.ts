type ActionTypes =
  | "CHANGE"
  | "CHANGE_ART"
  | "TOGGLE_DEADLINE"
  | "TOGGLE_DISABLE";

export type State = {
  title: string;
  description: string;
  sampleArt: string;
  height: number;
  width: number;
  deadline: number;
  price: string[];
  rates: string[];
  submitDisabled: boolean;
  deadlineDisabled: boolean;
};

type Values = {
  url: string;
  width: number;
  height: number;
  watermarkUrl: string;
};

export type Action = {
  type: ActionTypes;
  payload?: string | string[] | number | boolean;
  artPayload?: Values;
  field?: string;
  disableField?: "submitDisabled" | "deadlineDisabled";
};

export const commReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.field]: action.payload };
    case "CHANGE_ART":
      return {
        ...state,
        art: action.artPayload.url,
        watermarkArt: action.artPayload.watermarkUrl,
        width: action.artPayload.width,
        height: action.artPayload.height,
        submitDisabled: false,
      };
    case "TOGGLE_DEADLINE":
      return {
        ...state,
        deadline: !state.deadline ? 3 : null,
        deadlineDisabled: !state.deadlineDisabled,
      };
    case "TOGGLE_DISABLE":
      return {
        ...state,
        [action.disableField]: action.payload,
      };
    default:
      return state;
  }
};
