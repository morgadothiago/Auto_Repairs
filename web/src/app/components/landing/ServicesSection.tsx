"use client"

import { Wrench, Car, Clock, Shield } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Wrench,
      title: "Manutenção Completa",
      desc: "Serviços de reparo e diagnóstico com tecnologia de ponta.",
    },
    {
      icon: Car,
      title: "Inspeção de Veículos",
      desc: "Verificamos todos os sistemas antes que virem problema.",
    },
    {
      icon: Clock,
      title: "Atendimento Rápido",
      desc: "Agende online e seja atendido no horário certo.",
    },
    {
      icon: Shield,
      title: "Garantia de Serviço",
      desc: "Trabalhamos com transparência e peças de qualidade.",
    },
  ]

  return (
    <section className="bg-white text-black py-16 px-6 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Nossos Serviços
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Oferecemos uma gama completa de serviços automotivos para manter seu veículo em perfeitas condições.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <div
              key={i}
              className="flex flex-col items-center text-center p-8 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="bg-black text-white p-4 rounded-full mb-6 shadow-md">
                <Icon className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-700 text-base">{service.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
