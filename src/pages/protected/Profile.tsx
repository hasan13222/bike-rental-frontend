import EditProfileForm from "@/components/form/EditProfileForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProfileDetails from "../../components/page/profile/ProfileDetails";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { CustomError } from "@/types/errorType";
import { useGetProfileQuery } from "@/redux/api/user/userApi";


const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const {data: loginData} = useCheckLoginQuery(undefined);

  const {data, isLoading, isError, error} = useGetProfileQuery(loginData?.data?.token);
  return (
    <>
    
      <div className="container py-8 mx-auto">
        <div className="flex items-center gap-4">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 leading-none">
            {editMode ? "Edit Profile" : data?.data?.name}
          </h2>
          {!editMode && (
            <Button
              className="bg-accent"
              onClick={() => setEditMode(true)}
              size="sm"
            >
              Edit Profile
            </Button>
          )}
        </div>
        {isLoading && (
        <button type="button" className="bg-primary" disabled>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          Loading...
        </button>
      )}
      {isError && (
        <p className="text-red-500">{(error as CustomError)?.data?.message}</p>
      )}
        <div className="mt-1 flex items-end gap-4">
          <div className="">
            {editMode ? <EditProfileForm setEditMode={setEditMode} userData={data?.data} token={loginData?.data?.token}/> : <ProfileDetails userData={data?.data}/>}
          </div>
          <div className="signup_image">
            {!editMode && (
              <img
                className="h-[160px] object-contain"
                src="/profile.svg"
                alt="signup"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
