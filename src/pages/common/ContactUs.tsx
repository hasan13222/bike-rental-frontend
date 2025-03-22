import ContactForm from "@/components/form/ContactForm";
import { MdOutlineLocationSearching } from "react-icons/md";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";

export default function ContactUs() {
    return (
        <>
            <div className="container py-8 mx-auto">
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Contact Us
                </h2>
                <div className="mt-1 flex flex-wrap gap-8">
                    <div className="contact__address">
                        <p>
                            We’d love to hear from you! Whether you have questions about our
                            bike rentals, need help planning your next ride, or just want to
                            say hi, we’re here for you. Feel free to reach out to us through
                            any of the following ways. For quick inquiries, just fill out the
                            contact form below, and we’ll get back to you as soon as possible.
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
                                <p className="text-base font-medium">BikeRental@email.com</p>
                            </li>
                            <li className="flex items-center gap-2 mb-2">
                                <FaMobileAlt className="text-xl text-primary" />
                                <p className="text-base font-medium">01XXX859587</p>
                            </li>
                        </ul>
                    </div>

                    <div className="min-w-[500px]">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </>
    )
}
