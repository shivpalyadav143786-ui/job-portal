const SummaryCard = ({ title, value, icon }) => {

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">

            <div className="flex justify-between items-center">

                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <p className="text-3xl font-bold text-gray-800 mt-2">
                        {value}
                    </p>
                </div>

                <div className="text-blue-600 bg-blue-50 p-3 rounded-lg">
                    {icon}
                </div>

            </div>

        </div>
    )
}

export default SummaryCard