"use client";
import { useBooks } from "./booksHook";
import { Table } from 'antd'; // Import TableProps từ antd

export default function Page() {
    const { columns, data } = useBooks();
    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
}
