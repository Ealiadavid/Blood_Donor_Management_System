import { useState } from "react";
import axios from "axios";


function SearchDonor() {

  const [search, setSearch] = useState("");
  const [donors, setDonors] = useState([]);


  const searchDonor = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/donors/search/${search}`
      );

      setDonors(response.data);


    } catch (error) {

      console.log(error);
      alert("No Donor Found");

    }

  };


  return (

    <div className="container">


      <h2 className="text-danger mb-4">
        🔍 Search Donor
      </h2>


      <div className="d-flex mb-4">


        <input
          className="form-control me-2"
          placeholder="Enter Blood Group (O+) or Name"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />


        <button
          className="btn btn-danger"
          onClick={searchDonor}
        >
          Search
        </button>


      </div>



      <table className="table table-bordered table-striped">


        <thead className="table-danger">

          <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>

        </thead>



        <tbody>

        {
          donors.map((donor)=>(

            <tr key={donor._id}>

              <td>{donor.name}</td>
              <td>{donor.bloodGroup}</td>
              <td>{donor.phone}</td>
              <td>{donor.address}</td>

            </tr>

          ))
        }

        </tbody>


      </table>


    </div>

  );

}


export default SearchDonor;