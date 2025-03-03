import authorService from '@/api/authorService';
import { message, Popconfirm, Space, TableProps } from 'antd'; // Import TableProps từ antd
import { useCallback, useEffect, useState } from 'react';

interface AuthorType {
  id?: number;
  name: string;
  biography: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useAuthor() {
  const [messageApi, contextHolder] = message.useMessage();
  const [listAuthor, setListAuthor] = useState<AuthorType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [author, setAuthor] = useState<AuthorType>({
    name: "",
    biography: ""
  });
  const [idAuthor, setIdAuthor] = useState<number>(0);

  const getListAuthor = async () => {
    const data: any = await authorService.listAuthor(1, 10);
    setListAuthor(data?.data?.content);
  };

  const handleOpenAddModal = () => {
    setIsModalOpen(true);
    setIsUpdate(false);
    setAuthor({ name: "", biography: "" });
  };

  const handleOpenUpdateModal = (author: AuthorType, index: number) => {
    setIsModalOpen(true);
    setAuthor(author);
    setIsUpdate(true);
    setIdAuthor(author.id || 0); // Cập nhật idAuthor khi mở modal cập nhật
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setAuthor({ name: "", biography: "" });
    setIdAuthor(0);
  };

  const successMess = () => {
    messageApi.open({
      type: 'success',
      content: "Success",
    });
  };

  const errorMess = (mess: string) => {
    messageApi.open({
      type: 'error',
      content: mess,
    });
  };

  const handleSaveAuthor = async () => {
    try {
      if (idAuthor > 0) {
        await authorService.updateAuthor(author, idAuthor);
        successMess();
      } else {
        await authorService.addAuthor(author);
        successMess();
      }
      // Sau khi thành công, bạn có thể gọi lại getListAuthor để cập nhật danh sách
      getListAuthor();
      handleCloseModal();
    } catch (error) {
      const err = error as ErrorResponse;
      errorMess(err.response?.data?.message || "An error occurred");
      console.error("Error saving author:", error);
      // Bạn có thể thêm logic để hiển thị thông báo lỗi cho người dùng ở đây
    }
  };

  const handleOnchangeInputModal = useCallback((changedValues: any) => {
    setAuthor(prev => ({ ...prev, ...changedValues }));
  }, []);

  const handleDeleteAuthor = async (id?: number) => {
    if (id === undefined) {
      errorMess("Invalid author ID");
      return;
    }
    try {
      await authorService.deleteAuthor(id);
      getListAuthor();
      successMess();
    } catch (error) {
      const err = error as ErrorResponse;
      errorMess(err.response?.data?.message || "An error occurred");
      console.error("Error delete author:", error);
    }
  };

  const columns: TableProps<AuthorType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Biography',
      dataIndex: 'biography',
      key: 'biography',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record, index) => (
        <Space size="middle">
          <a onClick={() => handleOpenUpdateModal(record, index)}>Update</a>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDeleteAuthor(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getListAuthor();
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .ant-message {
        position: fixed !important;
        bottom: 20px !important;  /* Đưa xuống đáy */
        right: 20px !important;   /* Canh phải */
        left: auto !important;    /* Tránh căn giữa */
        top: auto !important;     /* Vô hiệu top */
        width: auto !important;
        display: flex !important;
        flex-direction: column;
        align-items: flex-end;
        z-index: 1050 !important; /* Đảm bảo hiển thị trên cùng */
      }
      .ant-message-notice {
        max-width: 300px !important; /* Giới hạn chiều rộng */
        text-align: right !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return {
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
  };
}