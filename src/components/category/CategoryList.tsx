import React from "react";

const categories = [
  {
    name: "NƯỚC HOA NAM",
    image:
      "https://i.pinimg.com/736x/3c/51/33/3c51335a2ddde23288dea3637547295b.jpg",
  },
  {
    name: "NƯỚC HOA NỮ",
    image:
      "https://i.pinimg.com/236x/a6/6d/66/a66d665f702a3acd0d19a18ffb74f720.jpg",
  },
  {
    name: "NƯỚC HOA UNISEX",
    image:
      "https://i.pinimg.com/736x/89/a4/c6/89a4c69d894744929724c2ec01e8d6f7.jpg",
  },
  {
    name: "NƯỚC HOA NICHE",
    image:
      "https://i.pinimg.com/736x/e7/f3/dd/e7f3dd66bc1b1efc36eda71a71fea770.jpg",
  },
  {
    name: "NƯỚC HOA MINI",
    image:
      "https://i.pinimg.com/474x/5a/0e/94/5a0e9496bc8328f428bfd4b83a276efe.jpg",
  },
  {
    name: "GIFTSET",
    image:
      "https://i.pinimg.com/736x/b0/17/b7/b017b79a68f2440ccec36c2fd973a823.jpg",
  },
  {
    name: "BODYMIX",
    image:
      "https://i.pinimg.com/236x/57/75/0c/57750cd23485d79840c445d48d42b9ae.jpg",
  },
  {
    name: "NƯỚC HOA CHIẾT",
    image:
      "https://i.pinimg.com/236x/54/ec/02/54ec02a82491f881cc6a5db009ee9e20.jpg",
  },
];

const CategoryList: React.FC = () => {
  return (
    <section className="py-10 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">DANH MỤC SẢN PHẨM</h2>
      <div className="flex justify-center overflow-x-auto gap-10 px-6">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center w-[120px]">
            <img
              src={category.image}
              alt={category.name}
              className="w-[100px] h-[100px] rounded-full object-cover border-2 border-gray-300"
            />
            <h3 className="text-[12px] font-medium flex-r text-center mt-2 ">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
