import { Button, Group } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

const UploadImage = ({
  propertyDetails,
  nextStep,
  prevStep,
  setPropertyDetails,
}) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };

  useEffect(() => {
    if (window.cloudinary) {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dk6rzbetn",
          uploadPreset: "zenHomes",
          maxFiles: 1,
        },
        (err, result) => {
          if (result.event === "success") {
            setImageURL(result.info.secure_url);
          }
        }
      );
    } else {
      console.error("Window object not available");
    }
  }, []);
  return (
    <div className="mt-12 flexCenter flex-col">
      {!imageURL ? (
        <div
          onClick={() => widgetRef.current?.open()}
          className="flexCenter flex-col w-3/4 h-[21rem] border-dashed border-2 cursor-pointer"
        >
          <MdOutlineCloudUpload size={44} color="grey" />
          <span>Uplaod Image</span>
        </div>
      ) : (
        <div
          onClick={() => widgetRef.current?.open()}
          className="w-3/4 h-[22rem] rounded-xl overflow-hidden cursor-pointer"
        >
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
