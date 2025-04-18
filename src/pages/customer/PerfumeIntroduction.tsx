import React from "react";
import { Breadcrumb, Carousel } from "antd";
import { motion } from "framer-motion";

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

// Sản phẩm nổi bật
const featuredProducts = [
    {
        name: "Blue de Chanel",
        img: "https://theperfume.vn/wp-content/uploads/2021/07/Chanel-Bleu-de-Chanel.png",
        description: "Hương hoa cổ điển, biểu tượng của sự thanh lịch và quyến rũ.",
    },
    {
        name: "Dior Sauvage",
        img: "https://orchard.vn/wp-content/uploads/2018/04/dior-sauvage-edp_banner-scaled.jpg",
        description: "Hương gỗ nam tính, mạnh mẽ, phù hợp với mọi dịp.",
    },
    {
        name: "YSL Libre",
        img: "https://nuochoamc.com/upload/images/san-pham/1140/yves-saint-laurent-libre-le-parfum-edp-90ml13.webp",
        description: "Hương vani và hoa cam, sự kết hợp hoàn hảo giữa ngọt ngào và quyến rũ.",
    },
];

// Các nốt hương phổ biến
const fragranceNotes = [
    {
        name: "Hương hoa (Floral)",
        img: "https://orchard.vn/wp-content/uploads/2024/10/floral.jpg.webp",
        description: "Hương hoa hồng, hoa nhài, hoa lily – mang lại cảm giác nữ tính, thanh lịch.",
    },
    {
        name: "Hương gỗ (Woody)",
        img: "https://orchard.vn/wp-content/uploads/2024/10/woody-aromatic.jpg.webp",
        description: "Hương gỗ đàn hương, tuyết tùng – mạnh mẽ, ấm áp, phù hợp cho cả nam và nữ.",
    },
    {
        name: "Hương trái cây (Fruity)",
        img: "https://orchard.vn/wp-content/uploads/2024/10/floral-fruity.jpg.webp",
        description: "Hương cam, dâu, táo – tươi mới, ngọt ngào, tràn đầy năng lượng.",
    },
];

