import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"; // Import the correct icon

export default function CreateOrder() {
  // State to manage the modal visibility
  const [showModal, setShowModal] = useState(false);

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
          <div className="modal-dialog d-flex justify-content-center">
            <div className="modal-content w-75">
              <div className="modal-header">
                <h5 className="modal-title">Create New Order</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <form>
                  {/* Name input */}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input type="text" id="name" className="form-control" />
                  </div>

                  {/* Email input */}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                    <input type="email" id="email" className="form-control" />
                  </div>

                  {/* Status input */}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="status">
                      Status
                    </label>
                    <input
                      type="text"
                      id="status"
                      className="form-control"
                    />
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
