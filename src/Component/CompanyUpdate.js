import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyUpdate = ({ companyId = "IP01", onUpdate }) => {  // Default to IP01 if companyId is not passed
  const [formData, setFormData] = useState({
    name: "",
    mobNumber: "",
    email: "",
    address: "",
    password: "",
    companyType: "",
    profileImageBase64: "",  // To store base64 image data
    profileImageName: "",
  });

  // Fetch existing company data when the component mounts
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/ip/company/${companyId}`);
        const companyData = response.data;

        setFormData({
          name: companyData.name,
          mobNumber: companyData.mobNumber,
          email: companyData.email,
          address: companyData.address,
          password: companyData.password,
          companyType: companyData.companyType,
          profileImageBase64: companyData.profileImagePath,  // Assuming this is the image path or Base64 string
          profileImageName: "",
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change (for image upload)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setFormData({
        ...formData,
        profileImageBase64: reader.result.split(",")[1], // Remove the "data:image/*;base64," prefix
        profileImageName: file.name,
      });
    };

    reader.readAsDataURL(file);
  };

  // Handle form submission (sending the updated data)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the request body (both company data and image)
    const requestBody = {
      name: formData.name,
      mobNumber: formData.mobNumber,
      email: formData.email,
      address: formData.address,
      password: formData.password,
      companyType: formData.companyType,
      profileImage: formData.profileImageBase64, // Send the Base64 image string
    };

    try {
      const response = await axios.put(
        `http://localhost:8082/ip/company/${companyId}`,
        requestBody, // Send the request as JSON with company data + Base64 image
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      alert("Company updated successfully!");
      onUpdate(); // Notify parent component that the update is done
    } catch (error) {
      console.error("Error updating company:", error);
      alert("Error updating company.");
    }
  };

  return (
    <div>
      <h2>Update Company</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          type="text"
          name="mobNumber"
          placeholder="Mobile Number"
          onChange={handleChange}
          value={formData.mobNumber}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          value={formData.address}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <input
          type="text"
          name="companyType"
          placeholder="Company Type"
          onChange={handleChange}
          value={formData.companyType}
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default CompanyUpdate;
