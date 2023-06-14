import axios from "axios";

export default axios.create({
  baseURL: "http://20.255.59.150:9096",
  headers: {
    "Content-type": "application/json",
  },
});