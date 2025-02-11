import React from "react";

const CarouselHomeProduct: React.FC = () => {
  // Danh sách sản phẩm
  const products = [
    {
      name: "GUCCI BLOOM",
      image:
        "https://theperfume.vn/wp-content/uploads/2018/08/thiet-ke-nuoc-hoa-gucci-bloom-edp-5ml.png",
    },
    {
      name: "CHANEL",
      image:
        "https://hadibeauty.com/wp-content/uploads/2021/10/nuoc-hoa-chanel-gabrielle-eau-de-parfum.webp",
    },
    {
      name: "NƯỚC HOA CHIẾT FULLSIZE",
      image:
        "https://bizweb.dktcdn.net/100/443/867/files/nuoc-hoa-narciso-rodriguez-musc-noir-for-her-edp-chiet-10ml.png?v=1695733627308",
    },
    {
      name: "DIOR SAUVAGE",
      image:
        "https://missi.com.vn/wp-content/uploads/2021/10/Dior-Sauvage-Elixir.jpg",
    },
    {
      name: "YSL LIBRE",
      image:
        "https://bizweb.dktcdn.net/thumb/large/100/335/381/products/yves-saint-laurent-libre-eau-de-parfum-100ml-d0dedea5f51f432cb5dcd88ea43c3a5b-master.jpg",
    },
  ];

  return (
    <section className="relative mt-10 px-10 py-10 text-center bg-[#FBE1E1]">
      {/* SVG Wave Background */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#FF8787"
            d="M0,288L60,256C120,224,240,160,360,154.7C480,149,600,203,720,213.3C840,224,960,192,1080,186.7C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-gray-800 relative z-10">
        SẢN PHẨM NỔI BẬT
      </h2>

      {/* Product Grid */}
      <div className="flex justify-center gap-4 relative z-10">
        {products.map((product, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md w-1/5">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-md font-semibold mt-2">{product.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarouselHomeProduct;
