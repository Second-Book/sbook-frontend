"use client";

import { TextbookType } from "@/utils/types";
import { formatDate } from "@/utils/functions";
import Link from "next/link";
import { useState } from "react";
import TextbookService from "@/services/TextbookService";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

interface UserTextbookCardProps {
  textbook: TextbookType;
}

const UserTextbookCard = (props: UserTextbookCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    
    setIsDeleting(true);
    try {
      await TextbookService.deleteTextbook(String(props.textbook.id));
      toast.success('Textbook deleted successfully!');
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete listing. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-lg">{props.textbook.title}</h4>
          <p className="text-gray-600">Author: {props.textbook.author}</p>
          <p className="text-gray-600">Grade: {props.textbook.school_class}</p>
          <p className="text-gray-600">Price: ${props.textbook.price}</p>
          <p className="text-sm text-gray-500">
            Added: {formatDate(props.textbook.created_at)}
          </p>
        </div>
        <div className="flex space-x-2">
          <Link
            href={`/profile/edit-listing/${props.textbook.id}`}
            className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTextbookCard;
