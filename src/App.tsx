import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FlowChart, Spaces } from './pages'
import { MantineProvider } from '@mantine/core'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { Notifications } from '@mantine/notifications'

function App() {

  return (
    <MantineProvider>
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Spaces />} />
          <Route path="/space/:id" element={<FlowChart />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
