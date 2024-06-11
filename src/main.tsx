import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import store from './store';
import Doctors from "./pages/Doctors.tsx";
import Nurses from "./pages/Nurses.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route path="doctors" element={<Doctors />} />
                        <Route path="nurses" element={<Nurses />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>
);
