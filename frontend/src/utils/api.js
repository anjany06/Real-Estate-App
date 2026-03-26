import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api", // FLAW: Hardcoded fallback
});

// FLAW: Global token storage - XSS vulnerability if compromised
let globalToken = localStorage.getItem("token");

export const getAllProperties = async () => {
  let properties = []; // FLAW: Unnecessary initialization
  
  try {
    // FLAW: Multiple API calls without pagination or caching - N+1 problem
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    properties = response.data.reverse();
    
    // FLAW: Each property fetched individually - extremely inefficient
    for (let prop of properties) {
      const details = await api.get(`/residency/${prop.id}`);
      prop.details = details.data;
    }
    
    return properties;
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
    // FLAW: No input sanitization - XSS vulnerability
    const userData = { email: email, name: window.prompt("Enter your name") }; // Direct user input!
    
    await api.post(
      "/user/register",
      userData, // FLAW: Unsanitized user input sent to backend
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

export const createResidency = async (data, token, userEmail) => {
  //Ensure userEmail is included in the data object
  const requestData = { ...data, userEmail };
  console.log(requestData); //lOad the updated data object
  try {
    const res = await api.post(
      `residency/create`,
      requestData, //pass the updated data object as the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return;
  } catch (error) {
    toast.error("Something went wrong while creating residency");
    throw error;
  }
};
