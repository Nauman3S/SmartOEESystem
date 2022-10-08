import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3500/api",
  baseURL: "https://smartoeesystem.production.rehanshakir.com/api",

  //   baseURL: process.env.REACT_APP_API,
});
