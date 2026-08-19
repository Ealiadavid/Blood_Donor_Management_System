import { useState } from "react";
import axios from "axios";

function EmergencyRequest() {

  const [request, setRequest] = useState({
    bloodGroup: "",
    units: "",
    hospital: "",
    contact: "",
    reason: ""
  });

  const handleChange = (e) => {

    setRequest({
      ...request,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/emergency/add",
        request
      );

      alert(
        response.data.message ||
        "Emergency Blood Request Submitted Successfully 🚨"
      );

      setRequest({
        bloodGroup: "",
        units: "",
        hospital: "",
        contact: "",
        reason: ""
      });

    } catch (error) {

      console.log("Emergency Request Error:", error);

      if (error.response) {

        alert(
          error.response.data.message ||
          "Failed to submit request"
        );

      } else {

        alert("Server connection failed");

      }

    }

  };


  return (

    <div className="container mt-4">

      <h2 className="text-danger mb-4">
        🚨 Emergency Blood Request
      </h2>


      <div className="card shadow border-danger">

        <div className="card-body">

          <h5 className="text-danger mb-4">
            Request Blood for Emergency
          </h5>


          <form onSubmit={handleSubmit}>


            {/* Blood Group */}

            <label className="form-label">
              Blood Group
            </label>

            <select
              className="form-control mb-3"
              name="bloodGroup"
              value={request.bloodGroup}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Blood Group
              </option>

              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>

            </select>


            {/* Units */}

            <label className="form-label">
              Units Required
            </label>

            <input
              type="number"
              className="form-control mb-3"
              name="units"
              placeholder="Enter number of units"
              min="1"
              value={request.units}
              onChange={handleChange}
              required
            />


            {/* Hospital */}

            <label className="form-label">
              Hospital Name
            </label>

            <input
              type="text"
              className="form-control mb-3"
              name="hospital"
              placeholder="Enter hospital name"
              value={request.hospital}
              onChange={handleChange}
              required
            />


            {/* Contact */}

            <label className="form-label">
              Contact Number
            </label>

            <input
              type="tel"
              className="form-control mb-3"
              name="contact"
              placeholder="Enter contact number"
              value={request.contact}
              onChange={handleChange}
              required
            />


            {/* Reason */}

            <label className="form-label">
              Emergency Reason
            </label>

            <textarea
              className="form-control mb-3"
              name="reason"
              placeholder="Enter emergency details"
              rows="3"
              value={request.reason}
              onChange={handleChange}
              required
            />


            <button
              type="submit"
              className="btn btn-danger"
            >
              🚨 Request Blood
            </button>


          </form>

        </div>

      </div>

    </div>

  );

}

export default EmergencyRequest;