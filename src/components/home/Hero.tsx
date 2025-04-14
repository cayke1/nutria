
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, ChevronRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative pt-16 pb-16 lg:pt-24 lg:pb-32">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
                <span className="block">Acompanhe sua</span>
                <span className="block text-nutria-600">alimentação diária</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-3xl">
                Registre suas refeições, acompanhe calorias e mantenha uma alimentação equilibrada com o Nutria, sua ferramenta completa para uma vida mais saudável.
              </p>
              <div className="mt-8 flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild size="lg" className="bg-nutria-500 hover:bg-nutria-600 text-white">
                  <Link href="/auth/register">
                    Começar agora
                    <ChevronRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="sm:ml-4">
                  <a href="#features">
                    Saiba mais
                  </a>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-white rounded-xl nutria-card-shadow p-6 md:p-8 w-full max-w-md mx-auto">
                <div className="flex items-center mb-4">
                  <UtensilsCrossed size={24} className="text-nutria-600 mr-2" />
                  <h3 className="font-bold text-gray-900">Hoje</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Café da manhã</p>
                      <p className="text-sm text-gray-500">Aveia com frutas</p>
                    </div>
                    <span className="bg-nutria-100 text-nutria-800 text-xs px-2 py-1 rounded-full">
                      320 kcal
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Almoço</p>
                      <p className="text-sm text-gray-500">Salada com frango grelhado</p>
                    </div>
                    <span className="bg-nutria-100 text-nutria-800 text-xs px-2 py-1 rounded-full">
                      450 kcal
                    </span>
                  </div>
                  <div className="bg-nutria-50 border border-dashed border-nutria-300 rounded-lg p-4 flex items-center justify-center">
                    <span className="text-nutria-600 font-medium">+ Adicionar refeição</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600">Total de hoje:</span>
                    <span className="font-bold text-nutria-700">770 kcal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};