import React from "react";
import {} from "@mantine/form";
import { validateString } from "../utils/api";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },
    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const { country, city, address } = form.values;

  return <div>AddLocation</div>;
};

export default AddLocation;
