import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

/* eslint-disable react/prop-types */
const UserCard = ({ user, buttons }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, aboutUs } =
    user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p className="">{about || aboutUs}</p>
        {buttons && (
          <div className="card-actions justify-evenly my-4">
            <button
              className="btn btn-warning"
              onClick={() => handleSendRequest("pass", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleSendRequest("like", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserCard;
