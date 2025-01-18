import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data.reverse();
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getProperty = (id) => {
  return api
    .get(`/residency/${id}`, {
      timeout: 10 * 1000,
    })
    .then((response) => {
      if (response.status === 400 || response.status === 500) {
        throw response.data;
      }
      // console.log(response.data); // Now you should see the correct data
      return response.data;
    })
    .catch((error) => {
      toast.error("Something went wrong");
      throw error;
    });
};
