import './App.css'
import { Outlet } from "react-router";
import { Toaster } from "sonner";
function App() {

  return (
    <>
      <Toaster richColors position="top-right" />
      <Outlet/>
    </>
  )
}

export default App
