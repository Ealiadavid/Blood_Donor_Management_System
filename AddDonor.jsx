import { useState } from "react";
import axios from "axios";

function AddDonor() {

  const [donor, setDonor] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    address: "",
    lastDonationDate: ""
  });


  const handleChange = (e) => {
    setDonor({
      ...donor,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/api/donors/add",
      donor
    );

    console.log("SERVER RESPONSE:", response.data);

    alert("Donor Added Successfully 🩸");

    setDonor({
      name: "",
      age: "",
      gender: "",
      bloodGroup: "",
      phone: "",
      email: "",
      address: "",
      lastDonationDate: ""
    });

  } catch (error) {

    console.log("ADD DONOR ERROR:", error);

    if (error.response) {
      console.log("STATUS:", error.response.status);
      console.log("DATA:", error.response.data);

      alert(
        error.response.data.message ||
        "Error adding donor"
      );
    } else {
      alert("Server connection failed");
    }
  }
};


  return (
    <div className="container">

      <h2 className="text-danger mb-4">
        ➕ Add New Donor
      </h2>


      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-3"
          name="name"
          placeholder="Donor Name"
          value={donor.name}
          onChange={handleChange}
        />


        <input
          className="form-control mb-3"
          name="age"
          placeholder="Age"
          type="number"
          value={donor.age}
          onChange={handleChange}
        />


        <select
          className="form-control mb-3"
          name="gender"
          value={donor.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>


        <input
          className="form-control mb-3"
          name="bloodGroup"
          placeholder="Blood Group"
          value={donor.bloodGroup}
          onChange={handleChange}
        />


        <input
          className="form-control mb-3"
          name="phone"
          placeholder="Phone Number"
          value={donor.phone}
          onChange={handleChange}
        />


        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          value={donor.email}
          onChange={handleChange}
        />


        <input
          className="form-control mb-3"
          name="address"
          placeholder="Address"
          value={donor.address}
          onChange={handleChange}
        />


        <input
          className="form-control mb-3"
          name="lastDonationDate"
          type="date"
          value={donor.lastDonationDate}
          onChange={handleChange}
        />


        <button className="btn btn-danger">
          Add Donor 🩸
        </button>


      </form>

    </div>
  );
}

export default AddDonor;