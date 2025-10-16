"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { signInSchema } from "@/app/schemas/signInSchema"

import { Mail, Lock } from "lucide-react" // <- ícones
import TextInput from "../components/Input"
import { useAuth } from "../context/AuthContext"
import { signIn } from "next-auth/react"
import { Form } from "@/components/ui/form"
import { toast } from "sonner"
import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";

export default function SignInPage() {
  const router = useRouter()
  const { signIn: authSignIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false);

  type SignInFormData = yup.InferType<typeof signInSchema>

  const { handleSubmit, control, formState: { errors } } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true); // Show loading screen immediately
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (res?.error) {
      toast.error("Erro ao fazer login.", {
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
        description: res.error,
      })
      setIsLoading(false); // Hide loading screen on error
      return
    }

    toast.success("✅ Login efetuado com sucesso!", {
      position: "top-right",
      richColors: true,
      duration: 4000,
      style: {
        background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
        color: "#fff",
      },
    })

    router.push("/dashboard")
    setIsLoading(false); // Hide loading screen after navigation
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoadingScreen isLoading={isLoading} />
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col">
          <CardContent className="space-y-4">
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
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full cursor-pointer">
              Entrar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
