import server from "./index";

import { getToken } from "../Redux/localStorage";

export const getCounts = () =>
  server.get("/admin/count", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getAllUsers = () =>
  server.get("/admin//all-users", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const deleteUser = (id) =>
  server.patch(
    "/admin/delete-user",
    { id: id },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const addMacAddress = (macAddress) =>
  server.patch(
    "/macAddress/add",
    { macAddress },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const getAllMacAddress = () =>
  server.get("/macAddress/all", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const publishToMqtt = (macAddress, message) =>
  server.post(
    `/mqtt/publish/${macAddress}`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const removeMacAddress = (macAddress, userId) =>
  server.patch(
    "/macAddress/remove",
    { macAddress, userId },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const clientDashboardCount = () =>
  server.get("/count/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const forgotPassword = (email) => server.post("/auth/forgot", { email });

export const verifyOTP = (email, code) =>
  server.post("/auth/verify", { email, code });

export const resetPassword = (email, password) =>
  server.post("/auth/reset", { email, password });

export const getAdminUserAllMacAddress = () =>
  server.get("/admin/all-macAddress", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getDataByMacAddress = (query) => server.post("/mqtt/data", query);

export const getSensorNames = () =>
  server.get("/sensor", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const updateSensorName = (sensor) =>
  server.patch("/sensor", sensor, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const removeSensorName = (sensor) =>
  server.patch("/sensor/remove", sensor, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const addSensorValue = (sensor) =>
  server.patch("/sensor/add", sensor, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getEnerygyCost = () =>
  server.get("/energy", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const addEnergyCost = (energyCost) =>
  server.patch("/energy", energyCost, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getSensorValues = (macAddress) =>
  server.get(`/sensor/get/${macAddress}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
