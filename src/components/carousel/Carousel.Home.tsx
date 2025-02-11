import React from 'react';
import { Carousel } from 'antd';

const Carouselapp: React.FC = () => {
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    return (
        <div className="w-5/5 mx-auto relative"> {/* Khung Carousel căn giữa */}
            <div className="overflow-hidden rounded-b-[50px] shadow-lg">
                <Carousel afterChange={onChange} autoplay autoplaySpeed={2000}> {/* Chuyển slide mỗi 1 giây */}
                    <div className="h-[500px]">
                        <img
                            src="https://curnonwatch.com/blog/wp-content/uploads/2022/10/nuoc-hoa-nam-mua-xuan-1.jpg"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="h-[500px]">
                        <img
                            src="https://www.gento.vn/wp-content/uploads/2023/05/nuoc-hoa-nam-thom-lau-13.jpg"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="h-[500px]">
                        <img
                            src="https://curnonwatch.com/blog/wp-content/uploads/2022/07/Slide16.jpeg"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="h-[500px]">
                        <img
                            src="https://xomthom.vn/wp-content/uploads/2023/12/nuoc-hoa-mua-dong-cho-nam.jpg"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default Carouselapp;
