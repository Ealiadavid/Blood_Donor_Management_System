import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ViewDonor() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch donors
  const getDonors = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/donors"
      );

      setDonors(response.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
      alert("Error fetching donor data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDonors();
  }, []);

  // Delete donor
  const deleteDonor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this donor?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/donors/${id}`
      );

      alert("Donor deleted successfully");

      getDonors();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    }
  };

  // Download PDF
  const downloadPDF = () => {
    if (donors.length === 0) {
      alert("No donor data available");
      return;
    }

    const doc = new jsPDF("landscape");

    doc.setFontSize(18);
    doc.text(
      "Blood Donor Management System",
      14,
      18
    );

    autoTable(doc, {
      startY: 28,

      head: [[
        "Name",
        "Age",
        "Gender",
        "Blood Group",
        "Phone",
        "Email",
        "Address"
      ]],

      body: donors.map((donor) => [
        donor.name || "-",
        donor.age || "-",
        donor.gender || "-",
        donor.bloodGroup || "-",
        donor.phone || "-",
        donor.email || "-",
        donor.address || "-"
      ]),

      theme: "grid",

      styles: {
        fontSize: 9,
        cellPadding: 3
      },

      headStyles: {
        fontStyle: "bold"
      }
    });

    doc.save("Blood_Donor_Report.pdf");
  };

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "25px 30px"
      }}
    >

      {/* PAGE TITLE */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "22px"
        }}
      >

        <div>
          <h2
            style={{
              margin: 0,
              color: "#dc3545",
              fontWeight: "600"
            }}
          >
            📋 Donor List
          </h2>

          <p
            style={{
              margin: "5px 0 0",
              color: "#6c757d",
              fontSize: "14px"
            }}
          >
            Manage registered blood donors
          </p>
        </div>

        <button
          className="btn btn-success"
          onClick={downloadPDF}
          style={{
            padding: "9px 16px",
            borderRadius: "6px",
            fontWeight: "500"
          }}
        >
          📄 Download PDF
        </button>

      </div>


      {/* TABLE FRAME */}

      <div
        style={{
          width: "100%",
          background: "#ffffff",
          border: "1px solid #dcdcdc",
          borderRadius: "6px",
          overflow: "hidden",
          boxSizing: "border-box"
        }}
      >

        {loading ? (

          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#777"
            }}
          >
            Loading donor details...
          </div>

        ) : donors.length === 0 ? (

          <div
            style={{
              textAlign: "center",
              padding: "45px",
              color: "#777"
            }}
          >
            <h5>No donor data available</h5>

            <button
              className="btn btn-danger mt-2"
              onClick={() => navigate("/add-donor")}
            >
              ➕ Add Donor
            </button>
          </div>

        ) : (

          <table
            className="table table-bordered table-striped mb-0"
            style={{
              width: "100%",
              margin: 0,
              tableLayout: "fixed",
              fontSize: "13px"
            }}
          >

            <thead className="table-danger">

              <tr>

                <th
                  style={{
                    width: "13%",
                    textAlign: "center",
                    padding: "11px 6px"
                  }}
                >
                  Name
                </th>

                <th
                  style={{
                    width: "7%",
                    textAlign: "center",
                    padding: "11px 6px"
                  }}
                >
                  Age
                </th>

                <th
                  style={{
                    width: "10%",
                    textAlign: "center",
                    padding: "11px 6px"
                  }}
                >
                  Gender
                </th>

                <th
                  style={{
                    width: "12%",
                    textAlign: "center",
                    padding: "11px 6px"
                  }}
                >
                  Blood Group
                </th>

                <th
                  style={{
                    width: "13%",
                    textAlign: "center",
                    padding: "11px 6px"
                  }}
                >
                  Phone
                </th>

                <th
                  style={{
                    width: "18%",
                    textAlign: "center",
                    padding: "11px 6px"
                  }}
                >
                  Email
                </th>

                <th
                  style={{
                    width: "13%",
                    textAlign: "center",
                    padding: "11px 6px"
                  }}
                >
                  Address
                </th>

                <th
                  style={{
                    width: "14%",
                    textAlign: "center",
                    padding: "11px 6px"
                  }}
                >
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {donors.map((donor) => (

                <tr key={donor._id}>

                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      wordBreak: "break-word",
                      padding: "9px 5px"
                    }}
                  >
                    {donor.name || "-"}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle"
                    }}
                  >
                    {donor.age || "-"}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      wordBreak: "break-word"
                    }}
                  >
                    {donor.gender || "-"}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      fontWeight: "600",
                      color: "#dc3545"
                    }}
                  >
                    {donor.bloodGroup || "-"}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      wordBreak: "break-word"
                    }}
                  >
                    {donor.phone || "-"}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      wordBreak: "break-word"
                    }}
                  >
                    {donor.email || "-"}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      wordBreak: "break-word"
                    }}
                  >
                    {donor.address || "-"}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      whiteSpace: "nowrap"
                    }}
                  >

                    <button
                      className="btn btn-warning btn-sm"
                      title="Edit Donor"
                      onClick={() =>
                        navigate(
                          `/edit-donor/${donor._id}`
                        )
                      }
                      style={{
                        width: "32px",
                        height: "30px",
                        padding: 0,
                        marginRight: "5px",
                        borderRadius: "5px"
                      }}
                    >
                      ✏️
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      title="Delete Donor"
                      onClick={() =>
                        deleteDonor(donor._id)
                      }
                      style={{
                        width: "32px",
                        height: "30px",
                        padding: 0,
                        borderRadius: "5px"
                      }}
                    >
                      🗑️
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default ViewDonor;