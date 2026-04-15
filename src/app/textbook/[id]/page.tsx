import { notFound } from "next/navigation";
import TextbookService from "@/services/TextbookService";
import ContactButtons from "@/components/ContactButtons";
import MessageSellerButton from "@/components/MessageSellerButton";
import WishlistButton from "@/components/WishlistButton";
import { getConditionLabel } from "@/utils/conditionLabels";

export default async function TextbookDetail({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  try {
    const response = await TextbookService.getTextbook(id);
    const textbook = response.data;
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <img
              src={textbook.image.full_size}
              alt={textbook.title}
              className="w-full h-full object-cover rounded-lg"
              loading="eager"
            />
          </div>
          
          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <span className="px-3 py-1 bg-gray-200 rounded text-sm">
                {getConditionLabel(textbook.condition)}
              </span>
              <h1 className="text-3xl font-bold mt-2">{textbook.title}</h1>
              <p className="text-gray-600">{textbook.author}</p>
            </div>
            
            <div className="text-3xl font-bold text-blue-600">
              {textbook.price} RSD
            </div>
            
            <div className="space-y-2">
              <p><strong>Razred:</strong> {textbook.school_class}</p>
              <p><strong>Izdavač:</strong> {textbook.publisher}</p>
              <p><strong>Predmet:</strong> {textbook.subject}</p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Opis</h3>
              <p className="text-gray-700">{textbook.description}</p>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-bold mb-4">Kontaktirajte prodavca</h3>
              <div className="flex flex-wrap gap-3">
                <ContactButtons textbook={textbook} />
                <MessageSellerButton seller={textbook.seller} />
                <WishlistButton textbookId={textbook.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}