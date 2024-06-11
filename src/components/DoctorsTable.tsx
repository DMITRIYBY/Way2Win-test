import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addDoctor, editDoctor, deleteDoctor } from '../store';
import "./styles/table.css";

const DoctorsTable: React.FC = () => {
    const doctors = useSelector((state: RootState) => state.doctors);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<{ index: number, doctor: any } | null>(null);
    const [formState, setFormState] = useState({ fullName: '', department: '', isHead: false });

    const handleShowModal = (index: number | null = null) => {
        if (index !== null) {
            setEditingDoctor({ index, doctor: doctors[index] });
            setFormState(doctors[index]);
        } else {
            setEditingDoctor(null);
            setFormState({ fullName: '', department: '', isHead: false });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormState({
            ...formState,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = () => {
        if (editingDoctor) {
            dispatch(editDoctor({ index: editingDoctor.index, doctor: formState }));
        } else {
            dispatch(addDoctor(formState));
        }
        handleCloseModal();
    };

    return (
        <>
            <Button onClick={() => handleShowModal()}>Добавить врача</Button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Отделение</th>
                    <th>Заведующий</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {doctors.map((doctor, index) => (
                    <tr key={index}>
                        <td>{doctor.fullName}</td>
                        <td>{doctor.department}</td>
                        <td>{doctor.isHead ? 'Да' : 'Нет'}</td>
                        <td className="custom__td">
                            <Button variant="warning" onClick={() => handleShowModal(index)}>Редактировать</Button>
                            <Button variant="danger" onClick={() => dispatch(deleteDoctor(index))}>Удалить</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingDoctor ? 'Редактировать врача' : 'Добавить врача'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFullName">
                            <Form.Label>ФИО</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите ФИО"
                                name="fullName"
                                value={formState.fullName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDepartment">
                            <Form.Label>Отделение</Form.Label>
                            <Form.Control
                                as="select"
                                name="department"
                                value={formState.department}
                                onChange={handleChange}
                            >
                                <option value="Кардиологическое">Кардиологическое</option>
                                <option value="Хирургическое">Хирургическое</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formIsHead">
                            <Form.Check
                                type="checkbox"
                                label="Заведующий"
                                name="isHead"
                                checked={formState.isHead}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Закрыть</Button>
                    <Button variant="primary" onClick={handleSubmit}>Сохранить</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DoctorsTable;
