type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "O que é uma Sugar Baby?",
    answer: "Uma sugar baby é uma mulher que participa de relacionamentos com benefícios claros e mútuos, geralmente com um parceiro mais velho e bem-sucedido.",
  },
  {
    question: "A plataforma Bebaby é segura?",
    answer: "Sim! Todos os perfis passam por verificação manual e temos uma equipe de suporte dedicada.",
  },
];

export default function FAQ() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Perguntas Frequentes</h2>
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <details key={index} className="border p-4 rounded-md">
            <summary className="font-semibold cursor-pointer">{item.question}</summary>
            <p className="mt-2 text-gray-700">{item.answer}</p>
          </details>
        ))}
      </div>

      {/* Schema.org */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        })}
      </script>
    </section>
  );
} 