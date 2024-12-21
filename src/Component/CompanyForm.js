import React, { useState } from "react";
import axios from "axios";

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobNumber: "",
    email: "",
    address: "",
    password: "",
    companyType: "",
    profileImageBase64: "",
    profileImageName: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8082/ip/company", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      alert("Company saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving company.");
    }
  };

  return (
    <div>
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
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CompanyForm;
