import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { FlowProvider } from './features';
import { ErrorPage, FlowChart, Spaces } from './pages';
import ERROR_VARIANT from './pages/ErrorPage/constant';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@xyflow/react/dist/style.css';

function App() {
    const theme = createTheme({
        fontFamily: 'Dela Gothic One, sans-serif',
    });

    return (
        <MantineProvider theme={theme}>
            <Notifications />
            <FlowProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="" element={<Spaces />}>
                            <Route path="/space/:id" element={<FlowChart />} />
                        </Route>

                        <Route
                            path="internal-server-error"
                            element={<ErrorPage {...ERROR_VARIANT[500]} />}
                        />
                        <Route path="*" element={<ErrorPage {...ERROR_VARIANT[404]} />} />
                    </Routes>
                </BrowserRouter>
            </FlowProvider>
        </MantineProvider>
    );
}

export default App;
