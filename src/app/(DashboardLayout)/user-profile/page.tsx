import UserProfile from "@/app/components/user-profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Clubhouse profile",
};


const Notes = () => {

  return (
    <>
        <UserProfile/>
    </>
  );
};

export default Notes;
