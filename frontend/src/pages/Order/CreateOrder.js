// CreateOrder.js

import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {toast} from "react-toastify";

export default function CreateOrder({onOrderCreated}) {
  // State to manage the modal visibility
  const [showModal, setShowModal] = useState(false);

  // Form fields
  const [orderDescription, setOrderDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("postal");
  const [status, setStatus] = useState("processing"); // Initial status
  const [paymentId, setPaymentId] = useState("");
  const [productIds, setProductIds] = useState("");
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState([]);

  // Functions to open and close the modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setErrors([]);
    setOrderDescription("");
    setAmount("");
    setDeliveryMethod("postal");
    setStatus("processing");
    setPaymentId("");
    setProductIds("");
    setUserId("");
  };

  // Function to determine the background color class
  const getStatusBackgroundClass = () => {
    switch (status) {
      case "delivered":
        return "bg-success text-white"; // Green background for delivered
      case "cancelled":
        return "bg-danger text-white"; // Red background for cancelled
      case "processing":
      default:
        return "bg-warning text-dark"; // Yellow background for processing
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      orderId: "",
      orderDate: new Date().toISOString(),
      orderDescription,
      amount: parseFloat(amount),
      deliveryMethod,
      status,
      paymentId,
      productIds: productIds.split(",").map((id) => id.trim()),
      userId,
    };

    // Reset errors
    setErrors([]);

    // Post the data to the API
    axios
      .post(`${process.env.REACT_APP_WEB_API}/Orders`, orderData)
      .then((response) => {
        // Handle success
        console.log("Order created successfully:", response.data);
        toast.success("Order created successfully!");

        // Close the modal and reset the form
        handleClose();
        // Notify parent component to refresh the order list
        if (onOrderCreated) {
          onOrderCreated(response.data);
        }
      })
      .catch((error) => {
        // Handle error
        console.error("There was an error creating the order!", error);
        if (error.response && error.response.data) {
          const responseData = error.response.data;
          console.log("Error response data:", responseData); // Log detailed error
          if (responseData.errors) {
            const errorMessages = [];
            for (const key in responseData.errors) {
              errorMessages.push(...responseData.errors[key]);
            }
            setErrors(errorMessages);
            // Display error toast messages
            errorMessages.forEach((err) => toast.error(err));
          } else if (responseData.message) {
            setErrors([responseData.message]);
            toast.error(responseData.message);
          } else {
            setErrors(["An unexpected error occurred."]);
            toast.error("An unexpected error occurred.");
          }
        } else {
          setErrors(["An unexpected error occurred."]);
          toast.error("An unexpected error occurred.");
        }
      });
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <button
        type="button"
        className="btn btn-success d-flex align-items-center"
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faCirclePlus} className="me-2" /> Create Order
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)"}}
        >
          <div className="modal-dialog modal-lg d-flex justify-content-center">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Order</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  aria-label="Close"
                ></button>
              </div>

              {/* Full modal body without scrolling */}
              <div className="modal-body p-4">
                {errors.length > 0 && (
                  <div className="alert alert-danger">
                    <ul>
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Left Column */}
                    <div className="col-md-6">
                      {/* Order Description input */}
                      <div className="form-outline mb-4">
                        <label
                          className="form-label"
                          htmlFor="orderDescription"
                        >
                          Order Description
                        </label>
                        <input
                          type="text"
                          id="orderDescription"
                          className="form-control"
                          placeholder="Enter order description"
                          value={orderDescription}
                          onChange={(e) => setOrderDescription(e.target.value)}
                        />
                      </div>

                      {/* Amount input */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="amount">
                          Amount
                        </label>
                        <input
                          type="number"
                          id="amount"
                          className="form-control"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>

                      {/* Delivery Method dropdown */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="deliveryMethod">
                          Delivery Method
                        </label>
                        <select
                          id="deliveryMethod"
                          className="form-control"
                          value={deliveryMethod}
                          onChange={(e) => setDeliveryMethod(e.target.value)}
                        >
                          <option value="postal">Postal</option>
                          <option value="express-postal">Express Postal</option>
                          <option value="courier">Courier Service</option>
                        </select>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-md-6">
                      {/* Status dropdown with background color */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="status">
                          Status
                        </label>
                        <select
                          id="status"
                          className={`form-control ${getStatusBackgroundClass()}`} // Apply dynamic background color class
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="processing">Processing</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      {/* Payment ID input */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="paymentId">
                          Payment ID
                        </label>
                        <input
                          type="text"
                          id="paymentId"
                          className="form-control"
                          placeholder="Enter payment ID"
                          value={paymentId}
                          onChange={(e) => setPaymentId(e.target.value)}
                        />
                      </div>

                      {/* Product IDs input */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="productIds">
                          Product IDs (comma-separated)
                        </label>
                        <input
                          type="text"
                          id="productIds"
                          className="form-control"
                          placeholder="Enter product IDs"
                          value={productIds}
                          onChange={(e) => setProductIds(e.target.value)}
                        />
                      </div>

                      {/* User ID input */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="userId">
                          User ID
                        </label>
                        <input
                          type="text"
                          id="userId"
                          className="form-control"
                          placeholder="Enter user ID"
                          value={userId}
                          onChange={(e) => setUserId(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>

                  {/* Close button inside the modal body */}
                  <button
                    type="button"
                    className="btn btn-secondary btn-block mt-3"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
