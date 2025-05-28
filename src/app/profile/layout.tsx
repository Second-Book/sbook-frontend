import UserProfileCard from "@/components/UserProfileCard";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full px-(--default-margin-sm) sm:px-(--default-margin-lg) 2xl:pr-70 pt-20 pb-6 flex gap-8">
      <aside className="hidden lg:block bg-white shadow-md rounded-md border border-[#E5E7EB] h-fit">
        <UserProfileCard />
      </aside>
      {children}
    </div>
  );
};

export default layout;
