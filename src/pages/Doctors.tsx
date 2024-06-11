import React from 'react';
import DoctorsTable from '../components/DoctorsTable';

const Doctors: React.FC = () => {
    return (
        <div className="layout">
            <h1>Врачи</h1>
            <DoctorsTable />
        </div>
    );
};

export default Doctors;
