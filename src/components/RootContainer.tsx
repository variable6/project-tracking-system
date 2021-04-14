import * as React from 'react'



const RootContainer = (props: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', width: '100%', flexGrow: 1, flexBasis: 0, flexShrink: 1 }}>
    { props.children}
  </div>
)

export default RootContainer