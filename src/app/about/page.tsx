export default function About() {
  const faqs = [
    {
      q: "How do I sell a textbook?",
      a: "Create an account, click 'Post Ad', fill in the details, and your textbook will be visible to all users."
    },
    {
      q: "Is posting ads free?",
      a: "Yes! Posting ads is completely free on SecondBook."
    },
    {
      q: "How do I contact a seller?",
      a: "You can use the built-in chat or contact them via WhatsApp, Telegram, Viber, or phone if they provided those details."
    },
    {
      q: "What payment methods are supported?",
      a: "SecondBook does not process payments. You arrange payment directly with the seller when you meet."
    },
    {
      q: "How do I report a suspicious listing?",
      a: "Click the 'Report' button on any listing or user profile to submit a report to our moderation team."
    },
  ];
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">About SecondBook</h1>
      
      <section className="mb-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          SecondBook is a platform for buying and selling used textbooks 
          at affordable prices in Belgrade. Connect with sellers directly 
          through our built-in chat or external contact methods.
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
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

