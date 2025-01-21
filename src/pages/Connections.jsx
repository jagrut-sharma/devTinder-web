import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "../components/ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!connections) {
      fetchConnections();
    }
  });

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="my-8 text-2xl">No connections found.</h1>;

  return (
    <div className="">
      <h1 className="my-8 text-2xl text-center">Connections</h1>
      {connections.map((connection) => (
        <ConnectionCard connection={connection} key={connection._id} />
      ))}
    </div>
  );
};
export default Connections;
