import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";


function Dashboard() {

  const [donors, setDonors] = useState([]);

  const [loading, setLoading] = useState(true);


  // Get all donors
  const getDonors = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/donors"
      );

      setDonors(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      alert("Error fetching donor data");

      setLoading(false);

    }

  };


  useEffect(() => {

    getDonors();

  }, []);


  // Total donors
  const totalDonors = donors.length;


  // Get unique blood groups
  const uniqueBloodGroups = [
    ...new Set(
      donors
        .map((donor) => donor.bloodGroup)
        .filter((group) => group)
    )
  ];


  const bloodGroups = uniqueBloodGroups.length;


  // Count blood groups
  const bloodGroupCount = {};


  donors.forEach((donor) => {

    const group = donor.bloodGroup;

    if (group) {

      bloodGroupCount[group] =
        (bloodGroupCount[group] || 0) + 1;

    }

  });


  // Prepare chart data
  const chartData = Object.keys(bloodGroupCount).map(
    (group) => ({

      name: group,

      value: bloodGroupCount[group]

    })
  );


  // Chart colors
  const colors = [

    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FF0000",
    "#00A86B"

  ];


  return (

    <div className="container mt-4">


      {/* Dashboard Title */}

      <h2 className="text-danger mb-4">

        🩸 Blood Donor Management Dashboard

      </h2>



      {/* Quote Box */}

      <div className="card shadow border-danger text-center mb-4">

        <div className="card-body">

          <h4 className="text-danger">

            ❤️ Every Drop Counts

          </h4>


          <p className="mb-0">

            A small act of kindness can give someone a second chance at life.

          </p>

        </div>

      </div>



      {/* Loading */}

      {loading && (

        <div className="text-center mb-4">

          <p>

            Loading donor information...

          </p>

        </div>

      )}



      {/* Dashboard Cards */}

      <div className="row">


        {/* Total Donors */}

        <div className="col-md-4 mb-3">

          <div className="card shadow text-center border-danger">

            <div className="card-body">

              <h1>

                👥

              </h1>


              <h2 className="text-danger">

                {totalDonors}

              </h2>


              <p>

                Total Donors

              </p>

            </div>

          </div>

        </div>



        {/* Blood Groups */}

        <div className="col-md-4 mb-3">

          <div className="card shadow text-center border-danger">

            <div className="card-body">

              <h1>

                🩸

              </h1>


              <h2 className="text-danger">

                {bloodGroups}

              </h2>


              <p>

                Blood Groups

              </p>

            </div>

          </div>

        </div>



        {/* Available Donors */}

        <div className="col-md-4 mb-3">

          <div className="card shadow text-center border-danger">

            <div className="card-body">

              <h1>

                ✅

              </h1>


              <h2 className="text-danger">

                {totalDonors}

              </h2>


              <p>

                Available Donors

              </p>

            </div>

          </div>

        </div>


      </div>



      {/* Blood Group Distribution */}

      <div className="card shadow mt-5">

        <div className="card-body text-center">


          <h3 className="text-danger mb-4">

            📊 Blood Group Distribution

          </h3>



          {chartData.length > 0 ? (

            <div className="d-flex justify-content-center align-items-center">


              <PieChart width={400} height={350}>


                <Pie

                  data={chartData}

                  dataKey="value"

                  nameKey="name"

                  cx="50%"

                  cy="50%"

                  outerRadius={120}

                  label

                >


                  {chartData.map((entry, index) => (

                    <Cell

                      key={index}

                      fill={colors[index % colors.length]}

                    />

                  ))}


                </Pie>


                <Tooltip />

                <Legend />


              </PieChart>


            </div>

          ) : (

            <p>

              No donor data available.

            </p>

          )}


        </div>

      </div>


    </div>

  );

}


export default Dashboard;