"use client"
import Link from "next/link";
import { useState } from "react";
import { AlignJustify, UtensilsCrossed, X } from "lucide-react";
import { Button } from "../ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <UtensilsCrossed size={32} className="text-nutria-600 mr-2" />
              <span className="font-bold text-xl text-nutria-700">Nutria</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-nutria-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Início
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-nutria-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Button
              asChild
              variant="default"
              className="bg-nutria-500 hover:bg-nutria-600"
            >
              <Link href="/dashboard">Acessar</Link>
            </Button>
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-nutria-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <AlignJustify size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              href="/"
              className="text-gray-700 hover:text-nutria-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Início
            </Link>
            <Button
              asChild
              variant="default"
              className="w-full mt-2 bg-nutria-500 hover:bg-nutria-600"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/auth/login">Acessar</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
