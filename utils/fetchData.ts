import dbConnect from "./dbConnect";
import User from "../model/User";

const fetchData = async (id: string) => {
  await dbConnect();
  try {
    const data = await User.findOne({ sub: id });
    if (!data) {
      return null;
    }

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    throw error;
  }
};

export default fetchData;
