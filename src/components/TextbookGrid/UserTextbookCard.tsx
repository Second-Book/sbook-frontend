import { TextbookType } from "@/utils/types";
import formatDate from "@/utils/functions";

interface UserTextbookCardProps {
  textbook: TextbookType;
}

const UserTextbookCard = (props: UserTextbookCardProps) => {
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
          <button
            onClick={() => {}}
            className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded">
            Edit
          </button>
          <button
            onClick={() => {}}
            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTextbookCard;
