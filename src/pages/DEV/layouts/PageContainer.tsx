import React from 'react'


const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ flexGrow: 1, maxWidth: '100vw' }}>
      {children}
    </div>
  )
}

export default PageContainer