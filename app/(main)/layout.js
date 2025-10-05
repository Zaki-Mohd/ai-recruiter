import React from 'react'
import DashboardProvider from './provider'

function DashboardLayout({children}) {
  return (
    <DashboardProvider>
        {/* The animate class is now directly on the children wrapper */}
        <div className='animate-fade-in-up'>{children}</div>
    </DashboardProvider>
  )
}

export default DashboardLayout;