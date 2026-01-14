import axios from "axios";

const client = axios.create({
  baseURL: `${import.meta.env.SERVER_URL}/api`,
});

export { client };
