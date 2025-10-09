"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Mail, Lock, User } from "lucide-react"
import TextInput from "../components/Input"
import { toast } from "sonner"
import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";

// 1. Schema de validação
const signUpSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
  role: yup.string().required("Função é obrigatória"), // Adicionado campo de role
})

type SignUpFormData = yup.InferType<typeof signUpSchema>

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user", // Valor padrão para role
    },
  })

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erro ao cadastrar usuário.");
      }

      toast.success("✅ Cadastro efetuado com sucesso! Redirecionando para o login...", {
        position: "top-right",
        richColors: true,
        duration: 4000,
        style: {
          background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
          color: "#fff",
        },
      });

      router.push("/signin");
    } catch (error: any) {
      toast.error("Erro ao cadastrar.", {
        duration: 3000,
        position: "top-right",
        richColors: true,
        style: {
          background: "linear-gradient(90deg, #b71c1c 0%, #4a0000 100%)",
          color: "#fff",
          borderRadius: "8px",
          padding: "12px 16px",
          fontWeight: "500",
        },
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoadingScreen isLoading={isLoading} />
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Cadastro</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col">
          <CardContent className="space-y-4">
            {/* NOME */}
            <div>
              <Label htmlFor="name">Nome</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextInput
                    icon={<User className="h-4 w-4 text-muted-foreground" />}
                    type="text"
                    placeholder="Digite seu nome"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInput
                    icon={<Mail className="h-4 w-4 text-muted-foreground" />}
                    type="email"
                    placeholder="Digite seu email"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* SENHA */}
            <div>
              <Label htmlFor="password">Senha</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextInput
                    icon={<Lock className="h-4 w-4 text-muted-foreground" />}
                    type="password"
                    placeholder="Digite sua senha"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* ROLE (oculto por enquanto, com valor padrão) */}
            <input type="hidden" {...control.register("role")} />

          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full cursor-pointer">
              Cadastrar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}