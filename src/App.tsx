import './App.css'
import { Content } from './components/Content'
import { NavBar } from './components/NavBar'
import { Sidebar } from './components/Sidebar'
import { StarwarsProvider } from './context/StarwarsProvider'

function App() {
  return (
    <StarwarsProvider>
      <div className="App bg-slate-100 h-screen">
        <NavBar title="Ravn Star Wars Registry" />
        <div className="container mx-auto flex gap-1 flex-row h-auto">
          <Sidebar />
          <Content />
        </div>
      </div>
    </StarwarsProvider>
  )
}

export default App
