

const ProfileDetails = ({userData}: any) => {
  return (
    <>
    
      <ul>
        <li className="text-lg mb-3">
          <span className="font-medium">Name:</span> {userData?.name}
        </li>
        <li className="text-lg mb-3">
          <span className="font-medium">Email:</span> {userData?.email}
        </li>
        <li className="text-lg mb-3">
          <span className="font-medium">Phone:</span> {userData?.phone}
        </li>
        <li className="text-lg">
          <span className="font-medium">Address:</span> {userData?.address}
        </li>
      </ul>
    </>
  );
};

export default ProfileDetails;
