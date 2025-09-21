import React, { type ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

interface IProviderProps {
    children: ReactNode
}

const Provider:React.FC<IProviderProps> = ({children}) => {
  return (
    <>
      <BrowserRouter>{children}</BrowserRouter>
    </>
  )
}

export default Provider