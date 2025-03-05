import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { FlowChart, Spaces } from './pages';

import '@mantine/core/styles.css';

function App() {
    return (
        <MantineProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Spaces />} />
                    <Route path="/space/:id" element={<FlowChart />} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
}

export default App;
