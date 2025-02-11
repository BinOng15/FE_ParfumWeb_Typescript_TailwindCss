import React from "react";

const menPerfume = [
  {
    name: "CHANEL",
    description: "Bleu De Chanel EDP",
    image:
      "https://orchard.vn/wp-content/uploads/2015/01/chanel-bleu-de-chanel-edp_1.jpg.webp",
    size: ["75 ML"],
    oldPrice: "6.690.000 đ",
    newPrice: "5.380.000 đ",
    discount: "-20%",
  },
  {
    name: "Dior",
    description: "Sauvage EDP",
    image:
      "https://orchard.vn/wp-content/uploads/2018/04/dior-sauvage-edp_1-300x300.jpg.webp",
    size: ["50 ML"],
    oldPrice: "7.390.000 đ",
    newPrice: "5.980.000 đ",
    discount: "-19%",
  },
  {
    name: "Versace",
    description: "Eros EDT",
    image:
      "https://orchard.vn/wp-content/uploads/2014/06/versace-eros_1-300x300.jpg.webp",
    size: ["70 ML", "200 ML"],
    oldPrice: "11.900.000 đ",
    newPrice: "10.500.000 đ",
    discount: "-12%",
  },
  {
    name: "Bvlgari",
    description: "Aqva Pour Homme EDT",
    image:
      "https://orchard.vn/wp-content/uploads/2014/06/bvlgari-aqva-pour-homme-edt_1-300x300.jpg.webp",
    size: ["70 ML"],
    oldPrice: "7.500.000 đ",
    newPrice: "6.830.000 đ",
    discount: "-9%",
  },
  {
    name: "Chanel",
    description: "Allure Homme Sport EDT",
    image:
      "https://orchard.vn/wp-content/uploads/2014/06/chanel-allure-homme-sport-edt_1-300x300.jpg.webp",
    size: ["50 ML", "100 ML"],
    oldPrice: "9.300.000 đ",
    newPrice: "7.280.000 đ",
    discount: "-22%",
  },
];

const womenPerfume = [
  {
    name: "Narciso Rodriguez",
    description: "For Her EDP",
    image:
      "https://orchard.vn/wp-content/uploads/2015/01/narciso-rodriguez-for-her_1-300x300.jpg.webp",
    size: ["30 ML", "50 ML", "100 ML"],
    oldPrice: "6.690.000 đ",
    newPrice: "5.380.000 đ",
    discount: "-20%",
  },
  {
    name: "Gucci",
    description: "Bloom EDP",
    image:
      "https://orchard.vn/wp-content/uploads/2017/09/gucci-bloom-edp_1-300x300.jpg.webp",
    size: ["50 ML"],
    oldPrice: "7.390.000 đ",
    newPrice: "5.980.000 đ",
    discount: "-19%",
  },
  {
    name: "Yves Saint Laurent",
    description: "Libre EDP",
    image:
      "https://orchard.vn/wp-content/uploads/2019/11/yves-saint-laurent-libre-edp_1-300x300.jpg.webp",
    size: ["70 ML", "200 ML"],
    oldPrice: "11.900.000 đ",
    newPrice: "10.500.000 đ",
    discount: "-12%",
  },
  {
    name: "Armaf",
    description: "Club De Nuit Woman EDP",
    image:
      "https://orchard.vn/wp-content/uploads/2018/08/armaf-club-de-nuit-women_1-300x300.jpg.webp",
    size: ["70 ML"],
    oldPrice: "7.500.000 đ",
    newPrice: "6.830.000 đ",
    discount: "-9%",
  },
  {
    name: "Dior",
    description: "J’adore EDP",
    image:
      "https://orchard.vn/wp-content/uploads/2014/06/dior-jadore-edp_1-1-300x300.jpg.webp",
    size: ["50 ML", "100 ML"],
    oldPrice: "9.300.000 đ",
    newPrice: "7.280.000 đ",
    discount: "-22%",
  },
];

