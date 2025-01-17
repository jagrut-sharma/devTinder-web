import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  console.log(user);

  return (
    user && (
      <div className="p-8">
        <EditProfile user={user} />
      </div>
    )
  );
};
export default Profile;
