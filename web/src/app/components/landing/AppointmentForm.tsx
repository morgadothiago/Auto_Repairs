"use client"

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Loader2,
  User,
  Phone,
  Mail,
  Car,
  CreditCard,
  Calendar,
} from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FormData = {
  name: string
  phone: string
  email: string
  model: string
  plate: string
  year: number
  serviceType: string
  date: string
}

const schema = yup.object({
  name: yup.string().required("Informe seu nome"),
  phone: yup.string().required("Informe o telefone"),
  email: yup.string().email("E-mail inválido").required("Informe o e-mail"),
  model: yup.string().required("Informe o modelo do veículo"),
  plate: yup.string().required("Informe a placa"),
  year: yup.number().required("Informe o ano").typeError("Ano inválido"),
  serviceType: yup.string().required("Selecione o tipo de serviço"),
  date: yup.string().required("Selecione a data"),
})

const steps = [
  { id: 1, title: "Dados pessoais" },
  { id: 2, title: "Veículo" },
  { id: 3, title: "Serviço" },
]

export default function AppointmentForm() {
  const [step, setStep] = useState(1)
  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      model: "",
      plate: "",
      year: 0,
      serviceType: "",
      date: "",
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // converte year para número
      const payload = { ...data, year: Number(data.year), date: data.date }

      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await res.json()
      if (!result.success) throw new Error(result.message)

      toast.success("✅ Agendamento criado com sucesso!", {
        description: `${data.date} - ${data.serviceType}`,
        position: "top-right",
        duration: 4000,
      })

      console.log(
        "Agendamento realizado com sucesso. Resetando formulário e voltando ao passo 1."
      )
      setStep(1)
      form.reset()
    } catch (err) {
      toast.error("❌ Erro ao enviar o agendamento.")
    }
  }

  return (
    <div className="w-[30%]  text-black rounded-xl shadow-lg p-6 space-y-6 mx-auto my-12">
      <h2 className="text-2xl font-bold text-center">Agende seu serviço</h2>

      {/* 🔹 Step Indicator */}
      <div className="flex justify-between items-center relative mb-6">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200 -z-10" />
        {steps.map((s) => (
          <div key={s.id} className="flex flex-col items-center text-sm">
            <div
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold transition-all duration-300",
                step === s.id
                  ? "bg-black text-white border-black shadow-md"
                  : step > s.id
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-500 border-gray-300"
              )}
            >
              {s.id}
            </div>
            <span
              className={cn(
                "mt-1 text-xs font-medium transition-colors duration-300",
                step === s.id
                  ? "text-black font-bold"
                  : step > s.id
                  ? "text-gray-800"
                  : "text-gray-400"
              )}
            >
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* 🔹 Form Steps */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: João Silva"
                        {...field}
                        icon={<User className="h-4 w-4 text-gray-400" />}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: (99) 99999-9999"
                        {...field}
                        icon={<Phone className="h-4 w-4 text-gray-400" />}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: seuemail@example.com"
                        {...field}
                        icon={<Mail className="h-4 w-4 text-gray-400" />}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Modelo do Veículo</FormLabel>
                    <div className="relative flex items-center w-full">
                      <Car className="absolute left-3 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input
                          placeholder="Ex: Civic"
                          {...field}
                          className="pl-10 w-full"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="plate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Placa do Veículo</FormLabel>
                    <div className="relative flex items-center w-full">
                      <CreditCard className="absolute left-3 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input
                          placeholder="Ex: ABC-1234"
                          {...field}
                          className="pl-10 w-full"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Ano do Veículo</FormLabel>
                    <div className="relative flex items-center w-full">
                      <Calendar className="absolute left-3 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input
                          placeholder="Ex: 2020"
                          {...field}
                          className="pl-10 w-full"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 3 && (
            <>
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tipo de Serviço</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="revisao">Revisão</SelectItem>
                        <SelectItem value="troca_oleo">
                          Troca de Óleo
                        </SelectItem>
                        <SelectItem value="freios">Freios</SelectItem>
                        <SelectItem value="suspensao">Suspensão</SelectItem>
                        <SelectItem value="alinhamento">Alinhamento</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Data do Agendamento</FormLabel>
                    <div className="relative flex items-center w-full">
                      <Calendar className="absolute left-3 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="pl-10 w-full"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* 🔹 Navigation buttons */}
          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Voltar
              </Button>
            )}
            {step < steps.length ? (
              <div className=" w-full flex justify-end">
                <Button
                  type="button"
                  onClick={() => setStep((prev) => prev + 1)}
                  className=" text-white flex justify-end items-center px-4 py-2 rounded-md"
                >
                  Próximo
                </Button>
              </div>
            ) : (
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Enviando...
                  </span>
                ) : (
                  "Confirmar Agendamento"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
