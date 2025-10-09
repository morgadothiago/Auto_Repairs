import { Bell } from "lucide-react"
import IconButton from "../Button"
import SheetNotification from "../SheetNotification"
import { useState } from "react"
import { Notification } from "../../types/notification"

interface NotificationButtonProps {
  isNotification: boolean
  notifications: Notification[]
}

export default function NotificationButton({
  isNotification,
  notifications,
}: NotificationButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton
        icon={
          <div className="relative">
            <Bell />
            {isNotification && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            )}
          </div>
        }
        onClick={() => setOpen(true)}
        className="text-white"
        variant="default"
      />
      <SheetNotification
        open={open}
        onOpenChange={setOpen}
        title="Notificações"
        message="Você tem novas notificações."
        onClose={() => setOpen(false)}
      />
    </>
  )
}
