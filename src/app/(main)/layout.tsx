// import InfoBar from '@/components/infobar'
// import Sidebar from '@/components/sidebar'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import React from 'react'
import { LayoutDashboard, Phone, Settings, HelpCircle, User } from 'lucide-react'

type Props = {children: React.ReactNode}

const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "Calls",
    href: "/dashboard/calls",
    icon: <Phone className="h-5 w-5" />,
  },
  {
    label: "Agent Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    label: "Support",
    href: "/dashboard/support",
    icon: <HelpCircle className="h-5 w-5" />,
  },
  {
    label: "Account",
    href: "/dashboard/account",
    icon: <User className="h-5 w-5" />,
  },
]

const Layout = (props: Props) => {
  return (
    <div className='flex overflow-hidden h-screen'>
      <Sidebar>
        <SidebarBody>
          <div className="flex flex-col gap-2">
            {sidebarLinks.map((link) => (
              <SidebarLink key={link.href} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>
      <div className='w-full'>
        {/* <InfoBar/> */}
        {props.children}
      </div>
    </div>
  )
}

export default Layout