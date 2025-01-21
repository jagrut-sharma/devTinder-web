/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "male");
  const [about, setAbout] = useState(user.aboutUs);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      if (isDisabled) return;

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          aboutUs: about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setIsDisabled(true);
      setErrorMsg("");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err?.response?.data);
    }
  };

  return (
    <div className="flex gap-8">
      <div className="card bg-primary text-primary-content w-96 self-center">
        <div className="card-body gap-4">
          <h2 className="card-title">Edit Profile</h2>

          <label className="form-control w-full max-w-xs">
            <div className="label pb-0">
              <span className="label-text text-black">First name:</span>
            </div>
            <input
              type="text"
              placeholder="first name"
              className="input input-bordered w-full max-w-xs text-base-content"
              disabled={isDisabled}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label pb-0">
              <span className="label-text text-black">Last name:</span>
            </div>
            <input
              type="text"
              placeholder="last name"
              className="input input-bordered w-full max-w-xs text-base-content"
              disabled={isDisabled}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label pb-0">
              <span className="label-text text-black">Photo URL:</span>
            </div>
            <input
              type="text"
              placeholder="photo URL"
              className="input input-bordered w-full max-w-xs text-base-content"
              disabled={isDisabled}
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label pb-0">
              <span className="label-text text-black">Age:</span>
            </div>
            <input
              type="text"
              placeholder="age"
              className="input input-bordered w-full max-w-xs text-base-content"
              disabled={isDisabled}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label pb-0">
              <span className="label-text text-black">Gender:</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs text-base-content"
              disabled={isDisabled}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label pb-0">
              <span className="label-text text-black">About:</span>
            </div>

            <textarea
              className="textarea textarea-bordered text-base-content"
              placeholder="Bio"
              disabled={isDisabled}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </label>

          <p className="text-error font-semibold">{errorMsg}</p>

          <div className="card-actions justify-evenly">
            <button
              className="btn bg-neutral-content text-black hover:opacity-90 hover:text-neutral-content"
              onClick={() => setIsDisabled(!isDisabled)}
            >
              {isDisabled ? "Edit profile" : "Cancel"}
            </button>
            <button className="btn" onClick={saveProfile}>
              Update Profile
            </button>
          </div>
        </div>
      </div>

      <UserCard user={{ firstName, lastName, photoUrl, gender, age, about }} />

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditProfile;
