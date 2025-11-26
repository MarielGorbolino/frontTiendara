function Paginado({ page, totalPages, setPage } ) {
  return (<div className="flex justify-center items-center gap-4 mt-10">
            <button
              className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-40"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ⬅ Anterior
            </button>

            <span className="text-white text-lg">
              Página {page} de {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-40"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Siguiente ➡
            </button>
          </div>);
}

export default Paginado;