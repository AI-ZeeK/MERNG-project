import { useState } from "react";
import { FaList, FaUser } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "./Spinner";
import { ADD_PROJECT } from "../mutations/projectMutations";

const AddProjectModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");
  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject]: any = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects }: any = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(name, description, clientId);
    if (name === "" || description === "" || clientId === "") {
      return alert("Please fill in all fields");
    }
    addProject(name, description, clientId, status);
    setName("");
    setDescription("");
    setClientId("");
    setStatus("");
  };
  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div>
          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal">
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>Add Project</div>
            </div>
          </button>

          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="addProjectModal"
            tabIndex={-1}
            aria-labelledby="addClientModalX"
            aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addClientModalX">
                    Add Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form action="" onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) =>
                          setDescription(e.target.value)
                        }></textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Status
                      </label>

                      <select
                        name="status"
                        id="status"
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Client
                      </label>
                      <select
                        name="clientId"
                        id="clienId"
                        className="form-select"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}>
                        <option value="">Select Client</option>
                        {data.clients.map((client: any) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal">
                      Submit
                    </button>
                  </form>
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProjectModal;
