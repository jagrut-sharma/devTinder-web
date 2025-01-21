import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!feed) {
      fetchFeed();
    }
  }, []);

  if (!feed) return;

  if (feed.length === 0)
    return <h1 className="my-8 text-2xl">No new users found</h1>;

  return (
    feed && (
      <div className="flex items-center">
        <UserCard user={feed[0]} buttons />
      </div>
    )
  );
};
export default Feed;
