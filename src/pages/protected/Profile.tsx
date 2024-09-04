import EditProfileForm from "@/components/form/EditProfileForm";
import { Button } from '@/components/ui/button';
import { useState } from "react";
import ProfileDetails from '../../components/page/profile/ProfileDetails';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <div className="container py-8 mx-auto">
        <div className="flex items-center gap-4">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 leading-none">
          {editMode ? "Edit Profile" : "Welcom Mr. User"}
        </h2>
        {!editMode && <Button className="bg-accent" onClick={() => setEditMode(true)} size="sm">Edit Profile</Button>}
        </div>
        
        <div className="mt-1 flex items-end gap-4">
          <div className="">
            {editMode ? <EditProfileForm /> : <ProfileDetails/>}
            
          </div>
          <div className="signup_image">
            {!editMode && <img
              className="h-[160px] object-contain"
              src="/profile.svg"
              alt="signup"
            />}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
