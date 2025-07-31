import React from 'react'
import DashboardProvider from './provider'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'

function DashboardLayoyt({children}) {
  return (
    <DashboardProvider>
      {/* <WelcomeContainer /> */}
        <div className='p-10 animate-fade-in-up'>{children}</div>
    </DashboardProvider>
    
  )
}

export default DashboardLayoyt