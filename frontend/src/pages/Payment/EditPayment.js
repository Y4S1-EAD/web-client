import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export default function EditPayment({ payment, onPaymentUpdated }) {
  // State to manage the modal visibility
  const [showModal, setShowModal] = useState(false);

  // Form fields
  const [paymentReference, setPaymentReference] = useState('');
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState([]);

  // Open the modal and initialize form fields with payment data
  const handleShow = () => {
    setPaymentReference(payment.paymentReference || '');
    setAmount(payment.amount);
    setUserId(payment.userId);
    setShowModal(true);
  };

  // Close the modal and reset form fields
  const handleClose = () => {
    setShowModal(false);
    setErrors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPaymentData = {
      paymentId: payment.paymentId,
      paymentReference,
      amount: parseFloat(amount),
      userId,
    };

    // Reset errors
    setErrors([]);

    // Send PUT request to update the payment
    axios
      .put(`http://localhost:2030/api/Payments/${payment.paymentId}`, updatedPaymentData)
      .then((response) => {
        // Handle success
        console.log('Payment updated successfully:', response.data);
        toast.success('Payment updated successfully!');
        // Close the modal
        handleClose();
        // Notify parent component to refresh the payment list
        if (onPaymentUpdated) {
          onPaymentUpdated(response.data.payment);
        }
      })
      .catch((error) => {
        // Handle error
        console.error('There was an error updating the payment!', error);
        if (error.response && error.response.data) {
          const responseData = error.response.data;
          console.log('Error response data:', responseData); // Log detailed error
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
            setErrors(['An unexpected error occurred.']);
            toast.error('An unexpected error occurred.');
          }
        } else {
          setErrors(['An unexpected error occurred.']);
          toast.error('An unexpected error occurred.');
        }
      });
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <button
        type="button"
        className="btn btn-primary btn-sm me-2"
        onClick={handleShow}
      >
        Edit
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
                <h5 className="modal-title">Edit Payment</h5>
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
                      {/* Payment Reference input */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="paymentReference">
                          Payment Reference
                        </label>
                        <input
                          type="text"
                          id="paymentReference"
                          className="form-control"
                          placeholder="Enter payment reference"
                          value={paymentReference}
                          onChange={(e) => setPaymentReference(e.target.value)}
                        />
                      </div>

                      {/* Amount input */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="amount">
                          Amount
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          id="amount"
                          className="form-control"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-md-6">
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
                    Update
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
