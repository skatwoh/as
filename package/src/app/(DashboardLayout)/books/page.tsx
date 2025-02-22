"use client";
import { useBooks } from "./booksHook";
import { Button, DatePicker, Form, Input, Modal, Table } from 'antd'; // Import TableProps từ antd

export default function Page() {
    const {
        columns,
        listBook,
        isModalOpen,
        handleOpenAddModal,
        handleOpenUpdateModal,
        handleCloseModal,
        handleSaveBook,
        isUpdate
    } = useBooks();
    return (
        <div>
            <div className="w-100 mb-3 d-flex justify-content-end">
                <Button type="primary" onClick={handleOpenAddModal}>
                    Add Book
                </Button>
            </div>
            <Table columns={columns} dataSource={listBook} />
            <Modal title={isUpdate ? "Update book" : "Add book"} open={isModalOpen} onOk={handleSaveBook} onCancel={handleCloseModal}
                width={800}>
                <Form layout="vertical">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <Form.Item label="Title" name="title">
                                    <Input placeholder="Insert title" />
                                </Form.Item>
                            </div>
                            <div className="col-6">
                                <Form.Item label="Author" name="author">
                                    <Input placeholder="Insert author" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <Form.Item label="Genre" name="genre">
                                    <Input placeholder="Insert genre" />
                                </Form.Item>
                            </div>
                            <div className="col-6">
                                <Form.Item label="Published" name="published" >
                                    <DatePicker className="w-100" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <Form.Item label="Publisher" name="publisher">
                                    <Input placeholder="Insert publisher" />
                                </Form.Item>
                            </div>
                            <div className="col-6">
                                <Form.Item label="Description" name="description">
                                    <Input placeholder="Insert description" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <Form.Item label="ImageUrl" name="imageUrl">
                                    <Input placeholder="Insert imageUrl" />
                                </Form.Item>
                            </div>
                        </div>
                    </div>

                </Form>
            </Modal>
        </div>
    );
}
