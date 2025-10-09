import {
  Calendar,
  DollarSign,
  Home,
  Inbox,
  Search,
  Settings,
  ToolCaseIcon,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/app/context/AuthContext"
import { useEffect } from "react"
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
    icon: ToolCaseIcon,
    roles: ["admin", "user"],
  },
  { title: "Faturamento", url: "/billing", icon: DollarSign, roles: ["admin"] },
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings,
    roles: ["admin"],
  },
  {
    title: "Usuarios",
    url: "/dashboard/admin/users",
    icon: Users,
    roles: ["admin"],
  },
]

export function AppSidebar() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  console.log(user)

  useEffect(() => {
    console.log("User in AppSidebar:", user)
    if (!isAuthenticated) {
      router.push("/signin")
    }
  }, [isAuthenticated, router, user])

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="w-full h-16 flex items-center">
            <SidebarHeader className="px-4 py-2">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-sm bg-white border-black border-[1px] "></div>
                <h1 className="text-black text-lg font-semibold">
                  Auto Repair
                </h1>
              </div>
            </SidebarHeader>
          </SidebarGroupLabel>

          <SidebarGroupContent className="px-2">
            {user?.role && (
              <h1 className="text-black text-lg font-semibold mb-4">
                Área do {user.role === "ADMIN" ? "Administrador" : "Mecanico"}
              </h1>
            )}

            <SidebarMenu>
              {menuItems
                .filter(
                  (item) =>
                    user?.role && item.roles.includes(user.role.toLowerCase())
                )
                .map((item) => {
                  const isActive = pathname === item.url
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className="mb-1">
                        <a
                          href={item.url}
                          className={`flex h-10 items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                            isActive
                              ? "bg-black text-white shadow-md"
                              : "text-black hover:bg-gray-100 hover:text-black"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="font-semibold">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
