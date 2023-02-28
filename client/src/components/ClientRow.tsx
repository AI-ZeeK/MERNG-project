import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
interface Props {
  client: {
    name: string;
    email: string;
    phone: string;
    id: string;
  };
}
const ClientRow = ({ client }: Props) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { deleteClient } }) {
      const { clients }: any = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter(
            (client: any) => client.id !== deleteClient.id
          ),
        },
      });
    },
  });
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>

      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteClient()}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
