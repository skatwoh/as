import bookService from '@/api/bookService';
import { Space, TableProps } from 'antd'; // Import TableProps từ antd
import { useEffect, useState } from 'react';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

interface BookType {
    title: string;
    author: string;
    genre: string;
    published: Date;
    publisher: string;
    description: string;
    imageUrl: string;
}

export function useBooks() {
    const [listBook, setListBook] = useState<BookType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [book, setBook] = useState<BookType>({
        title: "",
        author: "",
        genre: "",
        published: new Date(),
        publisher: "",
        description: "",
        imageUrl: ""
    });

    const getListBook = async () => {
        const data: any = await bookService.listBook(1, 10);
        setListBook(data?.data?.content)
    }

    const handleOpenAddModal = () => {
        setIsModalOpen(true);
    }

    const handleOpenUpdateModal = (book: BookType) => {
        setIsModalOpen(true);
        setIsUpdate(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsUpdate(false);
    }

    const handleSaveBook = (id: number) => {
        if (id) {
            bookService.updateBook(book, id);
        }
        else {
            bookService.addBook(book);
        }
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: 'Published',
            key: 'published',
            dataIndex: 'published',
        },
        {
            title: 'Publisher',
            key: 'publisher',
            dataIndex: 'publisher',
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
        },
        {
            title: 'ImageUrl',
            key: 'imageUrl',
            dataIndex: 'imageUrl',
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
        getListBook();
    }, []);

    useEffect(() => {
        console.log(listBook, "list")
    })

    return {
        columns,
        listBook,
        isModalOpen,
        handleOpenAddModal,
        handleOpenUpdateModal,
        handleCloseModal,
        handleSaveBook,
        isUpdate
    };
}