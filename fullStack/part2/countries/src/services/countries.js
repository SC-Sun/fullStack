import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries//api/all";
console.log(baseUrl);
const getAll = async () => {
  const request = axios.get(`${baseUrl}`);
  const response = await request;
  return response.data;
};

export default getAll;
