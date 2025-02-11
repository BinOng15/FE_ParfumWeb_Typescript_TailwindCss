import React, { useState } from "react";
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import MainLayout from "../../layout/MainLayout";
import { Pagination } from "antd";

const product = {
  name: "Chanel Bleu De Chanel EDP",
  img: "https://orchard.vn/wp-content/uploads/2015/01/chanel-bleu-de-chanel-edp_1.jpg.webp",
  thumbnails: [
    "https://orchard.vn/wp-content/uploads/2015/01/chanel-bleu-de-chanel-edp_1.jpg.webp",
    "https://orchard.vn/wp-content/uploads/2015/01/chanel-bleu-de-chanel-edp_2-300x300.jpg.webp",
    "https://orchard.vn/wp-content/uploads/2015/01/chanel-bleu-de-chanel-edp_3-300x300.jpg.webp",
    "https://orchard.vn/wp-content/uploads/2015/01/chanel-bleu-de-chanel-edp_4-300x300.jpg.webp",
  ],
  price: "3.730.000 đ",
  oldPrice: "4.550.000 đ",
  discount: "-18%",
  productCode: "SPMU3BRHNHWGHG",
  brand: "Chanel",
  type: "Nước Hoa Nam",
  status: "Còn hàng",
  sizes: [
    { label: "50 ML", price: "2.880.000 đ" },
    { label: "100 ML", price: "3.730.000 đ" },
    { label: "150 ML", price: "4.530.000 đ" },
  ],
};

const reviews = [
  { name: "Nguyễn Duy Công", review: "Rất hài lòng." },
  { name: "Nguyễn Trần Hoàng", review: "★★★★★" },
  { name: "Thân Phi 0886018***", review: "Rất ok" },
  { name: "Trần Minh Huy", review: "Sản phẩm tuyệt vời!" },
  { name: "Lê Thanh Tùng", review: "Mùi hương nam tính, giữ lâu." },
  { name: "Đặng Văn Nam", review: "Sẽ mua lại lần nữa!" },
  { name: "Phạm Quang Hải", review: "Giao hàng nhanh, mùi thơm dễ chịu." },
];

