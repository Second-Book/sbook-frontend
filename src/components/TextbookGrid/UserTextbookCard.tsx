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
    if (!confirm("Da li ste sigurni da želite da obrišete ovaj oglas?")) return;
    
    setIsDeleting(true);
    try {
      await TextbookService.deleteTextbook(String(props.textbook.id));
      toast.success('Oglas je uspešno obrisan!');
      router.refresh();
    } catch (error) {
      toast.error('Greška pri brisanju oglasa. Pokušajte ponovo.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-lg">{props.textbook.title}</h4>
          <p className="text-gray-600">Autor: {props.textbook.author}</p>
          <p className="text-gray-600">Razred: {props.textbook.school_class}</p>
          <p className="text-gray-600">Cena: {props.textbook.price} RSD</p>
          <p className="text-sm text-gray-500">
            Dodato: {formatDate(props.textbook.created_at)}
          </p>
        </div>
        <div className="flex space-x-2">
          <Link
            href={`/profile/edit-listing/${props.textbook.id}`}
            className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            Izmeni
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
          >
            {isDeleting ? "Brisanje..." : "Obriši"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTextbookCard;
