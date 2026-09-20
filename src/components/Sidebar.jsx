import { Link } from "react-router-dom"

function Sidebar() {
    return (
        <div className="w-64 min-h-screen shrink-0 bg-gray-900 text-white p-6">

            <h2 className="text-2xl font-bold mb-8">
                Job Portal
            </h2>

            <nav className="flex flex-col gap-3">

                <Link
                    to="/dashboard"
                    className="px-4 py-3 rounded-lg hover:bg-gray-700">Dashboard
                </Link>

                <Link
                    to="/jobs"
                    className="px-4 py-3 rounded-lg hover:bg-gray-700">Jobs
                </Link>

                <Link
                    to="/candidates"
                    className="px-4 py-3 rounded-lg hover:bg-gray-700">Candidates
                </Link>

                <Link
                    to="/profile"
                    className="px-4 py-3 rounded-lg hover:bg-gray-700">Profile
                </Link>
            </nav>
        </div>
    )
}

export default Sidebar