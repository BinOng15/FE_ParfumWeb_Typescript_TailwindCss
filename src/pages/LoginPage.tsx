/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Input, Button, notification, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import authService from "../services/authService";

const LoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            const token = await authService.userLogin(values.email, values.password);
            const user = await authService.getCurrentUser(token);
            console.log("User data from authService:", user);
            const userData = {
                customerId: user.customerId,
                email: user.email,
                roleName: user.roleName,
            };
            console.log("userData for Redux:", userData);
            dispatch(login(userData));
            // Lưu vào localStorage nếu rememberMe được chọn
            if (!rememberMe) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(userData));
            }
            notification.success({
                message: "Đăng nhập thành công",
            });

            // Điều hướng dựa trên vai trò
            switch (user.roleName) {
                case "Customer":
                    navigate("/home");
                    break;
                case "Staff":
                    navigate("/staff");
                    break;
                case "Admin":
                    navigate("/admin/dashboard");
                    break;
                default:
                    console.log("Unknown role:", user.roleName);
                    navigate("/");
                    break;
            }
        } catch (error: any) {
            console.error("Đăng nhập thất bại:", error);
            notification.error({
                message: "Đăng nhập thất bại",
                description:
                    error.message || "Email hoặc mật khẩu không đúng. Vui lòng thử lại.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url(/public/6.png)" }}
        >
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Đăng nhập
                </h2>
                <Form
                    form={form}
                    name="login_form"
                    onFinish={handleLogin}
                    layout="vertical"
                    initialValues={{ email: "", password: "" }}
                >
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
                            iconRender={(visible) =>
                                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                    <div className="flex items-center justify-between mb-4">
                        <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="text-sm text-gray-700"
                        >
                            Ghi nhớ tài khoản
                        </Checkbox>
                        <a href="#" className="text-sm text-blue-500 hover:underline">
                            Quên mật khẩu?
                        </a>
                    </div>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>
                        Bạn chưa có tài khoản?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-blue-500 hover:underline"
                        >
                            Đăng ký ngay
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

export default LoginPage;