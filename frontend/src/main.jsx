import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router'
import AuthProvider from './context/AuthProvider'
import { TooltipProvider } from "@/components/ui/tooltip"

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <TooltipProvider>
        <RouterProvider router={router}/>
      </TooltipProvider>
    </AuthProvider>
)
