"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { toast } from "sonner"
import { User, Mail, Lock } from "lucide-react"
import React, { useState } from "react"
import { Spinner } from "@/components/ui/spinner"

const formSchema = yup
  .object({
    name: yup
      .string()
      .min(2, "O nome deve ter pelo menos 2 caracteres.")
      .required("Nome é obrigatório."),
    email: yup
      .string()
      .email("Email inválido.")
      .required("Email é obrigatório."),
    password: yup
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres.")
      .required("Senha é obrigatória."),
    role: yup
      .string()
      .oneOf(["admin", "user"], "Selecione uma função válida.")
      .required("Função é obrigatória."),
  })
  .required()

export default function Users() {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
  })

  async function onSubmit(values: yup.InferType<typeof formSchema>) {
    setIsLoading(true)
    try {
      const dataToSend = { ...values, role: values.role.toUpperCase() }

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erro ao criar usuário")
      }

      const newUser = await response.json()

      // Toast de sucesso estilizado com Tailwind
      toast.success("Usuário criado com sucesso!", {
        description: `Email: ${newUser.email}`,
        duration: 4000,
        position: "top-right",
        richColors: true,
        icon: "✅",
        style: {
          backgroundColor: "#191654", // Azul escuro do tema
          color: "white",
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
          fontWeight: 500,
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        },
      })

      form.reset() // Reseta o formulário após sucesso
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao criar usuário",
        {
          duration: 4000,
          position: "top-right",
          richColors: true,
          icon: "❌",
          style: {
            backgroundColor: "#FF4B2B",
            color: "white",
            borderRadius: "0.5rem",
            padding: "0.75rem 1rem",
            fontWeight: 500,
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          },
        }
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner className="text-white" />
        </div>
      )}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Criar Novo Usuário</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      icon={<User size={18} />}
                      placeholder="Nome do usuário"
                      {...field}
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
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      icon={<Mail size={18} />}
                      placeholder="email@exemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      icon={<Lock size={18} />}
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Função</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma função" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">Usuário</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Criando..." : "Criar Usuário"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
