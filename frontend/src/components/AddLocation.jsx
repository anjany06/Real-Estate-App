import React from "react";
import {} from "@mantine/form";
import { validateString } from "../utils/api";
import { Select } from "@mantine/core";
import useCountries from "../hooks/useCountries";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
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

  return (
    <form>
      <div>
        {/* LEFT SIDE */}
        <div>
          {/* INPUTS */}
          <div>
            <Select
              w={"100%"}
              withAsterisk
              Label="Country"
              searchable
              data={getAll()}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddLocation;
