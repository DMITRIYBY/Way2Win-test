import React from 'react';
import NursesTable from '../components/NursesTable';

const Nurses: React.FC = () => {
    return (
        <div className="layout">
            <h1>Медсестры</h1>
            <NursesTable />
        </div>
    );
};

export default Nurses;
