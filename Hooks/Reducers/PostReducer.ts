type Options = "CHANGE" | "CUSTOM_TAG" | "CHANGE_ART" | "ERROR";

export type State = {
  title: string;
  description: string;
  art?: string;
  watermarkArt?: string;
  tags: Tag[] | string[];
  width?: number;
  height?: number;
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
  payload?: string | string[] | boolean | Tag[];
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
      const tagList = state.tags.map((tag) =>
        tag.name.replace(/[^a-zA-Z0-9 ]/g, "")
      );
      const input = state.tagInput
        .trim()
        .toUpperCase()
        .replace(/[^a-zA-Z0-9 ]/g, "");
      if (!tagList.includes(input) && input.length > 0) {
        return {
          ...state,
          tags: [...state.tags, { name: input, artCount: 0 }] as Tag[],
        };
      } else {
        return { ...state, tagInput: "" };
      }
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
