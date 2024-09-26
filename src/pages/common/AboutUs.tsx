const AboutUs = () => {
  return (
    <>
      <div className="about_us container mx-auto px-3 py-8">
        <h2 className="font-bold text-3xl mb-2 text-center">About Us</h2>
        <div className="teams">
          <h3 className="text-xl font-semibold my-5">Our Team</h3>
          <div className="members grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9">
            <div className="member flex flex-col items-center">
              <img
                className="w-[250px] object-cover h-[250px] rounded-full"
                src="/team/oph.png"
                alt="team member"
              />
              <p>Operation Head</p>
            </div>
            <div className="member flex flex-col items-center">
              <img
                className="w-[250px] object-cover h-[250px] rounded-full"
                src="/team/so1.png"
                alt="team member"
              />
              <p>Sales Officer</p>
            </div>
            <div className="member flex flex-col items-center">
              <img
                className="w-[250px] object-cover h-[250px] rounded-full"
                src="/team/so2.png"
                alt="team member"
              />
              <p>Sales Officer</p>
            </div>
            <div className="member flex flex-col items-center">
              <img
                className="w-[250px] object-cover h-[250px] rounded-full"
                src="/team/so3.png"
                alt="team member"
              />
              <p>Sales Officer</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center about_us">
          <div className="texts">
            <h3 className="text-xl font-semibold mt-2">Our Shop</h3>
            <p>
              Welcome to JBIKE, your trusted destination for bike rentals and
              cycling adventures! Established in 2024, we are a team of cycling
              enthusiasts and outdoor adventurers committed to providing you
              with the best quality bikes and equipment for all your biking
              needs.
            </p>
            <h3 className="text-xl font-semibold mt-2">Our Mission</h3>
            <p>
              At JBIKE, our mission is to inspire exploration and promote
              sustainable transportation through cycling. We believe biking is
              not only a fun way to stay active but also a great way to explore
              new places and reduce your carbon footprint. Our goal is to make
              biking accessible and enjoyable for everyone, from casual riders
              to seasoned cyclists.
            </p>
          </div>
          <div className="group_img p-8">
            <img
              className="h-[300px] object-contain"
              src="/bike.jpg"
              alt="about us"
            />
          </div>
        </div>
        <div className="about_btm">
          <h3 className="text-xl font-semibold mt-2">Our Products</h3>
          <p>
            We offer a wide range of bikes to suit different preferences and
            terrains, including: City Bikes: Ideal for commuting and casual
            rides around town Mountain Bikes: Built for off-road adventures
            Hybrid Bikes: Versatile options for both city streets and nature
            trails Electric Bikes: Eco-friendly and convenient for longer trips
            or challenging terrain Children’s Bikes: Safe and fun options for
            young riders Each bike is carefully maintained and inspected to
            ensure safety, comfort, and performance, allowing you to enjoy a
            smooth and worry-free ride.
          </p>

          <h3 className="text-xl font-semibold mt-2">Our Promise</h3>
          <p>
          We are dedicated to delivering top-notch customer service and an exceptional biking experience. Whether you're exploring the city, heading out on a weekend adventure, or looking for a family-friendly ride, our knowledgeable team is here to help you choose the perfect bike for your journey.
          </p>
          <h3 className="text-xl font-semibold mt-2">Our Vision</h3>
          <p>
          We aim to foster a biking community that values health, the environment, and adventure. At JBIKE, we believe in building lasting relationships with our customers and supporting initiatives that promote sustainable transportation and active lifestyles.
          </p>
          <h3 className="text-xl font-semibold mt-2">Our Store Location</h3>
          <p>15/2C, Heritage Home, East London, England</p>
          <h3 className="text-xl font-semibold mt-2">Our Contact Info</h3>
          <p>
            demo@mail.com
            <br />
            019524855455
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
