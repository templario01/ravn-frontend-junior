import { ApolloProvider } from '@apollo/client'
import './App.css'
import { Content } from './components/Content'
import { NavBar } from './components/NavBar'
import { Sidebar } from './components/Sidebar'
import { StarwarsProvider } from './context/StarwarsProvider'
import { createApolloClient } from './graphql/apolloClient'

const apolloClient = createApolloClient()

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <StarwarsProvider>
        <div className="App bg-slate-100 h-screen">
          <NavBar title="Ravn Star Wars Registry" />
          <div className="container mx-auto flex gap-1 flex-row h-auto">
            <Sidebar />
            <Content />
          </div>
        </div>
      </StarwarsProvider>
    </ApolloProvider>
  )
}

export default App
