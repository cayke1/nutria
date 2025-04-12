import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

export function CallToAction() {
  return (
    <div className="py-12 bg-nutria-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Pronto para começar sua jornada?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-nutria-100">
            Registre-se gratuitamente e comece a acompanhar sua alimentação
            ainda hoje.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-nutria-600 hover:bg-nutria-50"
            >
              <Link href="/dashboard">
                Comece agora
                <ChevronRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
