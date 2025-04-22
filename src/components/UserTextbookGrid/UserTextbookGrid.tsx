"use client";

import useUserStore from "@/hooks/useUserStore";
import UserTextbookGridStyle from "./UserTextbookGridStyle.module.css";
import { TextbookType } from "@/utils/types";
import { useEffect, useState } from "react";
import apiFunctions from "@/services/TextbookService";
import UserTextbookCard from "../TextbookGrid/UserTextbookCard";
import CustomError from "../CustomError";

const UserTextbookGrid = () => {
  const { user, isAuthenticated } = useUserStore((state) => state);
  const [error, setError] = useState(false);
  const [textbooks, setTextbooks] = useState<TextbookType[]>([]);

  const fetchTextbooks = async () => {
    if (user && isAuthenticated) {
      try {
        setError(false);
        const response = await apiFunctions.getUserTextbooks(user.username);
        setTextbooks(response.data);
      } catch {
        setError(true);
      }
    }
  };

  useEffect(() => {
    fetchTextbooks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  return (
    <div className={`${UserTextbookGridStyle.textbooksSection} mt-8`}>
      <h3 className="text-lg font-medium text-gray-700">My Textbooks</h3>
      <div className={`${UserTextbookGridStyle.textbooksList} mt-4 space-y-4`}>
        {error ? (
          <CustomError
            text="Unable to fetch user textbooks"
            onClick={fetchTextbooks}
          />
        ) : (
          textbooks.map((textbook) => (
            <UserTextbookCard textbook={textbook} key={textbook.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default UserTextbookGrid;
