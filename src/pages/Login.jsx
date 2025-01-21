import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [email, setEmail] = useState("jagrut@gmail.com");
  const [password, setPassword] = useState("Jagrut@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoginPage, setIsLoginPage] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          email,
          password,
          age,
        },
        { withCredentials: true }
      );

      console.log(res?.data?.data);
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (error) {
      setErrorMsg(error?.response?.data);
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data.data));
      return navigate("/");
    } catch (error) {
      setErrorMsg(error?.response?.data);
      console.error(error);
    }
  };

  const handleSwitch = () => {
    setIsLoginPage((isLoginPage) => !isLoginPage);
    setErrorMsg("");
  };

  return (
    <div className="card bg-primary text-primary-content w-96 self-center">
      <div className="card-body">
        <h2 className="card-title">Login to your account</h2>

        {!isLoginPage && (
          <>
            <label className="form-control w-full max-w-xs">
              <div className="label pb-[3px]">
                <span className="label-text text-black">First name: </span>
              </div>
              <input
                type="text"
                placeholder="first name"
                className="input input-bordered w-full max-w-xs text-base-content"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label pb-[3px]">
                <span className="label-text text-black">Last name: </span>
              </div>
              <input
                type="text"
                placeholder="last name"
                className="input input-bordered w-full max-w-xs text-base-content"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label pb-[3px]">
                <span className="label-text text-black">Age: </span>
              </div>
              <input
                type="text"
                placeholder="age"
                className="input input-bordered w-full max-w-xs text-base-content"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
          </>
        )}

        <label className="form-control w-full max-w-xs">
          <div className="label pb-[3px]">
            <span className="label-text text-black">Email: </span>
          </div>
          <input
            type="text"
            placeholder="email"
            className="input input-bordered w-full max-w-xs text-base-content"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label pb-[3px]">
            <span className="label-text text-black">Password: </span>
          </div>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered w-full max-w-xs text-base-content"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <p className="text-error font-semibold">{errorMsg}</p>

        <div className="card-actions justify-center">
          <button
            className="btn"
            onClick={isLoginPage ? handleLogin : handleSignup}
          >
            {isLoginPage ? "Login" : "Signup"}
          </button>
        </div>
        <p className="text-center">
          {isLoginPage ? "New User ? Signup" : "Existing User? Login"}{" "}
          <span className="cursor-pointer font-semibold" onClick={handleSwitch}>
            Here
          </span>
        </p>
      </div>
    </div>
  );
};
export default Login;
