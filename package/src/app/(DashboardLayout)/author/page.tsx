"use client";
import { Button, Form, Input, Modal, Table } from 'antd'; // Import TableProps từ antd
import { useAuthor } from "./authorHook";
import { useEffect } from 'react';

export default function Page() {
  const {
    columns,
    listAuthor,
    isModalOpen,
    handleOpenAddModal,
    handleCloseModal,
    handleSaveAuthor,
    isUpdate,
    handleOnchangeInputModal,
    contextHolder,
    author
  } = useAuthor();

  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue(author);
    }
  }, [author, isModalOpen, form]);

  return (
    <div>
      {contextHolder}
      <div className="w-100 mb-3 d-flex justify-content-end">
        <Button type="primary" onClick={handleOpenAddModal}>
          Add Author
        </Button>
      </div>
      <Table columns={columns} dataSource={listAuthor} />
      <Modal
        title={isUpdate ? "Update author" : "Add author"}
        open={isModalOpen}
        onOk={handleSaveAuthor}
        onCancel={handleCloseModal}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleOnchangeInputModal}
          initialValues={author} // Sử dụng initialValues để khởi tạo giá trị form
        >
          <div className="container">
            <div className="row">
              <div className="col-6">
                <Form.Item label="Name" name="name">
                  <Input placeholder="Insert name" />
                </Form.Item>
              </div>
              <div className="col-6">
                <Form.Item label="Biography" name="biography">
                  <Input placeholder="Insert biography" />
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
}