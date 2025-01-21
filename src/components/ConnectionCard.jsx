/* eslint-disable react/prop-types */
const ConnectionCard = ({ connection, buttons, reviewRequest, requestId }) => {
  const { firstName, lastName, photoUrl, age, aboutUs } = connection;
  return (
    <div className="card card-side bg-base-300 shadow-xl min-w-[100%]">
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

        {buttons && (
          <div className="flex justify-evenly my-4 gap-8">
            <button
              className="btn btn-warning"
              onClick={() => reviewRequest("reject", requestId)}
            >
              Reject
            </button>
            <button
              className="btn btn-success"
              onClick={() => reviewRequest("accept", requestId)}
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ConnectionCard;
