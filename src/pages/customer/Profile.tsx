import { useState } from "react";
import { Avatar, Upload, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import MainLayout from "../../layout/MainLayout";
import Sidebar from "../../components/Profile/SidebarProfli";

const ProfileEdit = () => {
    const [profile, setProfile] = useState({
        name: "Dư Trần Vĩnh Hưng",
        email: "abcacb@gmail.com",
        phone: "********00",
        gender: "Nam",
        birthDate: "11/11/1111",
        avatar: "https://i.pravatar.cc/150?img=3", // Ảnh mặc định
    });

    const [hovered, setHovered] = useState(false); // Kiểm soát trạng thái hover

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

    return (
        <MainLayout>
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

                        {/* Birth Date */}
                        <div>
                            <label className="block text-gray-700">Ngày sinh</label>
                            <input
                                type="text"
                                name="birthDate"
                                value={profile.birthDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>

                        {/* Save Button */}
                        <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
                            Lưu
                        </button>
                    </div>
                </div> </div>

        </MainLayout>
    );
};

export default ProfileEdit;
