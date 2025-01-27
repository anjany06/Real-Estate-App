import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../utils/api";
import { Button, Group, Select, TextInput } from "@mantine/core";
import useCountries from "../hooks/useCountries";
import Map from "./Map";

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

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, country, city, address }));
      nextStep();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flexCenter flex-col sm:flex-row">
        {/* LEFT SIDE */}
        <div className="flexCenter flex-1">
          {/* INPUTS */}
          <div>
            <Select
              w={"100%"}
              withAsterisk
              label="Country"
              searchable
              data={getAll()}
              {...form.getInputProps("country", { type: "input" })}
            />
            <TextInput
              w={"100%"}
              withAsterisk
              label="City"
              {...form.getInputProps("city", { type: "input" })}
            />
            <TextInput
              w={"100%"}
              withAsterisk
              label="Address"
              {...form.getInputProps("address", { type: "input" })}
            />
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex sm:flex-1 w-full">
          <Map address={address} city={city} country={country} />
        </div>
      </div>
      <Group justify="center" mt={"xl"} pb={"lg"}>
        <Button type="submit">Next Step</Button>
      </Group>
    </form>
  );
};

export default AddLocation;
