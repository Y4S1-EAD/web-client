import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CreateOrder from './CreateOrder'; // Import the CreateOrder component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons"; // Correct imports after installation
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";

// Import DataTables and integrate with jQuery
import dt from "datatables.net-bs4";

export default function Order() {
  useEffect(() => {
    // Initialize the DataTable
    $(document).ready(function () {
      $("#example").DataTable();
    });

    // Cleanup function to destroy the DataTable instance on unmount
    return () => {
      if ($.fn.DataTable.isDataTable("#example")) {
        $("#example").DataTable().destroy(true);
      }
    };
  }, []);

  return (
    <>
      <Header />
      <div className="container my-4">
      <h2 className="mt-10">Order List</h2>

        {/* Create button aligned to the right */}
        <div className="d-flex justify-content-end mb-3">
        <CreateOrder /> {/* This will trigger the CreateOrder modal */}
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
            <tr>
              <td>1001</td>
              <td>2023-08-12</td>
              <td>Wireless Headphones</td>
              <td>$50</td>
              <td>Standard</td>
              <td>Delivered</td>
              <td>
                <button className="btn btn-primary btn-sm me-2">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button className="btn btn-danger btn-sm">
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
            </tr>

            <tr>
              <td>1001</td>
              <td>2023-08-12</td>
              <td>Wireless Headphones</td>
              <td>$50</td>
              <td>Standard</td>
              <td>Delivered</td>
              <td>
                <button className="btn btn-primary btn-sm me-2">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button className="btn btn-danger btn-sm">
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
            </tr>

            <tr>
              <td>1001</td>
              <td>2023-08-12</td>
              <td>Wireless Headphones</td>
              <td>$50</td>
              <td>Standard</td>
              <td>Delivered</td>
              <td>
                <button className="btn btn-primary btn-sm me-2">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button className="btn btn-danger btn-sm">
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
            </tr>

            <tr>
              <td>1001</td>
              <td>2023-08-12</td>
              <td>Wireless Headphones</td>
              <td>$50</td>
              <td>Standard</td>
              <td>Delivered</td>
              <td>
                <button className="btn btn-primary btn-sm me-2">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button className="btn btn-danger btn-sm">
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
            </tr>
            {/* Add more rows as needed */}
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
