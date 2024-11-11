import { FormEvent, useState } from "react";
import { Link } from "react-router-dom"
import login from "../functions/auth/login";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const loginData = { email, password };
            const result = await login(loginData);
            console.log(result);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occurred.");
            }
        }
    }


  return (
    <div className="container mx-auto flex justify-center items-center text-primary">
        <div className="flex flex-col shadow-md w-1/2 p-6 space-y-4 rounded-md">
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
                    <button type="submit" className="bg-customOrange text-xl w-full p-2 rounded-md mt-5">Login</button>
                </form>
            <p className="text-left">Dont have an account? <Link className="text-customOrange" to='/register'>Sign up here</Link></p>
        </div>
    </div>
  )
}

export default Login

