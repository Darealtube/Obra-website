type Options = "CHANGE" | "CUSTOM_TAG" | "SALE" | "CHANGE_ART" | "ERROR";

export type State = {
  title: string;
  description: string;
  art: string;
  watermarkArt: string;
  price: string;
  sale: string;
  tags: Tag[] | string[];
  width: number;
  height: number;
  error?: boolean;
  errMessage?: string;
  tagInput?: string;
};

type Values = {
  url: string;
  width: number;
  height: number;
  watermarkUrl: string;
};

export type Tag = {
  name: string;
  artCount: number;
};

export type Action = {
  type: Options;
  payload?: string | string[] | boolean;
  artPayload?: Values;
  field?: string;
  initialState?: State;
  message?: string;
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
        watermarkArt: action.artPayload.watermarkUrl,
        width: action.artPayload.width,
        height: action.artPayload.height,
      };
    case "CUSTOM_TAG":
      let tagList = state.tags.map((tag) => tag.name);
      if (
        !tagList.includes(state.tagInput.trim().toUpperCase()) &&
        state.tagInput.trim().length > 0
      ) {
        return {
          ...state,
          tags: [
            ...state.tags,
            { name: state.tagInput.trim().toUpperCase(), artCount: 0 },
          ] as Tag[],
        };
      } else {
        return { ...state, tagInput: "" };
      }
    case "SALE":
      return {
        ...state,
        sale: action.payload as string,
        ...(action.payload === "No" && { price: "" }),
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload as boolean,
        ...(action.message && { errMessage: action.message }),
      };
    default:
      return state;
  }
};
