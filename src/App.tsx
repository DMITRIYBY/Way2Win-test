import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="layout">
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};

export default App;
