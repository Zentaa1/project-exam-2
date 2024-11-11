import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import register from "../functions/auth/register";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [venueManager, setvenueManager] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userData = { name, email, password, venueManager };
            const result = await register(userData);
            console.log(result);
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.error(error.message);
            } else {
              console.error("An unknown error occurred.");
            }
          }
          
    };
    


  return (
    <div className="container mx-auto flex justify-center items-center text-primary">
    <div className="flex flex-col shadow-md w-1/2 p-6 space-y-4 rounded-md">
        <h1 className="text-2xl font-bold text-left">Register</h1>
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
            <div className="flex flex-col text-left mt-3">
                <label className="text-xl font-medium">Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Confirm Password"
                    className="text-xl bg-inputBg p-2 rounded-md"
                />
            </div>
            <div className="flex flex-row text-left mt-3">
                <input
                    type="checkbox"
                    checked={venueManager}
                    onChange={(e) => setvenueManager(e.target.checked)}
                    placeholder="Confirm Password"
                    className="w-10 bg-inputBg p-2 rounded-md"
                />
                <label className="text-xl font-medium">Are you a host?</label>
            </div>
            <button type="submit" className="bg-customOrange w-full mt-5 font-bold text-xl p-2 rounded-md">Register</button>
            </form>
        <p className="text-left">Already have an account? <Link className="text-customOrange" to='/login'>Sign in here</Link></p>
    </div>
</div>
  )
}

export default Register