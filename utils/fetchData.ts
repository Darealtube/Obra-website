const axios = require("axios").default;
import { UserData } from "../interfaces/UserInterface";

const fetchData = async (id: string) =>
  await axios
    .get(`http://localhost:3000/api/Users/${id}`) //Get current user info
    .then((res: { data: any }) => res.data)
    .catch(() => null);

export default fetchData;
