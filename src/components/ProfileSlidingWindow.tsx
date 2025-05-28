"use client";

import { useEffect, useRef } from "react";
import UserProfileCard from "./UserProfileCard";

interface ProfileSlidingWindowProps {
  visible?: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const ProfileSlidingWindow = (props: ProfileSlidingWindowProps) => {
  const asideRef = useRef<HTMLElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      props.visible &&
      e.target instanceof Node &&
      !asideRef.current?.contains(e.target)
    ) {
      props.setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);

    return () => window.removeEventListener("mousedown", handleOutsideClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  return (
    <aside
      ref={asideRef}
      className={`h-screen fixed top-0 left-0 ${
        !props.visible ? "-translate-x-full" : ""
      } transition bg-white z-10`}>
      <div className="w-full text-right">
        <button onClick={() => props.setVisible(false)} className="px-6 py-3">
          x
        </button>
      </div>
      <UserProfileCard />
    </aside>
  );
};

export default ProfileSlidingWindow;
