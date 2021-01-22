const axios = require("axios").default;

const fetchData = async () =>
  await axios
    .get(`http://localhost:3000/api/Users/`) //Get current user info
    .then((res: { data: any }) => res.data)
    .catch(() => null);

export default fetchData;
