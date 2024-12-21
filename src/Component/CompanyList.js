import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CompanyList = () => {
  const [companies, setCompanies] = useState([]); // List of companies
  const [loading, setLoading] = useState(false); // Loading state
  const [editingCompanyId, setEditingCompanyId] = useState(null); // Track the company being edited
  const [editedCompany, setEditedCompany] = useState({
    name: "",
    mobNumber: "",
    email: "",
    password: "",
    address: "",
    companyType: "",
    profileImagePath: "", // Will be used to show the selected image (in case of update)
  });
  const [profileImageFile, setProfileImageFile] = useState(null); // For storing the selected file

  const navigate = useNavigate(); // Use useNavigate hook

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true); // Set loading to true while fetching data
    try {
      const response = await axios.get("http://localhost:8082/ip/company");
      setCompanies(response.data);
    } catch (error) {
      console.error("There was an error fetching the companies!", error);
    } finally {
      setLoading(false); // Set loading to false once fetching is complete
    }
  };

  // Function to handle edit button click
  const handleEditClick = (company) => {
    setEditingCompanyId(company.id); // Set the company ID that is being edited
    setEditedCompany({ ...company }); // Set the form fields with current company data
  };

  // Function to handle update company details
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", editedCompany.name);
    formData.append("mobNumber", editedCompany.mobNumber);
    formData.append("email", editedCompany.email);
    formData.append("password", editedCompany.password);
    formData.append("address", editedCompany.address);
    formData.append("companyType", editedCompany.companyType);
    
    // If there's a new image, append it to FormData
    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    try {
      const response = await axios.put(
        `http://localhost:8082/ip/company/${editingCompanyId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Update the company list with the updated data
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company.id === editingCompanyId ? response.data : company
        )
      );

      // Reset editing state
      setEditingCompanyId(null);
      setProfileImageFile(null); // Reset file input
      alert("Company updated successfully!");
    } catch (error) {
      console.error("There was an error updating the company!", error);
      alert("Failed to update the company.");
    }
  };

  // Function to handle company deletion
  const handleDelete = async (companyId) => {
    try {
      const response = await axios.delete(`http://localhost:8082/ip/company/${companyId}`);
      
      // Update the company list by removing the deleted company
      setCompanies((prevCompanies) => prevCompanies.filter((company) => company.id !== companyId));
      
      alert("Company deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the company!", error);
      alert("Failed to delete the company.");
    }
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
  };

  if (loading) {
    return <div>Loading companies...</div>;
  }

  return (
    <div>
      <h2>Company List</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mobile Number</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Password</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Address</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Company Type</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Profile Status</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Profile Image</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingCompanyId === company.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedCompany.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  company.name
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingCompanyId === company.id ? (
                  <input
                    type="text"
                    name="mobNumber"
                    value={editedCompany.mobNumber}
                    onChange={handleInputChange}
                  />
                ) : (
                  company.mobNumber
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingCompanyId === company.id ? (
                  <input
                    type="email"
                    name="email"
                    value={editedCompany.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  company.email
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingCompanyId === company.id ? (
                  <input
                    type="password"
                    name="password"
                    value={editedCompany.password}
                    onChange={handleInputChange}
                  />
                ) : (
                  company.password
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingCompanyId === company.id ? (
                  <input
                    type="text"
                    name="address"
                    value={editedCompany.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  company.address
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingCompanyId === company.id ? (
                  <input
                    type="text"
                    name="companyType"
                    value={editedCompany.companyType}
                    onChange={handleInputChange}
                  />
                ) : (
                  company.companyType
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {company.profileStatus}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {company.profileImagePath && !editingCompanyId ? (
                  <img
                    src={`http://localhost:8082${company.profileImagePath}`}
                    alt="Profile"
                    width="50"
                    style={{ display: "block", margin: "0 auto" }}
                  />
                ) : (
                  editingCompanyId === company.id && (
                    <input
                      type="file"
                      name="profileImage"
                      onChange={handleFileChange}
                    />
                  )
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingCompanyId === company.id ? (
                  <button onClick={handleUpdate}>Update</button>
                ) : (
                  <>
                    <button onClick={() => navigate(`/edit-company/${company.id}`)}>Edit</button> {/* Updated to use navigate */}
                    <button onClick={() => handleDelete(company.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
