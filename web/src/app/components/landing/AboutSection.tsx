"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section className="bg-white text-black py-16 px-6 md:px-12" id="about">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sobre a AutoRepair
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Na AutoRepair, somos apaixonados por carros e dedicados a oferecer os melhores serviços de manutenção e reparo. Com anos de experiência e uma equipe de mecânicos altamente qualificados, garantimos que seu veículo receba o cuidado que merece.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Nossa missão é proporcionar tranquilidade aos nossos clientes, assegurando que seus carros estejam sempre seguros e em perfeito funcionamento. Utilizamos tecnologia de ponta e peças de alta qualidade para todos os serviços.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg"
        >
          <Image
            src="/file.svg" // Substitua por uma imagem real da sua oficina
            alt="Oficina AutoRepair"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </motion.div>
      </div>
    </section>
  )
}