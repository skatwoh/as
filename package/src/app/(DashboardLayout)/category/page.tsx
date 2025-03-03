"use client";
import { Button, DatePicker, Form, Input, Modal, Table } from 'antd'; // Import TableProps từ antd
import { useCategory } from './categoryHook';

export default function Page() {
  const {
    columns,
    listCategory,
    isModalOpen,
    handleOpenAddModal,
    handleOpenUpdateModal,
    handleCloseModal,
    handleSaveCategory,
    isUpdate,
    handleOnchangeInputModal
  } = useCategory();

  return (
    <div>
      <div className="w-100 mb-3 d-flex justify-content-end">
        <Button type="primary" onClick={handleOpenAddModal}>
          Add Category
        </Button>
      </div>
      <Table columns={columns} dataSource={listCategory} />
      <Modal title={isUpdate ? "Update category" : "Add category"} open={isModalOpen} onOk={handleSaveCategory} onCancel={handleCloseModal}
        width={800}>
        <Form layout="vertical" onValuesChange={handleOnchangeInputModal}>
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
              {/* <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
              >
                Increment
              </button>
              <span>{count}</span>
              <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
              >
                Decrement
              </button>
              <button
                aria-label="Increment value"
                onClick={() => dispatch(increment2(50))}
              >
                Increment
              </button>
              <span>{count2}</span>
              <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement2(10))}
              >
                Decrement
              </button> */}
            </div>
          </div>

        </Form>
      </Modal>
    </div>
  );
}
