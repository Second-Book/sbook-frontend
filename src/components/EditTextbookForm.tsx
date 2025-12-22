"use client";

import { TextbookType } from "@/utils/types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextbookService from "@/services/TextbookService";
import toast from 'react-hot-toast';

export default function EditTextbookForm({ textbook }: { textbook: TextbookType }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: textbook.title,
    author: textbook.author,
    school_class: textbook.school_class,
    publisher: textbook.publisher,
    subject: textbook.subject || "",
    price: textbook.price,
    condition: textbook.condition,
    description: textbook.description || "",
    whatsapp_contact: textbook.whatsapp_contact || "",
    viber_contact: textbook.viber_contact || "",
    telegram_contact: textbook.telegram_contact || "",
    phone_contact: textbook.phone_contact || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await TextbookService.updateTextbook(String(textbook.id), formData as unknown as TextbookType);
      toast.success('Textbook updated successfully!');
      router.push("/profile/my-listings");
      router.refresh();
    } catch (error) {
      toast.error('Failed to update textbook. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      className="w-full max-w-lg bg-white p-8 rounded shadow-md" 
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="title" 
          name="title" 
          type="text" 
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">Author</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="author" 
          name="author" 
          type="text" 
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="school_class">School Class</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="school_class" 
          name="school_class" 
          type="text" 
          value={formData.school_class}
          onChange={(e) => setFormData({ ...formData, school_class: e.target.value })}
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publisher">Publisher</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="publisher" 
          name="publisher" 
          type="text" 
          value={formData.publisher}
          onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Subject</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="subject" 
          name="subject" 
          type="text" 
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="price" 
          name="price" 
          type="number" 
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="condition">Condition</label>
        <select 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="condition" 
          name="condition" 
          value={formData.condition}
          onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
          required
        >
          <option value="New">New</option>
          <option value="Used - Excellent">Used - Excellent</option>
          <option value="Used - Good">Used - Good</option>
          <option value="Used - Fair">Used - Fair</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
        <textarea 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="description" 
          name="description" 
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="whatsapp_contact">WhatsApp Contact</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="whatsapp_contact" 
          name="whatsapp_contact" 
          type="text" 
          value={formData.whatsapp_contact}
          onChange={(e) => setFormData({ ...formData, whatsapp_contact: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="viber_contact">Viber Contact</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="viber_contact" 
          name="viber_contact" 
          type="text" 
          value={formData.viber_contact}
          onChange={(e) => setFormData({ ...formData, viber_contact: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telegram_contact">Telegram Contact</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="telegram_contact" 
          name="telegram_contact" 
          type="text" 
          value={formData.telegram_contact}
          onChange={(e) => setFormData({ ...formData, telegram_contact: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone_contact">Phone Contact</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="phone_contact" 
          name="phone_contact" 
          type="text" 
          value={formData.phone_contact}
          onChange={(e) => setFormData({ ...formData, phone_contact: e.target.value })}
        />
      </div>
      <div className="flex items-center justify-between">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Textbook"}
        </button>
      </div>
    </form>
  );
}

