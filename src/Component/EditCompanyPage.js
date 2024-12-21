import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCompanyPage = () => {
  const [company, setCompany] = useState({
    name: "",
    mobNumber: "",
    email: "",
    password: "",
    address: "",
    companyType: "",
    profileImageBase64: "",
    profileImageName: "",
  });

  const [file, setFile] = useState(null); // For storing the uploaded file
  const { id } = useParams(); // Fetch the company id from the URL
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    // Fetch the company details based on the id
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/ip/company/${id}`);
        setCompany(response.data);
      } catch (error) {
        console.error("There was an error fetching the company details!", error);
      }
    };

    fetchCompany();
  }, [id]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setCompany({
        ...company,
        profileImageBase64: reader.result.split(",")[1], // Remove the "data:image/*;base64," prefix
        profileImageName: file.name,
      });
    };

    reader.readAsDataURL(file);
  };

  // Handle form submission to update company
  const handleUpdate = async (e) => {
    e.preventDefault();

    const dataToSend = {
      name: company.name,
      mobNumber: company.mobNumber,
      email: company.email,
      password: company.password,
      address: company.address,
      companyType: company.companyType,
      profileImageBase64: company.profileImageBase64,
      profileImageName: company.profileImageName,
    };

    try {
      const response = await axios.put(
        `http://localhost:8082/ip/company/${id}`,
        dataToSend, // Send the data as JSON
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Company updated successfully!");
      navigate("/company-list"); // Redirect to the company list page after successful update
    } catch (error) {
      console.error("There was an error updating the company!", error);
      alert("Failed to update the company.");
    }
  };

  return (
    <div>
      <h2>Edit Company</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={company.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobNumber"
            value={company.mobNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={company.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={company.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={company.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Company Type:</label>
          <input
            type="text"
            name="companyType"
            value={company.companyType}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Profile Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
          />
          {company.profileImageBase64 && !file && (
            <img
              src={`data:image/jpeg;base64,${company.profileImageBase64}`}
              alt="Profile"
              width="100"
              style={{ marginTop: "10px" }}
            />
          )}
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditCompanyPage;
