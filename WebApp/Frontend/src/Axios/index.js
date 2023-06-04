import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3500/api",
  baseURL: "https://smartoee-system.production.factorytracer.com/api",

  //   baseURL: process.env.REACT_APP_API,
});
