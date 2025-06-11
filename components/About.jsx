import Image from "next/image";
import Title from "./ui/Title";

const About = () => {
  return (
    <div className="bg-secondary py-14">
      <div className="container mx-auto flex items-center text-white gap-20 justify-center flex-wrap-reverse">
        <div className="flex justify-center">
          <div className="relative sm:w-[445px] sm:h-[600px]  flex justify-center w-[300px] h-[450px]">
            <Image src="/images/about-img.png" alt="About Raisinrich" layout="fill" />
          </div>
        </div>
        <div className="md:w-1/2">
          <Title addClass="text-[40px]">We Are Raisinrich</Title>
          <p className="my-5 flex flex-col items-center">
            At Raisinrich, we believe that health is not a destination—it's a lifestyle.
            Our mission is to empower individuals to live stronger, healthier, and more
            confident lives through personalized fitness, diet, and wellness programs.
            <br /><br />
            Backed by certified trainers, expert dietitians, and real results, we’ve helped
            hundreds transform not just their bodies—but their mindset and habits too.
            Whether you're looking to shed weight, gain strength, or simply feel more energetic,
            Raisinrich is your trusted partner in the journey to your best self.
          </p>
          <button className="btn-primary">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
