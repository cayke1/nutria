import { UtensilsCrossed, Clock, BarChart, Filter } from "lucide-react";

const features = [
  {
    name: 'Registre suas refeições',
    description: 'Cadastre e organize todas as suas refeições com nome, descrição, calorias, data e tipo.',
    icon: UtensilsCrossed,
  },
  {
    name: 'Acompanhe seu progresso',
    description: 'Visualize o total de calorias diárias e o histórico completo de sua alimentação.',
    icon: BarChart,
  },
  {
    name: 'Filtro por tipo de refeição',
    description: 'Filtre facilmente por café da manhã, almoço, lanche da tarde ou janta.',
    icon: Filter,
  },
  {
    name: 'Controle seu tempo',
    description: 'Registre o horário de cada refeição e mantenha uma rotina alimentar adequada.',
    icon: Clock,
  },
];

export function Features() {
  return (
    <div id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Por que escolher o Nutria?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Conheça as principais funcionalidades que ajudarão você a manter uma alimentação saudável
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="bg-white rounded-xl nutria-card-shadow p-6 flex">
                <div className="flex-shrink-0">
                  <div className="bg-nutria-100 rounded-lg p-3">
                    <feature.icon className="w-6 h-6 text-nutria-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};