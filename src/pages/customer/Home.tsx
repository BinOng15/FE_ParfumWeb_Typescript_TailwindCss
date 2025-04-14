import React from "react";
import Carouselapp from "../../components/carousel/Carousel.Home";
import CarouselHomeProduct from "../../components/carousel/Carousel.HomeProduct";
import CategoryList from "../../components/category/CategoryList";
import ProductList from "../../components/product/ProductList";

const Home: React.FC = () => {
  return (
    <>

      <Carouselapp />
      <CarouselHomeProduct />
      <CategoryList />
      <ProductList />

    </>
  );
};

export default Home;
