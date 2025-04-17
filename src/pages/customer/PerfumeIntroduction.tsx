import React from "react";
import { Breadcrumb } from "antd";

// Danh mục nước hoa
const categories = [
    {
        name: "Nước hoa chiết",
        img: "https://insacmau.com/wp-content/uploads/2023/08/hop-dung-nuoc-hoa-chiet-9-1200x900.jpg",
        description: "Nước hoa chiết tiện lợi, phù hợp để thử nghiệm nhiều mùi hương với chi phí hợp lý.",
    },
    {
        name: "Nước hoa nam",
        img: "https://curnonwatch.com/blog/wp-content/uploads/2022/05/nuoc-hoa-nam.jpg",
        description: "Hương thơm mạnh mẽ, nam tính, tôn lên phong cách lịch lãm và cá tính.",
    },
    {
        name: "Nước hoa nữ",
        img: "https://curnonwatch.com/blog/wp-content/uploads/2022/07/Slide17.jpeg",
        description: "Hương thơm ngọt ngào, thanh lịch, thể hiện sự nữ tính và quyến rũ.",
    },
    {
        name: "Nước hoa mini",
        img: "https://mfparis.vn/wp-content/uploads/2023/02/set-5-nuoc-hoa-mini-lancome-854020090_2_720x928.jpg",
        description: "Kích thước nhỏ gọn, dễ mang theo, hoàn hảo cho mọi dịp.",
    },
];

const PerfumeIntroduction: React.FC = () => {
    return (
        <div className="p-6 bg-white">
            {/* Tiêu đề và Breadcrumb */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Giới Thiệu Về Nước Hoa</h1>
                <Breadcrumb className="text-gray-500 mt-1">
                    <Breadcrumb.Item>
                        <a href="/" className="hover:text-gray-800">
                            Trang chủ
                        </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item className="text-black font-semibold">
                        Giới Thiệu Nước Hoa
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            {/* Phần giới thiệu tổng quan */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Nước Hoa - Nghệ Thuật Của Hương Thơm</h2>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="md:w-1/2">
                        <img
                            src="https://orchard.vn/wp-content/uploads/2024/10/floral-fruity.jpg.webp"
                            alt="Nghệ thuật nước hoa"
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <p className="text-lg text-gray-600 max-w-4xl">
                            Nước hoa không chỉ là một sản phẩm, mà còn là một nghệ thuật, một cách để thể hiện cá tính và cảm xúc.
                            Mỗi chai nước hoa là một câu chuyện, được tạo nên từ sự kết hợp tinh tế của các nốt hương, mang đến trải nghiệm độc đáo cho người sử dụng.
                            Tại Eun de Parfum, chúng tôi mang đến những mùi hương chất lượng, phù hợp với mọi phong cách và ngân sách.
                        </p>
                    </div>
                </div>
            </section>

            {/* Phần lịch sử nước hoa */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Lịch Sử Của Nước Hoa</h2>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="md:w-1/2">
                        <p className="text-lg text-gray-600">
                            Nước hoa có lịch sử hàng ngàn năm, bắt nguồn từ các nền văn minh cổ đại như Ai Cập, nơi người ta sử dụng hương thơm trong nghi lễ tôn giáo và chăm sóc cá nhân.
                            Đến thời Trung cổ, nước hoa trở thành biểu tượng của sự xa xỉ ở châu Âu, với các nhà pha chế nổi tiếng ở Pháp đặt nền móng cho ngành công nghiệp hiện đại.
                            Ngày nay, nước hoa là một phần không thể thiếu trong cuộc sống, giúp mỗi người khẳng định phong cách riêng.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <img
                            src="https://www.elleman.vn/wp-content/uploads/2021/09/18/202906/lich-su-nuoc-hoa-chai-nuoc-hoa-vintage-elle-man-1.jpeg"
                            alt="Lịch sử nước hoa"
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </section>

            {/* Các loại nước hoa */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Các Loại Nước Hoa Phổ Biến</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                            <img
                                src={category.img}
                                alt={category.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                                <p className="text-gray-600 text-sm mt-2">{category.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Phần thương hiệu Eun de Parfum */}
            <section className="bg-gray-100 p-10 rounded-lg flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                    <img
                        src="https://orchard.vn/wp-content/uploads/2024/06/showroom-221-vo-van-ngan-2-900x900.webp"
                        alt="Eun de Parfum Store"
                        className="w-80 h-auto rounded-lg shadow-md"
                    />
                </div>

                <div className="md:w-2/3 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-[#FF8787] mb-4">
                        Eun de Parfum - Hương Thơm Cho Mọi Người
                    </h2>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                        Tại Eun de Parfum, chúng tôi tin rằng nước hoa là cách tuyệt vời để thể hiện bản thân.
                        Với các dòng sản phẩm từ <strong>nước hoa chiết</strong>, <strong>nước hoa mini</strong> đến
                        <strong>nước hoa fullsize</strong>, chúng tôi mang đến những hương thơm chính hãng từ các thương hiệu lớn
                        như <strong>Chanel, Dior, Gucci, YSL, Versace</strong> với mức giá phù hợp cho học sinh, sinh viên và người có thu nhập trung bình.
                    </p>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4">
                        Hãy khám phá bộ sưu tập của chúng tôi để tìm ra mùi hương hoàn hảo dành cho bạn!
                    </p>
                    <div className="mt-6">
                        <a
                            href="/products"
                            className="bg-[#FF8787] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#FF8787] transition duration-300"
                        >
                            Khám Phá Sản Phẩm
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PerfumeIntroduction;