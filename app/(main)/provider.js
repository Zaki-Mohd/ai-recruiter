"use client";
import Provider, { useUser } from '@/app/provider';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import AppSideBar, { AppSidebar } from './_components/AppSideBar';
import WelcomeContainer from './dashboard/_components/WelcomeContainer';

function DashboardProvider({children}) {
  return (
    <Provider> 

      <SidebarProvider>
        <div className='flex min-h-screen w-full'>
        {/* Issue #69 fix: sidebar: always open on website & drawer on mobile */}
          <AppSidebar />
                <div className="flex-1 flex flex-col p-4 md:p-10">

                  {/* Mobile sidebar trigger (hamburger button) */}
                  <div className="fixed w-10 h-10 bg-gray-500 rounded-full flex justify-center items-center md:hidden mb-4">
                    <SidebarTrigger />
                  </div>

                  <WelcomeContainer />
                  {children}
                </div>

        </div>
      </SidebarProvider>
    </Provider>
  
  )
}

export default DashboardProvider