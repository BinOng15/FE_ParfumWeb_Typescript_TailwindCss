import React from "react";
import Carouselapp from "../../components/carousel/Carousel.Home";
import CarouselHomeProduct from "../../components/carousel/Carousel.HomeProduct";
import CategoryList from "../../components/category/CategoryList";
import ProductList from "../../components/product/ProductList";
import MainLayout from "../../layout/MainLayout";

const Home: React.FC = () => {
  return (
    <>
      <MainLayout>
        <Carouselapp />
        <CarouselHomeProduct />
        <CategoryList />
        <ProductList />
      </MainLayout>
    </>
  );
};

export default Home;
