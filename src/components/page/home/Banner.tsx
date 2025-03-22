import { Button } from "@/components/ui/button";
import "@/styles/banner.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="banner container-fluid flex">
        <div className="banner__cont container text-center h-full bg-[rgba(0,0,0,0.3)] flex flex-col justify-center">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-bgclr">
              Ignite Your Ride, Explore More
            </h1>
            <p className="scroll-m-20 text-base text-bgclr my-3">
              Ready to explore? Find the perfect bike and start your adventure
              today!
            </p>
            {/* <BannerSearch/> */}
            <Button onClick={() => navigate('/bikes')} className="bg-primary text-bgclr">Explore Our Collection</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
