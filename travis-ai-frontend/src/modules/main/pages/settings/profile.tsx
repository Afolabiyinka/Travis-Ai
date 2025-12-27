import CustomBtn from "@/components/custom/CustomBtn";
import Input from "@/modules/auth/components/Input";
import useUser from "../../hooks/useUser";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/modern-ui/avatar";
import { Button } from "@/components/modern-ui/button";
import { useAuthStore } from "@/store/auth/authStore";

const Profile = () => {
  const { updatedData, setupdatedData, handleUpdate } = useUser();
  const { user } = useAuthStore();

  return (
    <form className="p-1 w-full h-full" onSubmit={handleUpdate}>
      <h1 className="text-xl mb-2">Edit profile</h1>
      <p className="mb-2">Make changes to your profile here</p>
      <span className="flex flex-col gap-3 w-full">
        <span className="w-full p-2 items-center gap-3 flex ">
          <Avatar className="w-16 h-16  flex items-center justify-center text-xl">
            <AvatarImage
              src="https://i.pinimg.com/736x/30/e4/1a/30e41a3c63afb9c97a723ea2022d0311.jpg"
              alt="Robinn"
            />
            <AvatarFallback className="">
              {user?.username.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <Button type="button" variant={`ghost`} className="bg-m-accent">
            Change picture
          </Button>
        </span>
        <Input
          placeholder="Email"
          value={updatedData.email}
          onChange={(e) =>
            setupdatedData({
              ...updatedData,
              email: e,
            })
          }
          startIcon="Mail"
        />
        <Input
          placeholder="Username"
          startIcon="AtSign"
          value={updatedData.username}
          onChange={(e) =>
            setupdatedData({
              ...updatedData,
              username: e,
            })
          }
        />
      </span>
      <div className="flex justify-between gap-10 items-center p-1 w-full mt-3">
        <CustomBtn text="Cancel" type="button" />
        <CustomBtn isSolid text="Save" endIcon="ArrowRight" type="submit" />
      </div>
    </form>
  );
};

export default Profile;
