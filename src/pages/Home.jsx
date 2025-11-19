import { Grid2x2, LogIn, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">

			{/* BANNER */}
			<section
				className="relative h-screen bg-cover bg-center flex items-center justify-center"
				style={{
					backgroundImage:
						"url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1920')",
				}}
			>
				<h1 className="text-5xl font-bold text-white drop-shadow-lg">
					¡Bienvenidos!
				</h1>

				<div className="
					absolute 
					bottom-[10rem]          /* Baja las cards para que queden sobre el borde del banner */
					left-1/2 
					translate-x-[-50%] 
					grid grid-cols-1 md:grid-cols-3 
					gap-8 
					max-w-6xl 
					w-full 
					px-6">

					<Link to="/login">
						<div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer hover:bg-gray-700 transition">
							<LogIn size={40} className="text-emerald-400 mb-3" />
							<h3 className="text-gray-300 text-xl font-semibold mb-3">Ingresa a tu cuenta</h3>
							<p className="text-gray-300">
								Disfruta de ofertas y compra tus productos favoritos.
							</p>
						</div>
					</Link>

					<Link to="/login">
						<div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer hover:bg-gray-700 transition">
					{/* <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center"> */}
						<TrendingUp size={40} className="text-emerald-400 mb-3" />
						<h3 className="text-gray-300 text-xl font-semibold mb-3">Más vendidos</h3>
						<p className="text-gray-300">
							Explora los productos que son tendencia y más populares.
						</p>
					</div>
					</Link>

					<Link to="/category">
						<div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer hover:bg-gray-700 transition">
							<Grid2x2 size={40} className="text-emerald-400 mb-3" />
							<h3 className="text-gray-300 text-xl font-semibold mb-3">Nuestras Categorías</h3>
							<p className="text-gray-300">
								Encontra celulares, ropa, inmuebles y mucho más.
							</p>
						</div>
					</Link>
				</div>
			</section>

			{/* <main className="flex-1 bg-gray-900 text-white py-16 px-6">
			</main> */}

			{/* FOOTER */}
			<footer className="bg-gray-800 text-gray-300 py-10 px-6">
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

					{/* Atención al Cliente */}
					<div>
						<h4 className="text-lg font-semibold mb-2">Atención al cliente</h4>
						<p>0800 122 0338</p>
						<p>0810 999 3728</p>
						<p>LU-VI de 09:00 a 18:00</p>
						<p>SA de 9:00 a 13:00</p>
					</div>

					{/* Cobranzas */}
					<div>
						<h4 className="text-lg font-semibold mb-2">Cobranza de créditos</h4>
						<p>cobranzas@fravega.com.ar</p>
					</div>

					{/* Venta telefónica */}
					<div>
						<h4 className="text-lg font-semibold mb-2">Venta telefónica</h4>
						<p>0810 333 8700</p>
						<p>LU-VI de 8:00 a 20:00</p>
						<p>SA-DO-Feriados 9:00 a 21:00</p>
						<h4 className="text-lg font-semibold mt-4">Servicios a empresas</h4>
						<p>Ventas corporativas</p>
					</div>

				</div>
			</footer>
		</div>
	);
}



/*import { useEffect, useState } from "react";

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
	  const apiBaseUrl = import.meta.env.VITE_URL_BACK || 'http://localhost:3008';
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

export default Home;*/
