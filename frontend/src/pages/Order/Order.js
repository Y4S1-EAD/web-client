import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CreateOrder from "./CreateOrder";
import EditOrder from "./EditOrder"; // Import EditOrder component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import dt from "datatables.net-bs4"; // DataTables import
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_WEB_API}/Orders`)
      .then((response) => {
        setOrders(response.data);
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        toast.error("Error fetching orders.");
      });

    return () => {
      if ($.fn.DataTable.isDataTable("#orderTable")) {
        $("#orderTable").DataTable().destroy(true);
      }
    };
  }, []);

  useEffect(() => {
    if (isDataLoaded) {
      $("#orderTable").DataTable();
    }
  }, [isDataLoaded]);

  const deleteOrder = (orderId) => {
    axios
      .delete(`${process.env.REACT_APP_WEB_API}/Orders/${orderId}`)
      .then((response) => {
        setOrders(orders.filter((order) => order.orderId !== orderId));
        toast.success("Order deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        toast.error("Error deleting order.");
      });
  };

  const handleOrderCreated = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const handleOrderUpdated = (updatedOrder) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === updatedOrder.orderId ? updatedOrder : order
    );
    setOrders(updatedOrders);
  };

  // Function to return background color class for the status
  const getStatusBackgroundClass = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-success text-white"; // Green background for delivered
      case "cancelled":
        return "bg-danger text-white"; // Red background for cancelled
      case "processing":
      default:
        return "bg-warning text-dark"; // Yellow background for processing or default
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container my-4">
        <h2 className="mt-10">Order List</h2>
        <div className="d-flex justify-content-end mb-3">
          <CreateOrder onOrderCreated={handleOrderCreated} />
        </div>
        <table
          id="orderTable"
          className="table table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Description</th>
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
                  {/* Apply the background color class to the status column */}
                  <td className={getStatusBackgroundClass(order.status)}>
                    {order.status}
                  </td>
                  <td>
                    <EditOrder
                      order={order}
                      onOrderUpdated={handleOrderUpdated}
                    />
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
        </table>
      </div>
      <Footer />
    </>
  );
}
