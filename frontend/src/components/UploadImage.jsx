import { Button, Group } from "@mantine/core";
import React, { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

const UploadImage = ({
  propertyDetails,
  nextStep,
  prevStep,
  setPropertyDetails,
}) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image);

  const handleNext = () => {};
  return (
    <div className="mt-12 flexCenter flex-col">
      {!imageURL ? (
        <div className="flexCenter flex-col w-3/4 h-[21rem] border-dashed border-2 cursor-pointer">
          <MdOutlineCloudUpload size={44} color="grey" />
          <span>Uplaod Image</span>
        </div>
      ) : (
        <div className="w-3/4 h-[22rem] rounded-xl overflow-hidden cursor-pointer">
          <img
            src={imageURL}
            alt="UploadedImg"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <Group justify="center" mt={"xl"}>
        <Button onClick={prevStep}>Go Back</Button>
        <Button onClick={handleNext} disabled={!imageURL}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
