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
      return response.data;
    })
    .catch((error) => {
      toast.error("Something went wrong");
      throw error;
    });
};

export const createUser = async (email, token) => {
  try {
    await api.post(
      "/user/register",
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Try again please");
    throw error;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `user/removeBooking/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Try again please");
    throw error;
  }
};
export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `user/toFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Try again please");
    throw error;
  }
};
export const getAllFav = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `user/allFav/`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data["favResidenciesID"];
  } catch (error) {
    toast.error("Something went wrong while fetching your fav list");
    throw error;
  }
};
export const getAllBookings = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `user/allBookings/`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data["bookedVisits"];
  } catch (error) {
    toast.error("Something went wrong while fetching your booking list");
    throw error;
  }
};

export const validateString = (value) => {
  return value?.length < 3 || value === null
    ? "Must have atleast 3 characters"
    : null;
};
