type Options = "CHANGE" | "TAGS" | "SALE" | "CHANGE_ART";

export type State = {
  title: string;
  description: string;
  art: string;
  price: string;
  sale: string;
  tags: string[];
  width: number;
  height: number;
};

type Values = {
  url: string;
  width: number;
  height: number;
};

export type Action = {
  type: Options;
  payload?: string | string[];
  artPayload?: Values;
  field?: string;
  initialState?: State;
};

// This is the reducer used in the useReducer function inside the create page.
// We should only use reducers on complex state in which when one field changes,
// another does too, or on big states in general.

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.field]: action.payload };
    case "CHANGE_ART":
      return {
        ...state,
        art: action.artPayload.url,
        width: action.artPayload.width,
        height: action.artPayload.height,
      };
    case "TAGS":
      const tags = (action.payload as string)
        .split(",")
        .map((tag) => tag.replace(/\s+/, ""))
        .filter((tag) => tag !== "");
      return { ...state, tags };
    case "SALE":
      return {
        ...state,
        sale: action.payload as string,
        ...(action.payload === "No" && { price: "" }),
      };
    default:
      return state;
  }
};
