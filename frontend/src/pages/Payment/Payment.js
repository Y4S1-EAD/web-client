import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CreatePayment from './CreatePayment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import dt from "datatables.net-bs4"; // DataTables import
import axios from "axios"; // Import axios for fetching data

export default function Payment() {
  const [payments, setPayments] = useState([]); // Store fetched payments
  const [isDataLoaded, setIsDataLoaded] = useState(false); // To track when the data is loaded

  useEffect(() => {
    // Fetch payment data from the API
    axios
      .get("http://localhost:2030/api/Payments")
      .then((response) => {
        setPayments(response.data); // Set the fetched data to the state
        setIsDataLoaded(true); // Set data loaded to true
      })
      .catch((error) => {
        console.error("There was an error fetching the payments!", error);
      });

    return () => {
      if ($.fn.DataTable.isDataTable("#paymentTable")) {
        $("#paymentTable").DataTable().destroy(true); // Cleanup on component unmount
      }
    };
  }, []);

  useEffect(() => {
    // Initialize the DataTable only when data is loaded
    if (isDataLoaded) {
      $("#paymentTable").DataTable(); // Initialize the DataTable after data is loaded
    }
  }, [isDataLoaded]); // This useEffect depends on data being loaded

  // Function to handle delete
  const deletePayment = (paymentId) => {
    axios
      .delete(`http://localhost:2030/api/Payments/${paymentId}`)
      .then((response) => {
        // Remove the deleted payment from the state
        setPayments(
          payments.filter((payment) => payment.paymentId !== paymentId)
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the payment!", error);
      });
  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <h2 className="mt-10">Payment List</h2>

        <div className="d-flex justify-content-end mb-3">
          <CreatePayment /> {/* Trigger the CreatePayment modal */}
        </div>

        <table
          id="paymentTable"
          className="table table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Payment Reference</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.paymentId}>
                  <td>{payment.paymentId}</td>
                  <td>{payment.paymentReference}</td>
                  <td>{payment.amount}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2">
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deletePayment(payment.paymentId)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>Payment ID</th>
              <th>Payment Reference</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <Footer />
    </>
  );
}
