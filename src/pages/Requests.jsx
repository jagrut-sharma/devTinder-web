import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import ConnectionCard from "../components/ConnectionCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!requests) {
      fetchRequests();
    }
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="my-8 text-2xl">No requests found</h1>;

  return (
    <div className="">
      <h1 className="my-8 text-2xl text-center">Connections</h1>
      {requests.map((request) => (
        <div key={request._id} className="my-6">
          <ConnectionCard connection={request.fromUserId} buttons />
        </div>
      ))}
    </div>
  );
};
export default Requests;
