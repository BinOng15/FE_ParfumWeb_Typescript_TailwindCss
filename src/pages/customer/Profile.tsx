/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Avatar, Upload, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Sidebar from "../../components/Profile/SidebarProfli";
import authService from "../../services/authService";
import customerService from "../../services/customerService"; // Import customerService

const ProfileEdit = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        address: "",
        avatar: "/default.png",
    });
    const [customerId, setCustomerId] = useState<number | null>(null); // Lưu customerId
    const [hovered, setHovered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false); // Trạng thái lưu

    // Hàm ánh xạ gender từ API sang tiếng Việt
    const mapGenderToVietnamese = (gender: string | undefined): string => {
        switch (gender?.toLowerCase()) {
            case "male":
                return "Nam";
            case "female":
                return "Nữ";
            default:
                return "Khác";
        }
    };

    // Hàm ánh xạ gender từ tiếng Việt sang tiếng Anh
    const mapGenderToEnglish = (gender: string): string => {
        switch (gender) {
            case "Nam":
                return "Male";
            case "Nữ":
                return "Female";
            default:
                return "Other";
        }
    };

    // Gọi API getCurrentUser khi component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Vui lòng đăng nhập để xem thông tin cá nhân!");
                }

                const user = await authService.getCurrentUser(token);
                setCustomerId(user.customerId); // Lưu customerId
                setProfile({
                    name: user.name || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    address: user.address || "",
                    gender: mapGenderToVietnamese(user.gender),
                    avatar: "/default.png",
                });
            } catch (error: any) {
                console.error("Lỗi khi tải thông tin cá nhân:", error);
                message.error(error.message || "Không thể tải thông tin cá nhân!");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    // Xử lý cập nhật profile
    const handleSave = async () => {
        if (!customerId) {
            message.error("Không tìm thấy ID khách hàng!");
            return;
        }

        setSaving(true);
        try {
            const updateData = {
                name: profile.name,
                email: profile.email,
                phone: profile.phone, // Gửi phone dù disabled
                address: profile.address,
                gender: mapGenderToEnglish(profile.gender),
            };

            const updatedUser = await customerService.updateCustomer(customerId, updateData);
            // Cập nhật profile với dữ liệu mới từ API
            setProfile({
                name: updatedUser.name || profile.name,
                email: updatedUser.email || profile.email,
                phone: updatedUser.phone || profile.phone,
                address: updatedUser.address || profile.address,
                gender: mapGenderToVietnamese(updatedUser.gender),
                avatar: profile.avatar, // Giữ avatar hiện tại vì API không trả
            });
            message.success("Cập nhật hồ sơ thành công!");
        } catch (error: any) {
            console.error("Lỗi khi cập nhật hồ sơ:", error);
            message.error("Không thể cập nhật hồ sơ!");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (info: any) => {
        if (info.file.status === "done") {
            const newAvatarUrl = URL.createObjectURL(info.file.originFileObj);
            setProfile((prev) => ({ ...prev, avatar: newAvatarUrl }));
            message.success("Cập nhật ảnh đại diện thành công!");
        } else if (info.file.status === "error") {
            message.error("Tải ảnh thất bại!");
        }
    };

    if (loading) {
        return <div className="text-center p-6">Đang tải thông tin...</div>;
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-6 bg-white rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
                <div className="space-y-4">
                    {/* Avatar Upload với Hover */}
                    <div className="flex flex-col items-center relative">
                        <Upload
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleAvatarChange}
                        >
                            <div
                                className="relative w-[100px] h-[100px] cursor-pointer"
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                            >
                                <Avatar size={100} src={profile.avatar} className="w-full h-full" />
                                {hovered && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                        <EditOutlined className="text-white text-2xl" />
                                    </div>
                                )}
                            </div>
                        </Upload>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-gray-700">Tên</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-gray-700">Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            value={profile.phone}
                            disabled
                            className="w-full px-3 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-gray-700">Giới tính</label>
                        <div className="flex space-x-4">
                            {["Nam", "Nữ", "Khác"].map((option) => (
                                <label key={option} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={option}
                                        checked={profile.gender === option}
                                        onChange={handleChange}
                                        className="form-radio text-red-500"
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Birth Date
                    <div>
                        <label className="block text-gray-700">Ngày sinh</label>
                        <input
                            type="text"
                            name="birthDate"
                            value={profile.birthDate}
                            onChange={handleChange}
                            placeholder="DD/MM/YYYY"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div> */}

                    {/* Address */}
                    <div>
                        <label className="block text-gray-700">Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`w-full py-2 rounded-md text-white ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                            }`}
                    >
                        {saving ? "Đang lưu..." : "Lưu"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;