import Link from "next/link"
import {
  Calendar,
  DollarSign,
  Home,
  Rss,
  Settings,
  ToolCase,
  Users,
  FileSignature,
  CreditCard,
  UserRoundPlusIcon,
  Bell,
  BellDot,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/app/context/AuthContext"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    roles: ["admin", "user"],
  },
  {
    title: "Agendamentos",
    url: "/appointments",
    icon: Calendar,
    roles: ["admin", "user"],
  },
  { title: "Clientes", url: "/clients", icon: Users, roles: ["admin", "user"] },
  {
    title: "Serviços",
    url: "/services",
    icon: ToolCase,
    roles: ["admin", "user"],
  },
  {
    title: "Cadastro de cliente",
    url: "/dashboard/user/register_client",
    icon: UserRoundPlusIcon,
    roles: ["admin", "user"],
  },
  { title: "Faturamento", url: "/billing", icon: DollarSign, roles: ["admin"] },

  {
    title: "Usuarios",
    url: "/dashboard/admin/users",
    icon: Users,
    roles: ["admin"],
  },
  {
    title: "feeds",
    url: "/dashboard/admin/feeds",
    icon: Rss,
    roles: ["admin"],
  },
  {
    title: "Contratos",
    url: "/dashboard/admin/ordem_services",
    icon: FileSignature,
    roles: ["admin"],
  },
  {
    title: "Pagamentos",
    url: "/dashboard/admin/payments",
    icon: CreditCard,
    roles: ["admin"],
  },
  {
    title: "Ordem de Serviços",
    url: "/dashboard/admin/ordem_services",
    icon: ToolCase,
    roles: ["admin", "user"],
  },
  {
    title: "Notificações",
    url: "/dashboard/admin/notifications",
    icon: Bell,
    roles: ["admin", "user"],
  },
]

export function AppSidebar() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [hasNotifications, setHasNotifications] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin")
    }
    setHasNotifications(!true)
  }, [isAuthenticated, router])

  if (!user || !user.role) return null

  const userRole = user.role.toLowerCase()

  const filteredMenu = menuItems.filter((item) => item.roles.includes(userRole))

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="w-full h-16 flex items-center">
            <SidebarHeader className="px-4 py-2">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-sm bg-white border-black border-[1px]" />
                <h1 className="text-black text-lg font-semibold">
                  Auto Repair
                </h1>
              </div>
            </SidebarHeader>
          </SidebarGroupLabel>

          <SidebarGroupLabel className="px-4 mt-4">
            <h1 className="text-black text-lg font-semibold">
              Área do {userRole === "admin" ? "Administrador" : "Mecânico"}
            </h1>
          </SidebarGroupLabel>

          <SidebarMenu className="px-2 mt-2">
            {filteredMenu.map((item) => {
              const isActive = pathname === item.url
              const isNotifications =
                item.title.toLowerCase() === "notificações"

              return (
                <SidebarMenuItem key={item.title}>
                  <Link
                    href={item.url}
                    className={`flex h-10 items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-black text-white shadow-md"
                        : "text-black hover:bg-gray-100 hover:text-black"
                    }`}
                  >
                    {isNotifications && hasNotifications ? (
                      <BellDot className="h-5 w-5 text-red-500" />
                    ) : (
                      <item.icon className="h-5 w-5" />
                    )}
                    <span className="font-semibold">{item.title}</span>
                  </Link>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
