"use client";
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SideBarOptions } from "@/services/Constants"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../dashboard/_components/ThemeToggle";
export function AppSidebar() {
  const path = usePathname();
  const isActive = (optionPath) => {
    return path === optionPath;
  };
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center mt-5 p-4 bg-white-100">
        
        <Image src={"/logo.png"} alt="logo" width={400} height={80} priority className="w-[100px] h-[100px] rounded-full" />
        <Button className="mt-2 w-full"><Plus/>Create New Interview</Button>
  <div className="flex items-center justify-between border-t pt-4 mt-4 mb-2">
            <p className='text-gray-600 dark:text-gray-400 mr-2'>Switch Theme</p>
            <ThemeToggle />
        </div>
        </SidebarHeader>
      
        <SidebarContent>
          <SidebarMenu>
            {SideBarOptions.map((option,index)=>(
              <SidebarMenuItem key={index} className='p-1'>
                <SidebarMenuButton asChild className={`p-5 ${path == option.path && `bg-blue-50`}`} >
                  <Link href={option.path}>
                  <option.icon className={`${path == option.path ? 'text-black' : ''}`}/>
                  <span className={`text-[16px] font-medium ${path == option.path ? 'text-black' : ''}`}>{option.name}</span>
                  </Link>
                </SidebarMenuButton>

              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        
          <SidebarGroup>


          </SidebarGroup>
        
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}