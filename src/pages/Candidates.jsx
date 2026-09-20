import { useState, useEffect } from "react"
import { Users, Mail, Briefcase, UserCheck } from "lucide-react"

import Sidebar from "../components/Sidebar"

function Candidates() {

    const [candidates, setCandidates] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")


    // Update candidate status
    function handleStatusChange(id, status) {

        fetch(`http://localhost:3000/candidates/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update status")
                }

                return response.json()
            })
            .then(() => {

                setCandidates((prev) =>
                    prev.map((candidate) =>
                        candidate.id === id
                            ? { ...candidate, status }
                            : candidate
                    )
                )

            })
            .catch((error) => {
                setError(error.message)
            })
    }


    // Fetch candidates
    useEffect(() => {

        fetch("http://localhost:3000/candidates")
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to fetch candidates")
                }

                return response.json()
            })
            .then((data) => {
                setCandidates(data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setLoading(false)
            })

    }, [])


    return (
        <div className="flex min-h-screen">

            <Sidebar />

            <main className="flex-1 bg-gray-50 p-6">

                {/* Header */}

                <div className="mb-6">

                    <div className="flex items-center gap-3">

                        <Users className="text-blue-600" size={28} />

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Candidates
                            </h1>

                            <p className="text-sm text-gray-500">
                                Manage candidates and application status
                            </p>
                        </div>

                    </div>

                </div>


                {/* Loading */}

                {loading && (
                    <p className="text-gray-500">
                        Loading candidates...
                    </p>
                )}


                {/* Error */}

                {error && (
                    <p className="text-red-600 mb-4">
                        {error}
                    </p>
                )}


                {/* Candidate Cards */}

                {!loading && !error && (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {candidates.map((candidate) => (

                            <div
                                key={candidate.id}
                                className="bg-white border rounded-xl p-5"
                            >

                                {/* Candidate */}

                                <div className="flex items-center gap-3">

                                    <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                                        {candidate.name.charAt(0)}
                                    </div>

                                    <div>

                                        <h2 className="font-bold text-gray-800">
                                            {candidate.name}
                                        </h2>

                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <Mail size={14} />
                                            {candidate.email}
                                        </p>

                                    </div>

                                </div>


                                {/* Applied Job */}

                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">

                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <Briefcase size={15} />
                                        Applied Job
                                    </p>

                                    <p className="font-semibold mt-1">
                                        {candidate.appliedJob}
                                    </p>

                                </div>


                                {/* Status Dropdown */}

                                <div className="mt-4">

                                    <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                                        <UserCheck size={15} />
                                        Application Status
                                    </p>

                                    <select
                                        value={candidate.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                candidate.id,
                                                e.target.value
                                            )
                                        }
                                        className={`w-full border rounded-lg px-3 py-2 outline-none ${
                                            candidate.status === "Shortlisted"
                                                ? "bg-green-50 text-green-700 border-green-300"
                                                : candidate.status === "Rejected"
                                                ? "bg-red-50 text-red-700 border-red-300"
                                                : "bg-yellow-50 text-yellow-700 border-yellow-300"
                                        }`}
                                    >
                                        <option value="Pending">
                                            Pending
                                        </option>

                                        <option value="Shortlisted">
                                            Shortlisted
                                        </option>

                                        <option value="Rejected">
                                            Rejected
                                        </option>

                                    </select>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    )
}

export default Candidates