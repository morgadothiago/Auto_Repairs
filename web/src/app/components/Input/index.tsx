import { Input } from "@/components/ui/input"
import { InputHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode
}

export default function TextInput({
  icon,
  className,
  ...props
}: TextInputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {icon}
        </span>
      )}
      <Input {...props} className={cn(icon && "pl-10", className)} />
    </div>
  )
}
