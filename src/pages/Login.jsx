import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Briefcase, Mail, Lock, LogIn } from "lucide-react"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function handleLogin(e) {
        e.preventDefault()

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/

        if (!email) {
            alert("Email is required")
            return
        }
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address")
            return
        }
        if (!password) {
            alert("Password is required")
            return
        }
        if (!passwordRegex.test(password)) {
            alert("Password must be at least 6 characters with one uppercase, one lowercase and one number")
            return
        }
        localStorage.setItem("isLoggedIn", "true")
        navigate("/dashboard")
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

            <div className="w-full max-w-md">

                <div className="text-center mb-6">
                    <Briefcase className="mx-auto mb-3 text-blue-600" size={36} />

                    <h1 className="text-2xl font-bold text-gray-800">
                        Job Portal </h1>

                    <p className="text-gray-500 text-sm mt-1">
                        Login to manage your jobs and candidates </p>
                </div>

                <div className="bg-white border rounded-xl p-6 shadow-sm">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Welcome Back </h2>

                    <p className="text-gray-500 text-sm mt-1 mb-5">
                        Enter your details to continue  </p>

                    <form onSubmit={handleLogin} className="space-y-4">

                        
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border rounded-lg pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Password
                            </label>

                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border rounded-lg pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700" >
                            <LogIn size={18} />
                            Login
                        </button>

                    </form>
                </div>

                <p className="text-center text-gray-400 text-sm mt-5">
                    Job Portal Dashboard</p>

            </div>
        </div>
    )
}

export default Login