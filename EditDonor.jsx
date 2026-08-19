import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditDonor() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [donor, setDonor] = useState({
    name:"",
    age:"",
    gender:"",
    bloodGroup:"",
    phone:"",
    email:"",
    address:""
  });


  useEffect(() => {

    axios.get(`http://localhost:5000/api/donors/${id}`)
      .then((res) => {
        setDonor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [id]);


  const handleChange = (e) => {

    setDonor({
      ...donor,
      [e.target.name]: e.target.value
    });

  };


  const updateDonor = () => {

    axios.put(
      `http://localhost:5000/api/donors/${id}`,
      donor
    )
    .then(() => {

  alert("Donor Updated Successfully ✅");
  window.location.href = "/dashboard";

})
    .catch((err) => {

      console.log(err);
      alert("Update Failed");

    });

  };


  return (

    <div className="container mt-4">

      <h2 className="text-danger">
        ✏️ Edit Donor
      </h2>


      <input className="form-control mb-2"
        name="name"
        value={donor.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input className="form-control mb-2"
        name="age"
        value={donor.age}
        onChange={handleChange}
        placeholder="Age"
      />

      <input className="form-control mb-2"
        name="gender"
        value={donor.gender}
        onChange={handleChange}
        placeholder="Gender"
      />

      <input className="form-control mb-2"
        name="bloodGroup"
        value={donor.bloodGroup}
        onChange={handleChange}
        placeholder="Blood Group"
      />

      <input className="form-control mb-2"
        name="phone"
        value={donor.phone}
        onChange={handleChange}
        placeholder="Phone"
      />

      <input className="form-control mb-2"
        name="email"
        value={donor.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input className="form-control mb-2"
        name="address"
        value={donor.address}
        onChange={handleChange}
        placeholder="Address"
      />


      <button
        className="btn btn-danger"
        onClick={updateDonor}
      >
        Update Donor
      </button>


    </div>

  );

}

export default EditDonor;