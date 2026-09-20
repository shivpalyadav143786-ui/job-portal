import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, MapPin, IndianRupee, Eye, Briefcase } from "lucide-react"

import Sidebar from "../components/Sidebar"

function Jobs() {

    const [jobs, setJobs] = useState([])
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("All")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const navigate = useNavigate()


    // Fetch jobs
    useEffect(() => {

        fetch("https://job-portal-r4b6.onrender.com/jobs")
            .then(res => {

                if (!res.ok) {
                    throw new Error("Failed to fetch jobs")
                }

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

    }, [])


    // Change job status
    function handleStatusChange(id, newStatus) {

       fetch(`https://job-portal-r4b6.onrender.com/jobs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: newStatus
            })
        })
            .then(res => {

                if (!res.ok) {
                    throw new Error("Failed to update job status")
                }

                return res.json()
            })
            .then(updatedJob => {

                setJobs(prev =>
                    prev.map(job =>
                        job.id === updatedJob.id
                            ? updatedJob
                            : job
                    )
                )

            })
            .catch(err => setError(err.message))
    }


    // Search + status filter
    const filteredJobs = jobs.filter(job => {

        const matchesSearch = job.title
            .toLowerCase()
            .includes(search.toLowerCase())

        const matchesStatus =
            status === "All" || job.status === status

        return matchesSearch && matchesStatus
    })


    return (
        <div className="flex min-h-screen">

            <Sidebar />

            <main className="flex-1 bg-gray-50 p-6">

                <div className="mb-6">

                    <h1 className="text-2xl font-bold text-gray-800">
                        Jobs
                    </h1>

                    <p className="text-gray-500">
                        Manage and explore available job openings
                    </p>

                </div>


                {/* Search + Filter */}

                <div className="bg-white border rounded-xl p-4 mb-6">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                        <div className="md:col-span-2 relative">

                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search jobs by title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full border rounded-lg pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Closed">Closed</option>
                        </select>

                    </div>

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


                {!loading && !error && filteredJobs.length === 0 && (

                    <div className="bg-white border rounded-xl p-8 text-center">

                        <Briefcase
                            size={36}
                            className="mx-auto text-gray-400 mb-2"
                        />

                        <h2 className="font-semibold text-gray-700">
                            No jobs found
                        </h2>

                        <p className="text-sm text-gray-500">
                            Try changing your search or status filter.
                        </p>

                    </div>

                )}


                {!loading && !error && filteredJobs.length > 0 && (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {filteredJobs.map(job => (

                            <div
                                key={job.id}
                                className="bg-white border rounded-xl p-5"
                            >

                                <div className="flex justify-between items-start gap-3">

                                    <div>

                                        <h2 className="font-bold text-gray-800">
                                            {job.title}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            {job.company}
                                        </p>

                                    </div>


                                    {/* Status */}

                                    <select
                                        value={job.status}
                                        onChange={(e) =>
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

                                </div>


                                <button
                                    onClick={() => navigate(`/jobs/${job.id}`)}
                                    className="w-full mt-4 bg-gray-900 text-white rounded-lg py-2 flex items-center justify-center gap-2 text-sm hover:bg-gray-700"
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

export default Jobs