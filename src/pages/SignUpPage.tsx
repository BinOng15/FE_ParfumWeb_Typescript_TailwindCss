/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Input, Button, notification, Select } from "antd";
//import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import customerService from "../services/customerService";

const { Option } = Select;

const SignUpPage: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (values: {
        name: string;
        email: string;
        password: string;
        gender: string;
        phone: string;
        address: string;
    }) => {
        setLoading(true);
        try {
            await customerService.registerCustomer(values);
            notification.success({
                message: "Thành công",
                description: "Đăng ký thành công! Vui lòng chờ nhân viên xác minh tài khoản.",
            });
            navigate("/login"); // Điều hướng về trang đăng nhập
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Không thể đăng ký!";
            notification.error({
                message: "Lỗi",
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    // const handleGoogleSignup = async () => {
    //     setLoading(true);
    //     try {
    //         const googleId = "mock-google-id-12345"; // Giả lập googleId
    //         await customerService.registerWithGoogle(googleId);
    //         notification.success({
    //             message: "Thành công",
    //             description: "Đăng ký bằng Google thành công! Vui lòng đăng nhập.",
    //         });
    //         navigate("/login");
    //     } catch (error: any) {
    //         const errorMessage = error.response?.data?.message || "Không thể đăng ký bằng Google!";
    //         notification.error({
    //             message: "Lỗi",
    //             description: errorMessage,
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url(/6.png)" }}
        >
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Đăng ký
                </h2>
                <Form
                    form={form}
                    name="signup_form"
                    onFinish={handleSignup}
                    layout="vertical"
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        gender: "",
                        phone: "",
                        address: "",
                    }}
                >
                    <Form.Item
                        name="name"
                        label={<span className="text-sm text-gray-700">Tên đầy đủ</span>}
                        rules={[{ required: true, message: "Hãy nhập tên đầy đủ của bạn!" }]}
                    >
                        <Input
                            placeholder="Nhập tên đầy đủ của bạn"
                            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label={<span className="text-sm text-gray-700">Email</span>}
                        rules={[
                            { required: true, message: "Hãy nhập email của bạn!" },
                            { type: "email", message: "Vui lòng nhập email hợp lệ!" },
                        ]}
                    >
                        <Input
                            placeholder="Nhập email của bạn"
                            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={<span className="text-sm text-gray-700">Mật khẩu</span>}
                        rules={[{ required: true, message: "Mật khẩu không được để trống!" }]}
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu"
                            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label={<span className="text-sm text-gray-700">Giới tính</span>}
                        rules={[{ required: true, message: "Hãy chọn giới tính!" }]}
                    >
                        <Select
                            placeholder="Chọn giới tính"
                            className="w-full"
                        >
                            <Option value="Male">Nam</Option>
                            <Option value="Female">Nữ</Option>
                            <Option value="Other">Khác</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label={<span className="text-sm text-gray-700">Số điện thoại</span>}
                        rules={[
                            { required: true, message: "Hãy nhập số điện thoại!" },
                            { pattern: /^[0-9]{10}$/, message: "Số điện thoại phải có 10 chữ số!" },
                        ]}
                    >
                        <Input
                            placeholder="Nhập số điện thoại"
                            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label={<span className="text-sm text-gray-700">Địa chỉ</span>}
                        rules={[{ required: true, message: "Hãy nhập địa chỉ!" }]}
                    >
                        <Input
                            placeholder="Nhập địa chỉ"
                            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>
                    {/* <Form.Item>
                        <Button
                            icon={<GoogleOutlined />}
                            onClick={handleGoogleSignup}
                            loading={loading}
                            block
                            className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg text-sm"
                        >
                            Đăng ký bằng Google
                        </Button>
                    </Form.Item> */}
                </Form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>
                        Bạn đã có tài khoản?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-blue-500 hover:underline"
                        >
                            Đăng nhập ngay
                        </button>
                    </p>
                    <p className="mt-2">
                        <button
                            onClick={() => navigate("/")}
                            className="text-blue-500 hover:underline"
                        >
                            Trở lại trang chủ
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;