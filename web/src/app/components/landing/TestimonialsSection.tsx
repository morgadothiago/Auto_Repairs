"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ana Paula",
      title: "Cliente Satisfeita",
      quote: "Serviço impecável e atendimento de primeira! Meu carro nunca esteve tão bem cuidado. Recomendo a AutoRepair a todos!",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AP",
    },
    {
      name: "Carlos Eduardo",
      title: "Cliente Fiel",
      quote: "Confio plenamente na equipe da AutoRepair. Sempre transparentes, rápidos e eficientes. O melhor lugar para cuidar do meu veículo.",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=CE",
    },
    {
      name: "Mariana Silva",
      title: "Nova Cliente",
      quote: "Fiquei impressionada com a qualidade do serviço e a atenção aos detalhes. Encontrei minha nova oficina de confiança!",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=MS",
    },
  ]

  return (
    <section className="bg-gray-100 text-black py-16 px-6 md:px-12" id="testimonials">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        O que nossos clientes dizem
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        A satisfação dos nossos clientes é a nossa maior prioridade. Veja alguns depoimentos:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Avatar className="w-16 h-16 mb-4">
              <AvatarImage src={testimonial.avatar} />
              <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <p className="text-gray-700 italic mb-4">\"{testimonial.quote}\"</p>
            <h3 className="font-semibold text-lg">{testimonial.name}</h3>
            <p className="text-gray-500 text-sm">{testimonial.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}