const extractPerfume = [
  {
    name: "Labo Santal",
    description: "Nước Hoa Le Labo Santal 33 10ML (Chiết)",
    image:
      "https://product.hstatic.net/1000025647/product/nuoc_hoa_chiet_le_labo_33_tgsm__13_-min_db28666534874df888e904067e884e2b.jpg",
    size: ["10 ML"],
    oldPrice: "690.000 đ",
    newPrice: "480.000 đ",
    discount: "-20%",
  },
  {
    name: "Yves Saint Laurent",
    description: "Libre Eau de Parfum 10ML (Chiết)",
    image:
      "https://bdperfume.vn/wp-content/uploads/2022/12/YSL-Libre-EDP@2x-80.jpg",
    size: ["10 ML"],
    oldPrice: "390.000 đ",
    newPrice: "190.000 đ",
    discount: "-19%",
  },
  {
    name: "Fralux Perfume",
    description: "Chai chiết nước hoa 10ml cao cấp - Fralux Perfume",
    image:
      "https://fraluxperfume.com/wp-content/uploads/2023/01/nuoc-hoa-chiet-hong.jpg",
    size: ["10 ML"],
    oldPrice: "900.000 đ",
    newPrice: "790.000 đ",
    discount: "-12%",
  },
  {
    name: "Kilian",
    description: "Nước hoa chiết Kilian Good girl gone bad 10ML",
    image:
      "https://product.hstatic.net/200000561331/product/2790b6d3-590b-4d3c-80c0-659e713f4f79_a904ee65fd3d4080b8895cb3d731a0ac_1024x1024.png",
    size: ["10 ML"],
    oldPrice: "500.000 đ",
    newPrice: "460.000 đ",
    discount: "-9%",
  },
  {
    name: "YSL",
    description: "Nước hoa chiết YSL Y EDP [10ml]",
    image:
      "https://bizweb.dktcdn.net/thumb/grande/100/343/050/products/162.png?v=1718707597393",
    size: ["10 ML"],
    oldPrice: "300.000 đ",
    newPrice: "200.000 đ",
    discount: "-22%",
  },
];

const miniPerfume = [
  {
    name: "Gucci",
    description: "Guilty Pour Homme Parfum Mini",
    image:
      "https://orchard.vn/wp-content/uploads/2024/09/gucci-guilty-pour-homme-parfum-mini-5ml_1-300x300.jpg.webp",
    size: ["5 ML"],
    newPrice: "460.000 đ",
  },
  {
    name: "Armaf",
    description: "Club De Nuit Woman EDP Mini",
    image:
      "https://orchard.vn/wp-content/uploads/2024/09/armaf-club-de-nuit-woman-edp-mini-10ml_1-300x300.jpg.webp",
    size: ["10 ML"],
    newPrice: "360.000 đ",
  },
  {
    name: "Valentino",
    description: "Donna Born in Roma EDP Mini",
    image:
      "https://orchard.vn/wp-content/uploads/2024/09/valentino-donna-born-in-roma-edp-mini-6ml_1-300x300.jpg.webp",
    size: ["6 ML"],
    newPrice: "400.000 đ",
  },
  {
    name: "Chanel",
    description: "No 5 EDP Mini",
    image:
      "https://orchard.vn/wp-content/uploads/2024/09/chanel-no-5-edp-mini-5ml_1-300x300.jpg.webp",
    size: ["5 ML"],
    newPrice: "380.000 đ",
  },
  {
    name: "Versace",
    description: "Bright Crystal EDT Mini",
    image:
      "https://orchard.vn/wp-content/uploads/2024/09/versace-bright-crystal-edt-mini-5ml_1-300x300.jpg.webp",
    size: ["5 ML"],
    newPrice: "350.000 đ",
  },
];

