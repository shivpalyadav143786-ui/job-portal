import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Briefcase, Users, CircleCheck, CircleX, MapPin, IndianRupee, UsersRound, Eye } from "lucide-react"

import Sidebar from "../components/Sidebar"
import SummaryCard from "../components/SummaryCard"

function Dashboard() {

    const [jobs, setJobs] = useState([])
    const [candidates, setCandidates] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const navigate = useNavigate()


    useEffect(() => {

        fetch("http://localhost:3000/jobs")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch jobs")
                return res.json()
            })
            .then(data => {
                setJobs(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })

        fetch("http://localhost:3000/candidates")
            .then(res => res.json())
            .then(data => setCandidates(data))

    }, [])


    function handleStatusChange(id, status) {

        fetch(`http://localhost:3000/jobs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to update status")
                return res.json()
            })
            .then(() => {
                setJobs(prev =>
                    prev.map(job =>
                        job.id === id ? { ...job, status } : job
                    )
                )
            })
            .catch(err => setError(err.message))
    }


    return (
        <div className="flex min-h-screen">

            <Sidebar />

            <main className="flex-1 bg-gray-50 p-6">

                <h1 className="text-2xl font-bold text-gray-800">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-1 mb-6">
                    Welcome back! Here's what's happening with your jobs.
                </p>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    <SummaryCard
                        title="Jobs"
                        value={jobs.length}
                        icon={<Briefcase size={24} />}
                    />

                    <SummaryCard
                        title="Candidates"
                        value={candidates.length}
                        icon={<Users size={24} />}
                    />

                    <SummaryCard
                        title="Active Jobs"
                        value={jobs.filter(job => job.status === "Active").length}
                        icon={<CircleCheck size={24} />}
                    />

                    <SummaryCard
                        title="Closed Jobs"
                        value={jobs.filter(job => job.status === "Closed").length}
                        icon={<CircleX size={24} />}
                    />

                </div>


                <div className="flex justify-between items-center mt-8 mb-4">

                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Recent Jobs
                        </h2>

                        <p className="text-sm text-gray-500">
                            Latest job openings
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/jobs")}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        View All
                    </button>

                </div>


                {loading && (
                    <p className="text-gray-500">
                        Loading jobs...
                    </p>
                )}

                {error && (
                    <p className="text-red-600 mb-4">
                        {error}
                    </p>
                )}


                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {jobs.slice(0, 3).map(job => (

                            <div
                                key={job.id}
                                className="bg-white border rounded-xl p-5"
                            >

                                <div className="flex justify-between items-start gap-3">

                                    <div>
                                        <h3 className="font-bold text-gray-800">
                                            {job.title}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            {job.company}
                                        </p>
                                    </div>

                                    <select
                                        value={job.status}
                                        onChange={e =>
                                            handleStatusChange(
                                                job.id,
                                                e.target.value
                                            )
                                        }
                                        className={`text-xs border rounded-lg px-2 py-1 outline-none ${
                                            job.status === "Active"
                                                ? "bg-green-50 text-green-700 border-green-300"
                                                : "bg-red-50 text-red-700 border-red-300"
                                        }`}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Closed">Closed</option>
                                    </select>

                                </div>


                                <div className="mt-4 space-y-2 text-sm text-gray-600">

                                    <p className="flex items-center gap-2">
                                        <MapPin size={16} />
                                        {job.location}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <IndianRupee size={16} />
                                        {job.salary}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <UsersRound size={16} />
                                        {job.applications} Applications
                                    </p>

                                </div>


                                <button
                                    onClick={() => navigate(`/jobs/${job.id}`)}
                                    className="w-full mt-4 border rounded-lg py-2 text-sm hover:bg-gray-100 flex items-center justify-center gap-2"
                                >
                                    <Eye size={16} />
                                    View Details
                                </button>

                            </div>

                        ))}

                    </div>
                )}

            </main>

        </div>
    )
}

export default Dashboard