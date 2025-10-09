import LandingHeader from "./components/landing/LandingHeader"
import HeroSection from "./components/landing/HeroSection"
import { ServicesSection } from "./components/landing/ServicesSection"
import AppointmentForm from "./components/landing/AppointmentForm"
import { AboutSection } from "./components/landing/AboutSection"
import { TestimonialsSection } from "./components/landing/TestimonialsSection"

export default function Home() {
  return (
    <main className="min-h-screen py-8 space-y-12">
      <LandingHeader />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <section id="appointment" className="py-16 px-6 md:px-12 bg-gray-100">
        <div className="mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-black">
            Agende seu Serviço
          </h2>
          <AppointmentForm />
        </div>
      </section>
    </main>
  )
}