const ProductList: React.FC = () => {
  return (
    <section className="px-10 py-10 bg-white">
      {/* Danh mục Nước hoa Nam */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nước hoa Nam</h2>
          <a
            href="/perfume/men"
            className="text-blue-600 text-xl font-semibold hover:underline"
          >
            Xem thêm nước hoa nam&gt;
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {menPerfume.map((product, index) => (
            <div
              key={index}
              className="relative bg-white shadow-md p-4 rounded-lg"
            >
              {/* Nhãn giảm giá */}
              <span className="absolute top-2 left-2 bg-red-100 text-red-500 text-xs font-bold px-2 py-1 rounded">
                {product.discount}
              </span>

              {/* Ảnh sản phẩm */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[180px] object-contain"
              />

              {/* Thông tin sản phẩm */}
              <div className="mt-2">
                <h3 className="text-sm font-bold">{product.name}</h3>
                <p className="text-xs text-gray-500 truncate">
                  {product.description}
                </p>

                {/* Dung tích */}
                <div className="flex gap-2 mt-1">
                  {product.size.map((size, i) => (
                    <span
                      key={i}
                      className="border text-xs px-2 py-1 rounded text-gray-700"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                {/* Giá */}
                <div className="mt-2">
                  <span className="text-xs text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                  <span className="text-red-600 font-bold text-md ml-2">
                    {product.newPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danh mục Nước hoa Nữ */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nước hoa Nữ</h2>
          <a
            href="/perfume/women"
            className="text-blue-600 text-xl font-semibold hover:underline"
          >
            Xem thêm nước hoa nữ&gt;
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {womenPerfume.map((product, index) => (
            <div
              key={index}
              className="relative bg-white shadow-md p-4 rounded-lg"
            >
              {/* Nhãn giảm giá */}
              <span className="absolute top-2 left-2 bg-red-100 text-red-500 text-xs font-bold px-2 py-1 rounded">
                {product.discount}
              </span>

              {/* Ảnh sản phẩm */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[180px] object-contain"
              />

              {/* Thông tin sản phẩm */}
              <div className="mt-2">
                <h3 className="text-sm font-bold">{product.name}</h3>
                <p className="text-xs text-gray-500 truncate">
                  {product.description}
                </p>

                {/* Dung tích */}
                <div className="flex gap-2 mt-1">
                  {product.size.map((size, i) => (
                    <span
                      key={i}
                      className="border text-xs px-2 py-1 rounded text-gray-700"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                {/* Giá */}
                <div className="mt-2">
                  <span className="text-xs text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                  <span className="text-red-600 font-bold text-md ml-2">
                    {product.newPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nước hoa Chiết</h2>
          <a
            href="/perfume/extract"
            className="text-blue-600 text-xl font-semibold hover:underline"
          >
            Xem thêm nước hoa chiết&gt;
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {extractPerfume.map((product, index) => (
            <div
              key={index}
              className="relative bg-white shadow-md p-4 rounded-lg"
            >
              {/* Nhãn giảm giá */}
              <span className="absolute top-2 left-2 bg-red-100 text-red-500 text-xs font-bold px-2 py-1 rounded">
                {product.discount}
              </span>

              {/* Ảnh sản phẩm */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[180px] object-contain"
              />

              {/* Thông tin sản phẩm */}
              <div className="mt-2">
                <h3 className="text-sm font-bold">{product.name}</h3>
                <p className="text-xs text-gray-500 truncate">
                  {product.description}
                </p>

                {/* Dung tích */}
                <div className="flex gap-2 mt-1">
                  {product.size.map((size, i) => (
                    <span
                      key={i}
                      className="border text-xs px-2 py-1 rounded text-gray-700"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                {/* Giá */}
                <div className="mt-2">
                  <span className="text-xs text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                  <span className="text-red-600 font-bold text-md ml-2">
                    {product.newPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nước hoa Mini</h2>
          <a
            href="/perfume/mini"
            className="text-blue-600 text-xl font-semibold hover:underline"
          >
            Xem thêm nước hoa mini&gt;
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {miniPerfume.map((product, index) => (
            <div
              key={index}
              className="relative bg-white shadow-md p-4 rounded-lg"
            >
              {/* Nhãn giảm giá */}
              {/* <span className="absolute top-2 left-2 bg-red-100 text-red-500 text-xs font-bold px-2 py-1 rounded">
                {product.discount}
              </span> */}

              {/* Ảnh sản phẩm */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[180px] object-contain"
              />

              {/* Thông tin sản phẩm */}
              <div className="mt-2">
                <h3 className="text-sm font-bold">{product.name}</h3>
                <p className="text-xs text-gray-500 truncate">
                  {product.description}
                </p>

                {/* Dung tích */}
                <div className="flex gap-2 mt-1">
                  {product.size.map((size, i) => (
                    <span
                      key={i}
                      className="border text-xs px-2 py-1 rounded text-gray-700"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                {/* Giá */}
                <div className="mt-2">
                  {/* <span className="text-xs text-gray-400 line-through">
                    {product.oldPrice}
                  </span> */}
                  <span className="text-red-600 font-bold text-md ml-2">
                    {product.newPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Phần Giới Thiệu Cửa Hàng --- */}
      <div className="bg-gray-100 text-gray-800 p-10 mt-10 rounded-lg flex flex-col md:flex-row items-center">
        {/* Hình ảnh bên trái */}
        <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
          <img
            src="https://orchard.vn/wp-content/uploads/2024/06/showroom-221-vo-van-ngan-2-900x900.webp"
            alt="Eun de Parfum Store"
            className="w-80 h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Nội dung bên phải */}
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-3xl font-bold text-[#FF8787] mb-4">
            Giới Thiệu Về Eun de Parfum
          </h2>
          <p className="text-lg max-w-4xl mx-auto">
            Eun de Parfum là thương hiệu nước hoa uy tín, chuyên cung cấp các
            dòng nước hoa chính hãng dành cho{" "}
            <strong>
              học sinh, sinh viên và những người có thu nhập trung bình
            </strong>
            . Chúng tôi mang đến những hương thơm đẳng cấp từ các thương hiệu
            lớn như
            <strong>Chanel, Dior, Gucci, YSL, Versace</strong>, giúp bạn thể
            hiện phong cách và cá tính riêng của mình.
          </p>
          <p className="text-lg max-w-4xl mx-auto mt-4">
            Không chỉ có nước hoa fullsize, Eun de Parfum còn cung cấp các dòng
            <strong>nước hoa chiết</strong> và <strong>nước hoa mini</strong>,
            giúp bạn dễ dàng trải nghiệm những mùi hương yêu thích với chi phí
            hợp lý.
          </p>
          <p className="text-lg max-w-4xl mx-auto mt-4">
            Hãy đến với Eun de Parfum để tận hưởng{" "}
            <strong>ưu đãi độc quyền</strong>
            và <strong>dịch vụ chăm sóc khách hàng tận tâm</strong>!
          </p>

          {/* Nút Xem Thêm */}
          <div className="mt-6">
            <a
              href="/about"
              className="bg-[#FF8787] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#FF8787] transition duration-300"
            >
              Tìm hiểu thêm về chúng tôi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
