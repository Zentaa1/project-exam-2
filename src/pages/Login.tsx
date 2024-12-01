import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../functions/auth/login";
import { Helmet } from "react-helmet";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      await login(loginData);

      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center text-primary py-10">
      <Helmet>
      <title>Login - StayNest</title>
        <meta name="description" content="Log in to your account on Staynest to access personalized features and manage your settings." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="flex flex-col shadow-md w-full sm:w-3/4 md:w-3/4 lg:w-2/3 xl:w-1/2 p-6 space-y-4 rounded-md">
        <h1 className="text-2xl font-bold text-left">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col text-left">
            <label className="text-xl font-medium">E-Mail:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mariusbje@stud.noroff.no"
              className="text-xl bg-inputBg p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col text-left mt-3">
            <label className="text-xl font-medium">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="text-xl bg-inputBg p-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-customOrange w-full mt-5 font-bold text-xl p-2 rounded-md"
          >
            Login
          </button>
        </form>
        <p className="text-left mt-3">
          Don&apos;t have an account?{" "}
          <Link className="text-customOrange" to="/register">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
