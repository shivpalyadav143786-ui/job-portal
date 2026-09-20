import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
    ArrowLeft,
    MapPin,
    IndianRupee,
    Building2,
    Users,
    Briefcase,
    CheckCircle
} from "lucide-react"

import Sidebar from "../components/Sidebar"

function JobDetails() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")


    useEffect(() => {

        fetch(`http://localhost:3000/jobs/${id}`)
            .then(res => {

                if (!res.ok) {
                    throw new Error("Failed to fetch job")
                }

                return res.json()
            })
            .then(data => {
                setJob(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })

    }, [id])


    return (
        <div className="flex min-h-screen">

            <Sidebar />

            <main className="flex-1 bg-gray-50 p-6">

                <button
                    onClick={() => navigate("/jobs")}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-5"
                >
                    <ArrowLeft size={18} />
                    Back to Jobs
                </button>


                {loading && (
                    <p className="text-gray-500">
                        Loading job details...
                    </p>
                )}


                {error && (
                    <p className="text-red-600">
                        {error}
                    </p>
                )}


                {!loading && !error && job && (

                    <div className="max-w-4xl bg-white border rounded-xl p-6">

                        {/* Header */}

                        <div className="flex justify-between items-start gap-4">

                            <div className="flex items-center gap-3">

                                <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                                    <Briefcase size={26} />
                                </div>

                                <div>

                                    <h1 className="text-2xl font-bold text-gray-800">
                                        {job.title}
                                    </h1>

                                    <p className="flex items-center gap-2 text-gray-500 mt-1">
                                        <Building2 size={16} />
                                        {job.company}
                                    </p>

                                </div>

                            </div>


                            <span
                                className={`text-sm px-3 py-1 rounded-full ${
                                    job.status === "Active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {job.status}
                            </span>

                        </div>


                        {/* Job Info */}

                        <div className="flex flex-wrap gap-6 mt-6 text-gray-600 text-sm">

                            <p className="flex items-center gap-2">
                                <MapPin size={17} />
                                {job.location}
                            </p>

                            <p className="flex items-center gap-2">
                                <IndianRupee size={17} />
                                {job.salary}
                            </p>

                            <p className="flex items-center gap-2">
                                <Users size={17} />
                                {job.applications} Applications
                            </p>

                        </div>


                        <hr className="my-6" />


                        {/* Description */}

                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            Job Description
                        </h2>

                        <p className="text-gray-600 leading-7">
                            {job.description}
                        </p>


                        {/* Skills */}

                        <h2 className="text-lg font-bold text-gray-800 mt-6 mb-3">
                            Required Skills
                        </h2>

                        <div className="flex flex-wrap gap-2">

                            {job.skills.map(skill => (

                                <span
                                    key={skill}
                                    className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm"
                                >
                                    <CheckCircle size={15} />
                                    {skill}
                                </span>

                            ))}

                        </div>


                        {/* Applications */}

                        <div className="mt-6 pt-5 border-t">

                            <p className="text-sm text-gray-500">
                                Total Candidate Applications
                            </p>

                            <p className="text-2xl font-bold text-gray-800 mt-1">
                                {job.applications}
                            </p>

                        </div>

                    </div>

                )}

            </main>

        </div>
    )
}

export default JobDetails