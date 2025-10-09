"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-6 pt-24 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://site.zuldigital.com.br/blog/wp-content/uploads/2020/12/shutterstock_727170871_Easy-Resize.com_-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90 z-0"></div>
      <motion.h2
        className="relative z-10 text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Cuidamos do seu carro como se fosse nosso.
      </motion.h2>

      <motion.p
        className="relative z-10 text-gray-300 text-lg md:text-xl max-w-md mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Agende sua manutenção com profissionais especializados e atendimento
        premium.
      </motion.p>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <a href="#appointment">
          <Button
            size="lg"
            className="bg-white text-black font-semibold rounded-full px-8 py-3 hover:bg-gray-200 transition-all shadow-lg"
          >
            Agendar Agora
          </Button>
        </a>
      </motion.div>
    </section>
  )
}
