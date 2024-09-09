import ContactForm from "@/components/form/ContactForm";
import Banner from "@/components/page/home/Banner";
import BikeCard from "@/components/page/home/BikeCard";
import { CarouselSlider } from "@/components/page/home/CarouselSlider";
import ChooseUsItem from "@/components/page/home/ChooseUsItem";
import { MdOutlineLocationSearching } from "react-icons/md";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";

import "@/styles/discount.css";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <>
      <Banner />

      {/* featured section */}
      <div className="container py-8">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Our Latest Bike
        </h2>
        <div className="bike__items grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-5">
          <BikeCard />
          <BikeCard />
          <BikeCard />
          <BikeCard />
          <BikeCard />
        </div>
      </div>

      {/* testimonial section */}
      <div className="container py-8 mx-auto">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Reviews
        </h2>
        <div className="px-14 mt-8">
          <CarouselSlider />
        </div>
      </div>

      {/* why choose us */}
      <div className="container py-8">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Why Choose Us
        </h2>
        <div className="chooseUs flex items-end">
          <ul className="chooseUs__items pl-8">
            <ChooseUsItem />
          </ul>
          <div className="img_wrapper -ml-5">
            <img
              className="max-h-[320px] object-contain"
              src="/customer.png"
              alt="smiling customer"
            />
          </div>
        </div>
      </div>

      {/* promotion */}
      <div className="container my-8 mx-auto text-center">
        <div className="discount rounded-md">
          <div className="bg-[rgba(37,93,42,0.7)] py-24 rounded-md">
            <h2 className="scroll-m-20 text-bgclr text-5xl italic font-semibold tracking-tight mb-5">
              Huge Discount Using Coupon Code
            </h2>
            <p className="text-2xl text-bgclr mb-3">
              Use Coupon code to get upto 30% discount of your bike rent.
            </p>
            <Button variant="outline">Spin Your Luck</Button>
          </div>
        </div>
      </div>

      {/* contact us section */}
      <div className="container py-8 mx-auto">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Contact Us
        </h2>
        <div className="mt-1 flex gap-8">
          <div className="contact__address">
            <p>
            We’d love to hear from you! Whether you have questions about our bike rentals, need help planning your next ride, or just want to say hi, we’re here for you. Feel free to reach out to us through any of the following ways. For quick inquiries, just fill out the contact form below, and we’ll get back to you as soon as possible.
            </p>
            <ul className="mt-2">
              <li className="flex items-center gap-2 mb-2">
                <MdOutlineLocationSearching className="text-xl text-primary" />
                <p className="text-base font-medium">
                  Level-2, Road 345, Rasulpur, Patuakhali, Dhaka, Bangladesh.
                </p>
              </li>
              <li className="flex items-center gap-2 mb-2">
                <IoMailOpenOutline className="text-xl text-primary" />
                <p className="text-base font-medium">
                  BikeRental@email.com
                </p>
              </li>
              <li className="flex items-center gap-2 mb-2">
                <FaMobileAlt className="text-xl text-primary" />
                <p className="text-base font-medium">
                  01XXX859587
                </p>
              </li>
            </ul>
          </div>

          <div className="min-w-[500px]">
            <ContactForm />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Home;
