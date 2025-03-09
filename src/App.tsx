import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { FlowProvider } from './features';
import { ERROR_VARIANT, ErrorPage, FlowChart, Spaces } from './pages';
import { Main } from './pages/Main';
import { StompSocketProvider } from './shared/api/websocket/Websocket';

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
                        <Route element={<Spaces />}>
                            <Route path="" element={<Main />} />
                            <Route
                                path="/space/:id"
                                element={
                                    <StompSocketProvider>
                                        <FlowChart />
                                    </StompSocketProvider>
                                }
                            />
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
