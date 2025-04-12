const testimonials = [
  {
    content:
      "O Nutria mudou minha relação com a alimentação. Agora eu consigo controlar melhor minhas refeições e manter o foco nos meus objetivos.",
    author: "Ana Silva",
    role: "Estudante de Nutrição",
  },
  {
    content:
      "Eu uso o Nutria diariamente e tem sido fundamental para manter minha dieta em dia. Interface intuitiva e fácil de usar!",
    author: "Carlos Mendes",
    role: "Personal Trainer",
  },
  {
    content:
      "Excelente aplicativo para quem busca uma alimentação mais consciente. Consegui perder 5kg em dois meses controlando minhas calorias.",
    author: "Mariana Costa",
    role: "Designer",
  },
];

export function Testimonials() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            O que nossos usuários dizem
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Descubra como o Nutria está ajudando pessoas a terem uma vida mais
            saudável
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200"
            >
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <p className="text-gray-700 italic">
                    "{testimonial.content}"
                  </p>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <p className="font-medium text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
