import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CreateOrder from './CreateOrder';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import dt from "datatables.net-bs4"; // DataTables import
import axios from "axios"; // Import axios for fetching data

export default function Order() {
  const [orders, setOrders] = useState([]); // Store fetched orders
  const [isDataLoaded, setIsDataLoaded] = useState(false); // To track when the data is loaded

  useEffect(() => {
    // Fetch order data from the API
    axios.get('http://localhost:2030/api/Orders')
      .then(response => {
        setOrders(response.data); // Set the fetched data to the state
        setIsDataLoaded(true); // Set data loaded to true
      })
      .catch(error => {
        console.error("There was an error fetching the orders!", error);
      });

    return () => {
      if ($.fn.DataTable.isDataTable("#example")) {
        $("#example").DataTable().destroy(true); // Cleanup on component unmount
      }
    };
  }, []);

  useEffect(() => {
    // Initialize the DataTable only when data is loaded
    if (isDataLoaded) {
      $('#example').DataTable(); // Initialize the DataTable after data is loaded
    }
  }, [isDataLoaded]); // This useEffect depends on data being loaded

  // Function to handle delete
  const deleteOrder = (orderId) => {
    axios.delete(`http://localhost:2030/api/Orders/${orderId}`)
      .then(response => {
        // Remove the deleted order from the state
        setOrders(orders.filter(order => order.orderId !== orderId));
      })
      .catch(error => {
        console.error("There was an error deleting the order!", error);
      });
  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <h2 className="mt-10">Order List</h2>

        <div className="d-flex justify-content-end mb-3">
          <CreateOrder /> {/* Trigger the CreateOrder modal */}
        </div>

        <table
          id="example"
          className="table table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Order Description</th>
              <th>Amount</th>
              <th>Delivery Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.orderDescription}</td>
                  <td>{order.amount}</td>
                  <td>{order.deliveryMethod}</td>
                  <td>{order.status}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2">
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteOrder(order.orderId)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Order Description</th>
              <th>Amount</th>
              <th>Delivery Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <Footer />
    </>
  );
}
