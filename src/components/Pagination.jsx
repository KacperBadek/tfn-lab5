export default function Pagination({totalProducts, productsPerPage, currentPage, setCurrentPage}) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
            {Array.from({length: totalPages}, (_, index) => ( //'_' to current element, 'index' to current index
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    style={{
                        padding: '10px 20px',
                        margin: '0 5px',
                        cursor: 'pointer',
                        backgroundColor: currentPage === index + 1 ? '#007bff' : '#f1f1f1',
                        color: currentPage === index + 1 ? '#fff' : '#000',
                        border: '1px solid #ccc',
                    }}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
}