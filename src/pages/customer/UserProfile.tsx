/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Avatar, message } from "antd";
import { Link } from "react-router-dom"; // Thêm Link để điều hướng
import Sidebar from "../../components/Profile/SidebarProfli";
import authService from "../../services/authService";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    avatar: "/default.png",
  });
  const [loading, setLoading] = useState(true);

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

  // Gọi API getCurrentUser khi component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Vui lòng đăng nhập để xem thông tin cá nhân!");
        }

        const user = await authService.getCurrentUser(token);
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

  if (loading) {
    return <div className="text-center p-6">Đang tải thông tin...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6 bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
        <div className="space-y-4">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <Avatar size={100} src={profile.avatar} className="w-full h-full" />
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold">Tên</label>
            <p className="text-gray-900">{profile.name}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <p className="text-gray-900">{profile.email}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-semibold">Số điện thoại</label>
            <p className="text-gray-900">{profile.phone}</p>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-semibold">Giới tính</label>
            <p className="text-gray-900">{profile.gender}</p>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-semibold">Địa chỉ</label>
            <p className="text-gray-900">{profile.address || "Chưa cung cấp"}</p>
          </div>

          {/* Edit Button */}
          <Link
            to="/profile/edit"
            className="block w-full bg-red-500 text-white py-2 rounded-md text-center hover:bg-red-600 transition-colors"
          >
            Chỉnh sửa thông tin cá nhân
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;