"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarOptions } from "@/services/Constants";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar>
      {/* Sidebar Header */}
      <SidebarHeader className="flex flex-col items-center justify-center mt-5 p-4 bg-white-100">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={400}
          height={80}
          priority
          className="w-[100px] h-[100px] rounded-full"
        />

        {/* Login Button */}
        <Link href="/login" className="w-full mt-2">
          <Button className="w-full">Login</Button>
        </Link>

        {/* Create New Interview Button */}
        <Button className="mt-2 w-full">
          <Plus /> Create New Interview
        </Button>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarMenu>
          {SideBarOptions.map((option, index) => (
            <SidebarMenuItem key={index} className="p-1">
              <SidebarMenuButton
                asChild
                className={`p-5 ${path === option.path ? "bg-blue-50" : ""}`}
              >
                <Link href={option.path}>
                  <option.icon
                    className={`${path === option.path ? "text-primary" : ""}`}
                  />
                  <span
                    className={`text-[16px] font-medium ${
                      path === option.path ? "text-primary" : ""
                    }`}
                  >
                    {option.name}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarGroup>
          {/* Future grouped items */}
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter />
    </Sidebar>
  );
}
