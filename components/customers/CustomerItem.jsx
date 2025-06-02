import Image from "next/image";

const CustomerItem = ({ imgSrc }) => {
  return (
    <div className="mt-5 mx-4">
      <div className="p-6 bg-secondary text-white rounded-[5px]">
        <p>
          I’ve lost 9 kilos in just 12 weeks with their clean meals and expert
          coaching. The food is delicious, filling, and fits perfectly into my
          calorie goals. Highly recommend to anyone serious about transforming
          their body.
        </p>
        <div className="flex flex-col mt-4">
          <span className="text-lg font-semibold">Aarav Mehta</span>
          <span className="text-[15px]">Software Engineer, Bengaluru</span>
        </div>
      </div>

      <div
        className="relative w-28 h-28 border-4 border-primary rounded-full mt-8 before:content-[''] before:absolute before:top-0 
        flex justify-center before:-translate-y-3 before:rotate-45 before:bg-primary before:w-5 before:h-5"
      >
        <Image
          src={imgSrc}
          alt="Customer Testimonial"
          layout="fill"
          objectFit="contain"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default CustomerItem;
