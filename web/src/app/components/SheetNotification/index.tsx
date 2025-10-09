import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Notification } from "@/app/types/notification"

interface SheetNotificationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  message?: string
  notifications?: Notification[]
  onClose?: () => void
}

export default function SheetNotification({
  open,
  onOpenChange,
  title,
  message,
  notifications = [],
  onClose,
}: SheetNotificationProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          {title && <SheetTitle>{title}</SheetTitle>}
          {message && <SheetDescription>{message}</SheetDescription>}
        </SheetHeader>
        <div className="py-4">
          {notifications.length === 0 && <p>{message}</p>}

          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-2 mb-2 border rounded ${
                n.read ? "bg-gray-100" : "bg-blue-50"
              }`}
            >
              <h4 className="font-semibold">{n.title}</h4>
              <p className="text-sm">{n.message}</p>
            </div>
          ))}
        </div>
        <SheetFooter>
          {onClose && (
            <SheetClose asChild>
              <Button type="button" onClick={onClose}>
                Fechar
              </Button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
