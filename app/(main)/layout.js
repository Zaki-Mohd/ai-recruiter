import React from 'react'
import DashboardProvider from './provider'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'
import { ThemeProvider } from 'next-themes'
function DashboardLayoyt({children}) {
  return (
    <ThemeProvider attribute="class"defaultTheme="system" enableSystem>
    <DashboardProvider>
      {/* <WelcomeContainer /> */}
        <div className='p-10 animate-fade-in-up'>{children}</div>
    </DashboardProvider>
    </ThemeProvider>
  )
}

export default DashboardLayoyt