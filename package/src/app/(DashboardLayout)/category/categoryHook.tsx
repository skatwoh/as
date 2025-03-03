import categoryService from '@/api/categoryService';
import { Space, TableProps } from 'antd'; // Import TableProps từ antd
import { useCallback, useEffect, useState } from 'react';

interface CategoryType {
  name: string;
  description: string;
}

export function useCategory() {
  const [listCategory, setListCategory] = useState<CategoryType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryType>({
    name: "",
    description: ""
  });

  const getListCategory = async () => {
    const data: any = await categoryService.listCategory(1, 10);
    setListCategory(data?.data?.content)
  }

  const handleOpenAddModal = () => {
    setIsModalOpen(true);
  }

  const handleOpenUpdateModal = (category: CategoryType) => {
    setIsModalOpen(true);
    setIsUpdate(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
  }

  const handleSaveCategory = (id: number) => {
    if (id) {
      categoryService.updateCategory(category, id);
    }
    else {
      categoryService.addCategory(category);
    }
  }

  const handleOnchangeInputModal = useCallback((changedValues: any) => {
    setCategory(prev => ({ ...prev, ...changedValues }));
  }, []);

  const columns: TableProps<CategoryType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Update</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getListCategory();
  }, []);

  return {
    columns,
    listCategory,
    isModalOpen,
    handleOpenAddModal,
    handleOpenUpdateModal,
    handleCloseModal,
    handleSaveCategory,
    isUpdate,
    handleOnchangeInputModal
  };
}