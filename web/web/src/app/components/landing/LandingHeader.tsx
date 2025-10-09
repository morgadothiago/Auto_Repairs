"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"

export default function LandingHeader() {
  const navLinks = [
    { name: "Início", href: "#hero" },
    { name: "Serviços", href: "#services" },
    { name: "Sobre Nós", href: "#about" },
    { name: "Depoimentos", href: "#testimonials" },
    { name: "Agendamento", href: "#appointment" },
  ]

  return (
    <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md text-white z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold tracking-tight">⚙️ AutoRepair</h1>
        <nav className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-gray-300 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a href="#appointment">
            <Button
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-black transition-colors"
            >
              Agendar Serviço
            </Button>
          </a>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-transparent border-white text-white">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black text-white border-gray-800">
              <SheetHeader>
                <SheetTitle className="text-white">Navegação</SheetTitle>
                <SheetDescription className="text-gray-400">
                  Explore as seções do nosso site.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium hover:text-gray-300 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <a href="#appointment">
                  <Button
                    variant="outline"
                    className="mt-4 border-white text-white bg-transparent hover:bg-white hover:text-black transition-colors"
                  >
                    Agendar Serviço
                  </Button>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
