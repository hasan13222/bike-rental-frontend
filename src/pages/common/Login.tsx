import LoginForm from "@/components/form/LoginForm";

const Login = () => {
  return (
    <>
      <div className="container py-8 mx-auto">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Login
        </h2>
        <div className="mt-1 flex gap-8">
          <div className="min-w-[500px]">
            <LoginForm />
          </div>
          <div className="signup_image">
            <img className="h-[250px] object-contain" src="/login.svg" alt="signup" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
