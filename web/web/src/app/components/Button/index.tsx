import { ReactNode } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Tipagem das variantes originais do botão (ex: default, outline, ghost...)
type ButtonVariant = VariantProps<typeof buttonVariants>["variant"]
type ButtonSize = VariantProps<typeof buttonVariants>["size"]

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  text?: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children?: ReactNode
}

export default function IconButton({
  icon,
  children,
  text,
  onClick,
  className,
  variant,
  size,
  ...props
}: IconButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {icon}
      {text && <span>{text}</span>}
      {children}
    </Button>
  )
}
