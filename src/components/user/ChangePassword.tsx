/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Input, Button, notification, Row, Col } from "antd";
import Sidebar from "../../components/Profile/SidebarProfli";
import { ChangePasswordRequest } from "../models/Customer";
import customerService from "../../services/customerService";


const ChangePassword: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: ChangePasswordRequest) => {
        setLoading(true);
        try {
            await customerService.changePassword(values);
            notification.success({
                message: "Thành công",
                description: "Mật khẩu đã được thay đổi thành công!",
            });
            form.resetFields(); // Reset form sau khi thành công
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi thay đổi mật khẩu.";
            notification.error({
                message: "Lỗi",
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-6">
                <h2 className="text-2xl font-bold text-center p-2 rounded-t-lg">THAY ĐỔI MẬT KHẨU</h2>
                <Row justify="center" style={{ marginTop: 24 }}>
                    <Col xs={24} sm={16} md={12} lg={8}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Mật khẩu cũ"
                                name="currentPassword"
                                rules={[
                                    { required: true, message: "Vui lòng nhập mật khẩu cũ!" },
                                    { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                                ]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu cũ" />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu mới"
                                name="newPassword"
                                rules={[
                                    { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                                    { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                                ]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu mới" />
                            </Form.Item>

                            {/* <Form.Item
                                label="Xác nhận mật khẩu mới"
                                name="confirmPassword"
                                dependencies={["newPassword"]}
                                rules={[
                                    { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("newPassword") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Xác nhận mật khẩu mới" />
                            </Form.Item> */}

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    block
                                >
                                    Thay đổi mật khẩu
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ChangePassword;