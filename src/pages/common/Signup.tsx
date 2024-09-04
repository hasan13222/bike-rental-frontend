import SignupForm from "@/components/form/SignupForm";

const Signup = () => {
  return (
    <>
      <div className="container py-8 mx-auto">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Sign Up
        </h2>
        <div className="mt-1 flex gap-8">
          <div className="min-w-[500px]">
            <SignupForm />
          </div>
          <div className="signup_image">
            <img src="/signup.svg" alt="signup" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
