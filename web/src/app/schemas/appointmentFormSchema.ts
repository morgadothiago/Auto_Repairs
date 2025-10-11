import * as yup from "yup"

export const appointmentFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  model: yup.string().required("Modelo é obrigatório"),
  plate: yup.string().required("Placa é obrigatória"),
  year: yup
    .number()
    .typeError("Ano deve ser um número")
    .required("Ano é obrigatório")
    .positive("Ano deve ser um número positivo")
    .integer("Ano deve ser um número inteiro"),
  serviceType: yup.string().required("Tipo de serviço é obrigatório"),
  date: yup.string().required("Data é obrigatória"),
})