const PerfumeProductDetail: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [phone, setPhone] = useState("");
  const [selectedImage, setSelectedImage] = useState(product.img);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const displayedReviews = reviews.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  const commitments = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
      title: "SẢN PHẨM CHẤT LƯỢNG CAO",
      description: "Kiên quyết nói không với hàng giả, hàng kém chất lượng",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/5785/5785852.png",
      title: "GIAO HÀNG TẬN NƠI",
      description: "Giao hàng trên khắp 63 tỉnh thành",
    },
    {
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs9ULmmyJBs3PlqlSpI_pJTDenFeJFhi8UAQ&s",
      title: "THANH TOÁN ONLINE AN TOÀN",
      description: "Bạn yên tâm thanh toán online qua PayOs",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2088/2088617.png",
      title: "ĐỔI TRẢ TRONG 7 NGÀY",
      description: "Dễ dàng đổi trả sản phẩm trong 7 ngày kể từ khi nhận hàng",
    },
  ];

  return (
    <MainLayout>
      <div className="ml-10 mr-10">
        <div className="p-8 bg-white">
          {/* Đường dẫn trang */}
          <div className="text-sm text-gray-500 mb-4">
            <span className="hover:text-black cursor-pointer">Trang chủ</span>{" "}
            &nbsp; – &nbsp;
            <span className="hover:text-black cursor-pointer">
              Nước Hoa
            </span>{" "}
            &nbsp; – &nbsp;
            <span className="hover:text-black cursor-pointer">
              Thương hiệu nước hoa
            </span>{" "}
            &nbsp; – &nbsp;
            <span className="hover:text-black cursor-pointer">
              Nước hoa Chanel
            </span>{" "}
            &nbsp; – &nbsp;
            <span className="text-black font-bold">{product.name}</span>
          </div>

          <div className="grid grid-cols-3 gap-12 mt-6 items-start">
            {/* BÊN TRÁI: Ảnh sản phẩm */}
            <div className="col-span-1">
              <div className="relative">
                {/* Giảm giá */}
                <span className="absolute top-2 left-2 bg-red-100 text-red-500 text-xs font-bold px-2 py-1 rounded">
                  {product.discount}
                </span>

                {/* Ảnh chính */}
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-[420px] h-[500px] shadow-md"
                />

                {/* Danh sách thumbnail */}
                <div className="flex gap-2 mt-3">
                  {product.thumbnails.map((thumb, index) => (
                    <img
                      key={index}
                      src={thumb}
                      alt="Thumbnail"
                      className={`w-24 h-24 cursor-pointer transition-opacity duration-300 ${
                        selectedImage === thumb
                          ? "opacity-100 border-2 border-red-500"
                          : "opacity-50 border border-gray-300"
                      }`}
                      onClick={() => setSelectedImage(thumb)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* PHẦN GIỮA: Thông tin sản phẩm */}
            <div className="col-span-1">
              {/* Thông tin sản phẩm */}
              <div className="mt-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>

                <div className="flex items-center my-3">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                    4.8
                  </span>
                  <span className="ml-2 text-yellow-500">⭐⭐⭐⭐⭐</span>
                  <a href="#" className="text-blue-500 text-sm ml-2">
                    (30 đánh giá)
                  </a>
                  <span className="text-gray-500 text-sm ml-3">
                    Đã bán 2.1k
                  </span>
                </div>

                <p className="text-gray-600 mb-4">
                  Hương thơm nam tính và tinh tế, lý tưởng cho mọi dịp từ công
                  sở đến tiệc tối.
                </p>

                <p className="text-gray-700">
                  <strong>Thương hiệu:</strong>{" "}
                  <span className="text-blue-500">{product.brand}</span>
                </p>
                <p className="text-gray-700">
                  <strong>Loại sản phẩm:</strong>{" "}
                  <span className="text-blue-500">{product.type}</span>
                </p>
                <p className="text-gray-700">
                  <strong>Tình trạng:</strong>{" "}
                  <span className="text-green-600">{product.status}</span>
                </p>

                <div className="mt-4">
                  <span className="text-red-600 text-3xl font-bold">
                    {product.price}
                  </span>
                  <span className="text-gray-400 text-lg ml-3 line-through">
                    {product.oldPrice}
                  </span>
                </div>

                {/* Chọn dung tích */}
                <p className="text-gray-700 font-semibold mt-4">Lựa chọn:</p>
                <div className="flex gap-3 mt-2">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 border-2 text-gray-700 rounded-lg font-semibold ${
                        selectedSize.label === size.label
                          ? "border-red-500 text-red-500"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>

                {/* Chọn số lượng */}
                <div className="flex items-center mt-6">
                  <button
                    className="border px-3 py-2 rounded-l bg-gray-200 hover:bg-gray-300"
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  >
                    <MinusOutlined />
                  </button>
                  <span className="border-t border-b px-4 py-2">
                    {quantity}
                  </span>
                  <button
                    className="border px-3 py-2 rounded-r bg-gray-200 hover:bg-gray-300"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <PlusOutlined />
                  </button>
                </div>

                {/* Nút thêm giỏ hàng và mua */}
                <div className="flex gap-4 mt-6">
                  <button className="border px-6 py-3 text-gray-800 bg-white hover:bg-gray-200 flex items-center rounded-md">
                    <ShoppingCartOutlined className="mr-2" /> Thêm vào giỏ hàng
                  </button>
                  <button className="px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-md">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>

            {/* BÊN PHẢI: Cam kết & Tư vấn */}
            <div className="col-span-1 sticky top-4 space-y-6 min-h-[500px]">
              {/* CAM KẾT */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="bg-black text-white text-center font-bold py-2 rounded-md text-lg">
                  CAM KẾT TỪ CHÚNG TÔI
                </div>
                <div className="p-4">
                  {commitments.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 mb-3">
                      <img src={item.icon} alt="icon" className="w-6 h-6" />
                      <div>
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-gray-600 text-xs">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TƯ VẤN */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="bg-black text-white text-center font-bold py-2 rounded-md text-lg">
                  BẠN CẦN TƯ VẤN?
                </div>
                <div className="p-4">
                  <div className="flex border rounded-md overflow-hidden">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Số điện thoại(*)"
                      className="w-full p-2 text-gray-600 border-none outline-none"
                    />
                    <button className="bg-red-500 text-white px-4 font-semibold hover:bg-red-600">
                      GỬI
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-t mt-10 border-gray-300 my-8" />
          {/* Chi tiết sản phẩm */}
          <div className="w-full px-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Chi tiết về sản phẩm
            </h2>

            <div className="grid grid-cols-2 gap-6 text-gray-700">
              {/* Cột 1 */}
              <div>
                <p>
                  <strong>Phân loại:</strong>{" "}
                  <span className="text-blue-500 cursor-pointer">Nước hoa</span>
                </p>
                <p>
                  <strong>Xuất xứ:</strong> Pháp
                </p>
                <p>
                  <strong>Năm phát hành:</strong> 2014
                </p>
                <p>
                  <strong>Nồng độ:</strong> Eau de Parfum (EDP)
                </p>
                <p>
                  <strong>Nhóm hương:</strong>{" "}
                  <span className="text-blue-500 cursor-pointer">
                    Gỗ Thảo Mộc
                  </span>
                </p>
                <p>
                  <strong>Nhà chế tác:</strong>{" "}
                  <span className="text-blue-500 cursor-pointer">
                    Jacques Polge
                  </span>
                </p>
              </div>

              {/* Cột 2 */}
              <div>
                <p>
                  <strong>Phong cách:</strong> Ấm áp, Đa dụng, Lãng mạn, Thanh
                  lịch, Tươi mát
                </p>
                <p>
                  <strong>Dịp sử dụng:</strong> Hàng ngày, Văn phòng, Hẹn hò,
                  Mùa đông, Mùa hè, Du lịch, Sự kiện
                </p>
              </div>
            </div>

            {/* Các tầng hương */}
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>
                <strong>Top note (hương đầu):</strong> Bưởi, chanh vàng, bạc hà,
                hồng tiêu, nhục đậu khấu, gừng
              </li>
              <li>
                <strong>Heart note (hương giữa):</strong> Hoa nhài, hoa phong
                lữ, Iso E Super
              </li>
              <li>
                <strong>Base note (hương cuối):</strong> Hương gỗ, nhựa
                labdanum, gỗ đàn hương, hoắc hương, tuyết tùng, nhựa olebanum,
                hổ phách
              </li>
            </ul>

            {/* Đánh giá */}
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>
                <strong>Độ lưu hương:</strong> 4/5
              </li>
              <li>
                <strong>Độ tỏa hương:</strong> 4/5
              </li>
              <li>
                <strong>Nịnh mũi:</strong> 4/5
              </li>
              <li>
                <strong>Thời điểm:</strong> Thích hợp cho mọi dịp, từ công sở
                đến các buổi tiệc tối quan trọng.
              </li>
            </ul>
          </div>
          {/* Đường gạch ngang ngăn cách */}
          <hr className="border-t border-gray-300 my-8" />

          <div className="mt-6 space-y-6">
            {displayedReviews.map((user, index) => (
              <div key={index} className="border-b pb-4">
                <p className="font-semibold">
                  {user.name} ✅ Khách hàng của EundeParfum.vn
                </p>
                <p className="text-orange-500">★★★★★</p>
                <p className="text-gray-700">{user.review}</p>
                <a href="#" className="text-blue-500 text-sm">
                  Trả lời
                </a>
              </div>
            ))}

            {/* Phân trang */}
            <div className="flex justify-center mt-6">
              <Pagination
                current={currentPage}
                total={reviews.length}
                pageSize={reviewsPerPage}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PerfumeProductDetail;
