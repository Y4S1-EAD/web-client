import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"; // Import the correct icon

export default function CreateOrder() {
  // State to manage the modal visibility
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("processing"); // Initial status

  // Functions to open and close the modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      {/* Button to trigger the modal */}
      <button
        type="button"
        className="btn btn-success d-flex align-items-center"
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faCirclePlus} className="me-2" /> Create
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
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
                <form>
                  <div className="row">
                    {/* Left Column */}
                    <div className="col-md-6">
                      {/* Order Description input */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="orderDescription">
                          Order Description
                        </label>
                        <input
                          type="text"
                          id="orderDescription"
                          className="form-control"
                          placeholder="Enter order description"
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
                        />
                      </div>

                      {/* Delivery Method dropdown */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="deliveryMethod">
                          Delivery Method
                        </label>
                        <select id="deliveryMethod" className="form-control">
                          <option value="postal">Postal</option>
                          <option value="express-postal">Express Postal</option>
                          <option value="courier">Courier Service</option>
                        </select>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-md-6">
                      {/* Status dropdown (without colors) */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="status">
                          Status
                        </label>
                        <select
                          id="status"
                          className="form-control"
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
