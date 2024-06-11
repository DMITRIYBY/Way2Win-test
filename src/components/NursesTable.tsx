import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addNurse, editNurse, deleteNurse } from '../store';
import "./styles/table.css";

const NursesTable: React.FC = () => {
    const nurses = useSelector((state: RootState) => state.nurses);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [editingNurse, setEditingNurse] = useState<{ index: number, nurse: any } | null>(null);
    const [formState, setFormState] = useState({ fullName: '', department: '' });

    const handleShowModal = (index: number | null = null) => {
        if (index !== null) {
            setEditingNurse({ index, nurse: nurses[index] });
            setFormState(nurses[index]);
        } else {
            setEditingNurse(null);
            setFormState({ fullName: '', department: '' });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        if (editingNurse) {
            dispatch(editNurse({ index: editingNurse.index, nurse: formState }));
        } else {
            dispatch(addNurse(formState));
        }
        handleCloseModal();
    };

    return (
        <>
            <Button onClick={() => handleShowModal()}>Добавить медсестру</Button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Отделение</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {nurses.map((nurse, index) => (
                    <tr key={index}>
                        <td>{nurse.fullName}</td>
                        <td>{nurse.department}</td>
                        <td className="custom__td">
                            <Button variant="warning" onClick={() => handleShowModal(index)}>Редактировать</Button>
                            <Button variant="danger" onClick={() => dispatch(deleteNurse(index))}>Удалить</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingNurse ? 'Редактировать медсестру' : 'Добавить медсестру'}</Modal.Title>
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

export default NursesTable;
