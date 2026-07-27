import React from 'react'

const FooterPagination = ({ currentPage, setCurrentPage, totalPages }) => {
    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    const handleGoToPage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            <button
                type="button"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => handleGoToPage(page)}
                    className={`px-3 py-1.5 text-sm rounded border ${page === currentPage
                        ? 'bg-blue-50 border-blue-300 text-blue-700 font-medium'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    )
}

export default FooterPagination