// Hiệu ứng chuyển động
const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const PerfumeIntroduction: React.FC = () => {
    return (
        <div className="p-6 bg-gradient-to-b from-gray-50 to-white">
            {/* Tiêu đề và Breadcrumb */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Khám Phá Thế Giới Nước Hoa</h1>
                <Breadcrumb className="text-gray-500">
                    <Breadcrumb.Item>
                        <a href="/" className="hover:text-gray-800">
                            Trang chủ
                        </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item className="text-black font-semibold">
                        Giới Thiệu Nước Hoa
                    </Breadcrumb.Item>
                </Breadcrumb>
            </motion.div>

            {/* Phần giới thiệu tổng quan */}
            <section className="mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="flex flex-col md:flex-row items-center gap-8"
                >
                    <div className="md:w-1/2">
                        <motion.img
                            src="https://nuochoamc.com/upload/images/bai-viet/625/top-cac-loai-nuoc-hoa-huong-hoa-floral-mui-thom-nhat-nam-2024.webp"
                            alt="Nghệ thuật nước hoa"
                            className="w-full h-80 object-cover rounded-lg shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Nước Hoa - Nghệ Thuật Của Hương Thơm</h2>
                        <p className="text-lg text-gray-600 max-w-4xl">
                            Nước hoa là một hành trình cảm xúc, nơi mỗi giọt hương kể một câu chuyện riêng.
                            Từ những nốt hương hoa dịu dàng đến hương gỗ trầm ấm, nước hoa không chỉ là mùi hương mà còn là cách thể hiện cá tính.
                            Tại Eun de Parfum, chúng tôi mang đến những chai nước hoa chất lượng từ các thương hiệu hàng đầu, phù hợp với mọi phong cách và ngân sách.
                        </p>
                        <a
                            href="/perfumeProduct"
                            className="mt-6 inline-block bg-[#FF8787] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#FF6666] transition duration-300"
                        >
                            Khám Phá Ngay
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Lịch sử nước hoa */}
            <section className="mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="flex flex-col md:flex-row-reverse items-center gap-8"
                >
                    <div className="md:w-1/2">
                        <motion.img
                            src="https://hamal.vn/public/upload/images/thumb_baiviet/nguon-goc-va-lich-su-mui-huong-251656663627.jpg"
                            alt="Lịch sử nước hoa"
                            className="w-full h-80 object-cover rounded-lg shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Lịch Sử Hương Thơm Qua Các Thế Kỷ</h2>
                        <p className="text-lg text-gray-600">
                            Nước hoa bắt nguồn từ thời Ai Cập cổ đại, được sử dụng trong các nghi lễ và làm đẹp. Đến thời Trung cổ, nước hoa trở thành biểu tượng xa xỉ ở châu Âu.
                            Pháp, với Grasse – thủ phủ nước hoa thế giới, đã nâng tầm nước hoa thành nghệ thuật. Ngày nay, nước hoa là cách để mỗi người khẳng định phong cách riêng, từ những chai nước hoa chiết nhỏ gọn đến các dòng cao cấp.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Quy trình tạo nước hoa */}
            <section className="mb-16 bg-gray-100 py-12 rounded-lg">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Quy Trình Tạo Ra Một Chai Nước Hoa</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                        <motion.div variants={slideInLeft} className="bg-white p-6 rounded-lg shadow-md">
                            <img
                                src="https://mcdn.coolmate.me/image/May2023/nguyen-lieu-lam-nuoc-hoa-1694_955.jpg"
                                alt="Thu hoạch nguyên liệu"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Thu Hoạch Nguyên Liệu</h3>
                            <p className="text-gray-600">
                                Các nguyên liệu tự nhiên như hoa, gỗ, và trái cây được thu hoạch từ khắp nơi trên thế giới, đặc biệt từ Grasse, Pháp.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md">
                            <img
                                src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcg3He3TdbH1WBux1mz8gsAIq94l276r7Bl4nOBpAZWOn0is8pfaEwYiIcNeOQq47K24GLslRfOXkOyOJ8A2hF4ZTRbqLSD5_t9I6fVNErtjUFH8uEVD_TbmRt4Ino_L1kiakJfMtBxNzZGk7zJVk2ysPsv?key=_G0qEs4kTmXuvTOSoNDe6Q"
                                alt="Chiết xuất tinh dầu"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Chiết Xuất Tinh Dầu</h3>
                            <p className="text-gray-600">
                                Tinh dầu được chiết xuất thông qua các phương pháp như chưng cất hoặc ép lạnh, giữ trọn vẹn hương thơm tự nhiên.
                            </p>
                        </motion.div>
                        <motion.div variants={slideInRight} className="bg-white p-6 rounded-lg shadow-md">
                            <img
                                src="https://kodo.vn/wp-content/uploads/2023/08/pha-che-nuoc-hoa-tu-tinh-dau-1.png"
                                alt="Pha chế nước hoa"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Pha Chế Và Ủ Hương</h3>
                            <p className="text-gray-600">
                                Các nốt hương được pha trộn tinh tế bởi các nhà pha chế, sau đó ủ hàng tháng để tạo nên mùi hương hoàn hảo.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Các nốt hương phổ biến */}
            <section className="mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Khám Phá Các Nốt Hương Phổ Biến</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                        {fragranceNotes.map((note, index) => (
                            <motion.div
                                key={index}
                                variants={fadeIn}
                                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <motion.img
                                    src={note.img}
                                    alt={note.name}
                                    className="w-full h-48 object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{note.name}</h3>
                                    <p className="text-gray-600 text-sm mt-2">{note.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Các loại nước hoa */}
            <section className="mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Các Loại Nước Hoa Phổ Biến</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                variants={fadeIn}
                                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <motion.img
                                    src={category.img}
                                    alt={category.name}
                                    className="w-full h-48 object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                                    <p className="text-gray-600 text-sm mt-2">{category.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Sản phẩm nổi bật - Carousel */}
            <section className="mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Sản Phẩm Nổi Bật Tại Eun de Parfum</h2>
                    <Carousel autoplay effect="fade" className="max-w-4xl mx-auto">
                        {featuredProducts.map((product, index) => (
                            <div key={index} className="px-4">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-64 object-cover rounded-lg mb-4"
                                    />
                                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                                    <a
                                        href="/perfumeProduct"
                                        className="mt-4 inline-block bg-[#FF8787] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#FF6666] transition duration-300"
                                    >
                                        Xem Thêm
                                    </a>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </motion.div>
            </section>

            {/* Cách chọn nước hoa */}
            <section className="mb-16 bg-gray-100 py-12 rounded-lg">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Cách Chọn Nước Hoa Phù Hợp</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                        <motion.div variants={slideInLeft} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Hiểu Sở Thích Cá Nhân</h3>
                            <p className="text-gray-600">
                                Bạn thích hương hoa dịu dàng hay hương gỗ mạnh mẽ? Hãy chọn mùi hương phản ánh cá tính của bạn.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Dựa Vào Dịp Sử Dụng</h3>
                            <p className="text-gray-600">
                                Hương nhẹ nhàng cho ban ngày, hương nồng ấm cho buổi tối hoặc các sự kiện đặc biệt.
                            </p>
                        </motion.div>
                        <motion.div variants={slideInRight} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Thử Trước Khi Mua</h3>
                            <p className="text-gray-600">
                                Hãy thử nước hoa trên da để cảm nhận sự thay đổi của mùi hương theo thời gian.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Phần thương hiệu Eun de Parfum */}
            <section className="bg-gradient-to-r from-[#FF8787] to-[#FF6666] p-10 rounded-lg flex flex-col md:flex-row items-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="md:w-1/3 flex justify-center mb-6 md:mb-0"
                >
                    <motion.img
                        src="https://orchard.vn/wp-content/uploads/2024/06/showroom-221-vo-van-ngan-2-900x900.webp"
                        alt="Eun de Parfum Store"
                        className="w-80 h-auto rounded-lg shadow-md"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="md:w-2/3 text-center md:text-left text-white"
                >
                    <h2 className="text-3xl font-bold mb-4">Eun de Parfum - Hương Thơm Cho Mọi Người</h2>
                    <p className="text-lg max-w-4xl mx-auto">
                        Tại Eun de Parfum, chúng tôi tin rằng nước hoa là cách tuyệt vời để thể hiện bản thân.
                        Với các dòng sản phẩm từ <strong>nước hoa chiết</strong>, <strong>nước hoa mini</strong> đến
                        <strong>nước hoa fullsize</strong>, chúng tôi mang đến những hương thơm chính hãng từ các thương hiệu lớn
                        như <strong>Chanel, Dior, Gucci, YSL, Versace</strong> với mức giá phù hợp cho học sinh, sinh viên và người có thu nhập trung bình.
                    </p>
                    <p className="text-lg max-w-4xl mx-auto mt-4">
                        Hãy khám phá bộ sưu tập của chúng tôi để tìm ra mùi hương hoàn hảo dành cho bạn!
                    </p>
                    <div className="mt-6">
                        <a
                            href="/perfumeProduct"
                            className="bg-white text-[#FF8787] px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-100 transition duration-300"
                        >
                            Khám Phá Sản Phẩm
                        </a>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default PerfumeIntroduction;