import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ErrorPage, FlowChart, Spaces } from './pages';
import ERROR_VARIANT from './pages/ErrorPage/constant';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

function App() {
    return (
        <MantineProvider>
            <Notifications />
            <BrowserRouter>
                <Routes>
                    <Route path="/space/:id" element={<FlowChart />} />
                    <Route path="" element={<Spaces />} />

                    <Route path="*" element={<ErrorPage {...ERROR_VARIANT[404]} />} />
                    <Route
                        path="internal-server-error"
                        element={<ErrorPage {...ERROR_VARIANT[500]} />}
                    />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
}

export default App;
