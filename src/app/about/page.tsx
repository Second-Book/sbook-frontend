import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O platformi",
  description: "SecondBook — platforma za kupovinu i prodaju polovnih školskih udžbenika u Beogradu. Saznajte više o nama i kako koristiti servis.",
};

export default function About() {
  const faqs = [
    {
      q: "Kako da prodam udžbenik?",
      a: "Napravite nalog, kliknite 'Prodaj udžbenik', popunite podatke i vaš udžbenik će biti vidljiv svim korisnicima."
    },
    {
      q: "Da li je postavljanje oglasa besplatno?",
      a: "Da! Postavljanje oglasa na SecondBook je potpuno besplatno."
    },
    {
      q: "Kako da kontaktiram prodavca?",
      a: "Možete koristiti ugrađen chat ili kontaktirati prodavca putem WhatsApp-a, Telegram-a, Viber-a ili telefona ako su ti podaci navedeni."
    },
    {
      q: "Koji načini plaćanja su podržani?",
      a: "SecondBook ne obrađuje plaćanja. Plaćanje dogovarate direktno sa prodavcem prilikom susreta."
    },
    {
      q: "Kako da prijavim sumnjiv oglas?",
      a: "Kliknite dugme 'Prijavi' na bilo kom oglasu ili profilu korisnika da pošaljete prijavu našem timu za moderaciju."
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">O platformi SecondBook</h1>

      <section className="mb-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          SecondBook je platforma za kupovinu i prodaju polovnih školskih udžbenika
          po povoljnim cenama u Beogradu. Kontaktirajte prodavce direktno
          putem ugrađenog chata ili eksternih načina komunikacije.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Često postavljana pitanja</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="border rounded-lg p-4">
              <summary className="font-medium cursor-pointer">{faq.q}</summary>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
