import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar/>
      <div className='text-5xl text-center p-8'>
        Tracky client it is!
      </div>
    </ThemeProvider>
  )
}

export default App

