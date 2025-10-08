import { useEffect, useState } from "react";

function Home() {
  const [limit, setLimit] = useState(2);
  const [page, setPage] = useState(1);

  const subirLimite = () => {
    setLimit((limit) => limit + 1);
  };

  const bajarLimite = () => {
    setLimit((limit) => limit - 1);
  };

  const subirpage = () => {
    setPage((page) => page + 1);
  };

  const bajarpage = () => {
    setPage((page) => page - 1);
  };

  useEffect(() => {
    const fetchPaginado = async () => {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(
        `${apiBaseUrl}/api/products/paginado?limit=${limit}&page=${page}`
      );
      const datajson = await response.json();
      console.log(datajson);
    };

    fetchPaginado();
  }, [limit,page]);

  return (
    <div className="mt-16">
      <button className="mx-2" onClick={bajarpage}>volver pagina</button>
      <p className="mx-2">{page}</p>
      <button className="mx-2" onClick={subirpage}>avanzar pagina</button>
      <br />
      <br />
      <button className="mx-2" onClick={bajarLimite}>disminuir limite</button>
      <p className="mx-2">{limit}</p>
      <button className="mx-2" onClick={subirLimite}>
        aumentar limite
      </button>
    </div>
  );
}

export default Home;
