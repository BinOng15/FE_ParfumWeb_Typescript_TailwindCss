import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';


// Define the type for a single payment record
interface Payment {
    date: string;
    amount: number;
    currency: string;
}

const PaymentHistory: React.FC = () => {
    // Sample payment data


    // Columns configuration for Ant Design Table
    const payments: Payment[] = [
        { date: '2025-02-10', amount: 50, currency: 'USD' },
        { date: '2025-02-12', amount: 30, currency: 'USD' },
        { date: '2025-02-14', amount: 70, currency: 'USD' },
    ];

    // Cấu hình các cột cho bảng Ant Design
    const columns: ColumnsType<Payment> = [
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
            render: (text: number) => `$${text}`,
        },
        {
            title: 'Tiền tệ',
            dataIndex: 'currency',
            key: 'currency',
        },
    ];

    return (

        <div className="p-6 bg-white rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Lịch Sử Thanh Toán</h2>

            <Table
                dataSource={payments}
                columns={columns}
                rowKey="date"
                pagination={false}
            />
        </div>


    );
};

export default PaymentHistory;
