import Image from "next/image";
import Title from "./ui/Title";
import Slider from "react-slick";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 10000,
    appendDots: (dots) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 border bg-white rounded-full mt-10"></div>
    ),
  };

  return (
    <div className="h-screen w-full container mx-auto -mt-[88px]">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="relative h-full w-full">
          <Image
            src="/images/hero-bg.jpg" // You should replace this with a fitness/meal-related background image
            alt="Hero Background"
            layout="fill"
            priority
            objectFit="cover"
          />
        </div>
      </div>

      {/* Slider Content */}
      <Slider {...settings}>
        <div>
          <div className="mt-48 text-white flex flex-col items-start gap-y-10">
            <Title addClass="text-6xl sm:text-7xl">Eat Clean. Get Lean.</Title>
            <p className="text-sm sm:w-2/5 w-full">
              Customized meal plans and calorie-tracked healthy meals delivered
              to your doorstep. Build your body the sustainable way — without
              giving up taste.
            </p>
            <button className="btn-primary">Start Your Journey</button>
          </div>
        </div>
        <div>
          <div className="mt-48 text-white flex flex-col items-start gap-y-10">
            <Title addClass="text-6xl sm:text-7xl">Transform with Experts</Title>
            <p className="text-sm sm:w-2/5 w-full">
              Work with certified nutritionists and fitness coaches to transform
              your body and lifestyle. Tailored fitness + diet programs for your
              specific goals.
            </p>
            <button className="btn-primary">Get Personalized Plan</button>
          </div>
        </div>
        <div>
          <div className="mt-48 text-white flex flex-col items-start gap-y-10">
            <Title addClass="text-6xl sm:text-7xl">Real Food. Real Results.</Title>
            <p className="text-sm sm:w-2/5 w-full">
              No crash diets. No fads. Just real, balanced meals that support
              fat loss, muscle gain, and long-term health. Trusted by thousands
              across India.
            </p>
            <button className="btn-primary">Explore Our Meals</button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
