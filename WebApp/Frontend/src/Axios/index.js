import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3500/api",
  // baseURL: "https://smart-devices-system-backend.caprover.meetin.co.in/api",

  //   baseURL: process.env.REACT_APP_API,
});
