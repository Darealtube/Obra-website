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
