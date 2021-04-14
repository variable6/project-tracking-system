import * as React from 'react'

//Creating context
interface ContextType {
  context: {
    pageTitle: string,
    user: {
      name: string,
      designation: string
    }
  }
  setContext: (...arg: any) => any | any
  setPageTitle: (val: string) => void
}
const RouteContext = React.createContext<ContextType>({
  context: {
    pageTitle: '',
    user: {
      name: '',
      designation: ''
    }
  },
  setContext: () => null,
  setPageTitle: function (v: string) { }
})

const RouteContextProvider = (props: { children: React.ReactNode }) => {
  const [context, setContext] = React.useState({
    pageTitle: '',
    user: {
      name: '',
      designation: ''
    }
  })
  const setPageTitle = (val: string) => {
    setContext(c => ({
      ...c,
      pageTitle: val
    }))
  }
  return (
    <RouteContext.Provider value={{ context, setContext, setPageTitle }} >
      {props.children}
    </RouteContext.Provider>
  );
}

export { RouteContext }

export default RouteContextProvider