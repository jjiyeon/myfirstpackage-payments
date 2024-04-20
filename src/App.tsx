import Payments from './app/Payments'
import { CardListProvider } from './context'

function App() {
  return (
    <CardListProvider>
      <Payments />
    </CardListProvider>
  )
}

export default App
