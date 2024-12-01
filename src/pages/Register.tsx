import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import register from "../functions/auth/register";
import Modal from "../components/auth/RegisterConfirmation";
import { Helmet } from "react-helmet";

interface FormErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [venueManager, setvenueManager] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors: FormErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (/\s/.test(name)) {
      newErrors.name = "Name cannot contain spaces";
      valid = false;
    }

    if (!email.match(/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/)) {
      newErrors.email = "Email must be a valid @stud.noroff.no address";
      valid = false;
    }

    if (!password.match(/^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)) {
      newErrors.password = "Password must be at least 8 characters and contain at least one number";
      valid = false;
    }

    if (password !== confirmPass) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const userData = { name, email, password, venueManager };
        await register(userData);

        setSuccessMessage("User created successfully!");
        setShowModal(true);

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPass("");
        setvenueManager(false);

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred.");
        }
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <div className="container mx-auto flex justify-center items-center text-primary py-10">
      <Helmet>
        <title>Register - StayNest</title>
        <meta name="description" content="Create a new account on StayNest and start exploring our features today." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="flex flex-col shadow-md w-full sm:w-3/4 md:w-3/4 lg:w-2/3 xl:w-1/2 p-6 space-y-4 rounded-md">
        <h1 className="text-2xl font-bold text-left">Register</h1>
        {showModal && successMessage && (
          <Modal message={successMessage} onClose={handleModalClose} />
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col text-left">
            <label className="text-xl font-medium">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Marius Bjeglerud"
              className="text-xl bg-inputBg p-2 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="flex flex-col text-left mt-3">
            <label className="text-xl font-medium">E-Mail:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mariusbje@stud.noroff.no"
              className="text-xl bg-inputBg p-2 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="flex flex-col text-left mt-3">
            <label className="text-xl font-medium">Confirm Password:</label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confirm Password"
              className="text-xl bg-inputBg p-2 rounded-md"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div className="flex flex-row text-left mt-3">
            <input
              type="checkbox"
              checked={venueManager}
              onChange={(e) => setvenueManager(e.target.checked)}
              className="w-10 bg-inputBg p-2 rounded-md"
            />
            <label className="text-xl font-medium">Are you a host?</label>
          </div>
          <button
            type="submit"
            className="bg-customOrange w-full mt-5 font-bold text-xl p-2 rounded-md"
          >
            Register
          </button>
        </form>
        <p className="text-left mt-3">
          Already have an account?{" "}
          <Link className="text-customOrange" to="/login">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
