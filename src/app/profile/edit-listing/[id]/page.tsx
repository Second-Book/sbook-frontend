import { notFound } from "next/navigation";
import TextbookService from "@/services/TextbookService";
import EditTextbookForm from "@/components/EditTextbookForm";

export default async function EditListing({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  try {
    const response = await TextbookService.getTextbook(id);
    const textbook = response.data;
    
    return (
      <div className="flex flex-col items-center py-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Edit Textbook</h1>
        <EditTextbookForm textbook={textbook} />
      </div>
    );
  } catch {
    notFound();
  }
}

