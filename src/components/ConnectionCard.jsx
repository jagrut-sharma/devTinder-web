/* eslint-disable react/prop-types */
const ConnectionCard = ({ connection }) => {
  const { firstName, lastName, photoUrl, age, aboutUs } = connection;
  return (
    <div className="card card-side bg-base-300 shadow-xl max-w-[100%]">
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
};
export default ConnectionCard;
