import { useNavigate } from "react-router-dom"
import { User, Mail, ShieldCheck, LogOut, Settings } from "lucide-react"

import Sidebar from "../components/Sidebar"

function Profile() {

    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem("isLoggedIn")
        navigate("/login")
    }

    return (
        <div className="flex min-h-screen">

            <Sidebar />

            <main className="flex-1 bg-gray-50 p-6">

                <div className="max-w-3xl">

                    <div className="flex items-center gap-3 mb-6">

                        <Settings className="text-blue-600" size={28} />

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Profile & Settings
                            </h1>

                            <p className="text-sm text-gray-500">
                                Manage your profile and account
                            </p>
                        </div>

                    </div>


                    {/* Profile */}

                    <div className="bg-white border rounded-xl p-6">

                        <div className="flex items-center gap-4">

                            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">
                                S
                            </div>

                            <div>

                                <h2 className="text-xl font-bold text-gray-800">
                                    Shivpal Yadav
                                </h2>

                                <p className="text-gray-500">
                                    Job Portal Administrator
                                </p>

                            </div>

                        </div>


                        <hr className="my-6" />


                        {/* User Information */}

                        <div className="space-y-5">

                            <div className="flex items-center gap-3">

                                <User size={20} className="text-gray-500" />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Full Name
                                    </p>

                                    <p className="font-semibold text-gray-800">
                                        Shivpal Yadav
                                    </p>
                                </div>

                            </div>


                            <div className="flex items-center gap-3">

                                <Mail size={20} className="text-gray-500" />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email Address
                                    </p>

                                    <p className="font-semibold text-gray-800">
                                        shivpal@example.com
                                    </p>
                                </div>

                            </div>


                            <div className="flex items-center gap-3">

                                <ShieldCheck size={20} className="text-gray-500" />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Account Status
                                    </p>

                                    <p className="font-semibold text-green-600">
                                        Active
                                    </p>
                                </div>

                            </div>

                        </div>


                        <hr className="my-6" />


                        {/* Logout */}

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>

                    </div>

                </div>

            </main>

        </div>
    )
}

export default Profile