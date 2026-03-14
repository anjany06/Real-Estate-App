import React, { useState } from "react";

const Test = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    facilities: {
      wifi: false,
      parking: false,
      gym: false,
      pool: false,
    },
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (type === "checkbox") {
        return {
          ...prev,
          facilities: {
            ...prev.facilities,
            [name]: checked,
          },
        };
      } else if (name === "images") {
        return { ...prev, images: Array.from(e.target.files) };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    else if (isNaN(formData.price) || parseFloat(formData.price) <= 0)
      newErrors.price = "Price must be a positive number";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.propertyType)
      newErrors.propertyType = "Property type is required";
    if (!formData.bedrooms.trim())
      newErrors.bedrooms = "Number of bedrooms is required";
    else if (
      isNaN(formData.bedrooms) ||
      parseInt(formData.bedrooms) < 1
    )
      newErrors.bedrooms = "Bedrooms must be at least 1";
    if (!formData.bathrooms.trim())
      newErrors.bathrooms = "Number of bathrooms is required";
    else if (
      isNaN(formData.bathrooms) ||
      parseInt(formData.bathrooms) < 1
    )
      newErrors.bathrooms = "Bathrooms must be at least 1";
    if (!formData.area.trim()) newErrors.area = "Area is required";
    else if (isNaN(formData.area) || parseFloat(formData.area) <= 0)
      newErrors.area = "Area must be a positive number";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus("error");
    } else {
      // Simulate successful submission
      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      setErrors({});
      // Optionally reset form after success
      // setFormData(initialFormData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Test Property Listing Form
      </h1>

      {submitStatus === "success" && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
          Property listed successfully!
        </div>
      )}
      {submitStatus === "error" && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
          Please fix the errors below.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-500" : ""
            }`}
            placeholder="Enter property title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? "border-red-500" : ""
            }`}
            rows={4}
            placeholder="Enter property description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Price (per month)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.price ? "border-red-500" : ""
            }`}
            placeholder="Enter price"
            min="0"
            step="0.01"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.location ? "border-red-500" : ""
            }`}
            placeholder="Enter location"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Property Type
          </label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.propertyType ? "border-red-500" : ""
            }`}
          >
            <option value="">Select property type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
          </select>
          {errors.propertyType && (
            <p className="mt-1 text-sm text-red-600">
              {errors.propertyType}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.bedrooms ? "border-red-500" : ""
              }`}
              placeholder="Enter number of bedrooms"
              min="1"
            />
            {errors.bedrooms && (
              <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.bathrooms ? "border-red-500" : ""
              }`}
              placeholder="Enter number of bathrooms"
              min="1"
            />
            {errors.bathrooms && (
              <p className="mt-1 text-sm text-red-600">{errors.bathrooms}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Area (sqft)
          </label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.area ? "border-red-500" : ""
            }`}
            placeholder="Enter area in sqft"
            min="1"
            step="0.01"
          />
          {errors.area && (
            <p className="mt-1 text-sm text-red-600">{errors.area}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Facilities
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="wifi"
                checked={formData.facilities.wifi}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              WiFi
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="parking"
                checked={formData.facilities.parking}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              Parking
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="gym"
                checked={formData.facilities.gym}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              Gym
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="pool"
                checked={formData.facilities.pool}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              Pool
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Images (upload multiple)
          </label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {formData.images.length > 0 && (
            <p className="mt-1 text-sm text-gray-600">
              {formData.images.length} file(s) selected
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Submit Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default Test;
