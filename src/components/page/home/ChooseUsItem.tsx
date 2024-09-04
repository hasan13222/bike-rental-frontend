import { RiCheckboxMultipleLine } from "react-icons/ri"
const ChooseUsItem = () => {
    return (
        <>
            <li className="flex items-center gap-2 mb-3">
              <RiCheckboxMultipleLine className="text-2xl text-primary"/>
              <p className="text-xl">Wide Range of Bikes</p>
            </li>
            <li className="flex items-center gap-2 mb-3">
              <RiCheckboxMultipleLine className="text-2xl text-primary"/>
              <p className="text-xl">Affordable Pricing</p>
            </li>
            <li className="flex items-center gap-2 mb-3">
              <RiCheckboxMultipleLine className="text-2xl text-primary"/>
              <p className="text-xl">Well-Maintained Equipment</p>
            </li>
            <li className="flex items-center gap-2 mb-3">
              <RiCheckboxMultipleLine className="text-2xl text-primary"/>
              <p className="text-xl">Easy Online Booking</p>
            </li>
            <li className="flex items-center gap-2 mb-3">
              <RiCheckboxMultipleLine className="text-2xl text-primary"/>
              <p className="text-xl">Flexible Return Options</p>
            </li>
            <li className="flex items-center gap-2 mb-3">
              <RiCheckboxMultipleLine className="text-2xl text-primary"/>
              <p className="text-xl">Complementary Gear</p>
            </li>
            <li className="flex items-center gap-2 mb-3">
              <RiCheckboxMultipleLine className="text-2xl text-primary"/>
              <p className="text-xl">Customer Satisfaction Guaranteed</p>
            </li>
        </>
    );
};

export default ChooseUsItem;