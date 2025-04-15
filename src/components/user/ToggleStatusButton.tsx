import React from "react";
import { Switch, notification } from "antd";
import customerService from "../../services/customerService";

interface ToggleStatusButtonProps {
    isDelete: boolean;
    userId: number;
    refreshUsers: () => void;
}

const ToggleStatusButton: React.FC<ToggleStatusButtonProps> = ({
    isDelete,
    userId,
    refreshUsers,
}) => {
    const handleToggle = async () => {
        try {
            await customerService.deleteCustomer(userId, !isDelete);
            notification.success({
                message: "Thành công",
                description: `Người dùng đã được ${isDelete ? "kích hoạt" : "xóa"} thành công!`,
            });
            refreshUsers();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            notification.error({
                message: "Lỗi",
                description:
                    error.message || `Không thể ${isDelete ? "kích hoạt" : "xóa"} người dùng!`,
            });
        }
    };

    return (
        <Switch
            checked={!isDelete}
            onChange={handleToggle}
            checkedChildren="Kích hoạt"
            unCheckedChildren="Không hoạt động"
        />
    );
};

export default ToggleStatusButton;