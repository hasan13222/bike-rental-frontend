import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container w-svh h-svh flex flex-col justify-center items-center gap-4">
            <p className="text-2xl font-semibold">404. Page Not Found</p>
            <p>Go to <Link className="text-primary" to='/'>Home</Link></p>
        </div>
    );
};

export default NotFound;