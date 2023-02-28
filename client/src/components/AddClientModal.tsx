import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
const AddClientModal = () => {
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal">
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="addClientModal"
        tabIndex={-1}
        aria-labelledby="addClientModalX"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addClientModalX">
                Add Client
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;
