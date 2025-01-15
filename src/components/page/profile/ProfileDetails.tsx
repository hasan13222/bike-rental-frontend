

const ProfileDetails = ({userData}: any) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-5">Profile Information</h2>
      <ul>
        <li className="text-lg mb-3 shadow-sm border p-3 rounded-md">
          <span className="font-medium">Name:</span> {userData?.name}
        </li>
        <li className="text-lg mb-3 shadow-sm border p-3 rounded-md">
          <span className="font-medium">Email:</span> {userData?.email}
        </li>
        <li className="text-lg mb-3 shadow-sm border p-3 rounded-md">
          <span className="font-medium">Phone:</span> {userData?.phone}
        </li>
        <li className="text-lg shadow-sm border p-3 rounded-md">
          <span className="font-medium">Address:</span> {userData?.address}
        </li>
      </ul>
    </>
  );
};

export default ProfileDetails;
