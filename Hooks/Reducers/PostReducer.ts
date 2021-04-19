type Options = "CHANGE" | "TAGS" | "SALE";

export type State = {
  title: string;
  description: string;
  art: string;
  price: string;
  sale: string;
  tags: string[];
};

export type Action = {
  type: Options;
  payload?: string | string[];
  field?: string;
  initialState?: State;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.field]: action.payload };
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
