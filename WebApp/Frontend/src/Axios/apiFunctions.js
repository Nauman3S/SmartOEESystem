import server from "./index";

import { getToken } from "../Redux/localStorage";

export const getAllUsersData = () =>
  server.get("/admin/all-users", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getOneUser = async (id) =>
  await server.get(`/admin/user/${id.id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getCounts = () =>
  server.get("/admin/count", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const userCounts = async (userId) =>
  await server.get(`/admin/user-count/${userId}`);

export const getProgramsOfLoggedInUser = () =>
  server.get("/program/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const allPrograms = () =>
  server.get("program/all", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const addProgram = (values) =>
  server.post("/program/post", values, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const deleteProgram = (id) =>
  server.patch(
    `/program/delete`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const editProgram = (data, id) =>
  server.patch(
    `/program/edit`,
    { id: id, programName: data.programName, command: data.command },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
export const adminUserSignUp = (values) =>
  server.post("/admin/signUp", values, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getAdminUsers = () =>
  server.get("/admin/users", {
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

export const deleteAdminUsers = (userId) =>
  server.patch(
    "/admin/user/delete",
    { userId },
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

export const publishToMqtt = (macAddress, message, endPoint) =>
  server.post(
    `/mqtt/publish/${macAddress}`,
    { message, endPoint },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const getButtons = async ({ macAddress }) => {
  const res = await server.post(
    "/button/all",
    { macAddress },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res;
};

export const updateBtnState = (macAddress, objId, state) =>
  server.patch(
    "/button/update",
    { macAddress, objId, state },
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

export const getDeviceLocations = (query) =>
  server.post("/mqtt/location", query);

export const getDataByMacAddress = (query) => server.post("/mqtt/data", query);

export const getDeviceLocationsByMacAddress = (macAddress) =>
  server.post("/mqtt/location-all", { macAddress });

export const getSensorNames = () =>
  server.get("/program/sensor", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const updateSensorName = (sensor) =>
  server.post("/admin/sensor", sensor, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
