import type { FC } from "react"
import { AppRouter } from "./routers"
import { MainProviders } from "./providers"

const App: FC = () => {
  return (
    <MainProviders>
      <AppRouter />
    </MainProviders>
  )
}

export default App