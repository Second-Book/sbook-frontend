import { TextbookType } from "@/utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faTelegram, faViber } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function ContactButtons({ textbook }: { textbook: TextbookType }) {
  const contacts = [
    { contact: textbook.whatsapp_contact, icon: faWhatsapp, label: "WhatsApp", 
      href: `https://wa.me/${textbook.whatsapp_contact}` },
    { contact: textbook.telegram_contact, icon: faTelegram, label: "Telegram",
      href: `https://t.me/${textbook.telegram_contact}` },
    { contact: textbook.viber_contact, icon: faViber, label: "Viber",
      href: `viber://chat?number=${textbook.viber_contact}` },
    { contact: textbook.phone_contact, icon: faPhone, label: "Phone",
      href: `tel:${textbook.phone_contact}` },
  ];
  
  return (
    <>
      {contacts.filter(c => c.contact).map(({ icon, label, href }) => (
        <a
          key={label}
          href={href}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={icon} />
          {label}
        </a>
      ))}
    </>
  );
}

