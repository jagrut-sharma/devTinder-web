import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

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
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, aboutUs, _id } = connection;

        return (
          <div
            className="card card-side bg-base-300 shadow-xl max-w-[100%]"
            key={_id}
          >
            <figure>
              <img src={photoUrl} alt="photo" className="h-64" />
            </figure>
            <div className="card-body flex-auto">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              <p className="max-h-8">{age}</p>
              <div>
                <h3 className="font-semibold ">About:</h3>
                <p>{aboutUs}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
