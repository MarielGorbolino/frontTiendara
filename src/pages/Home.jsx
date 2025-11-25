import { Grid2x2, LogIn, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import portada from "../assets/ElectronicC.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <section
        className="
    relative 
    h-screen 
    bg-cover 
    bg-center 
    flex 
    items-start
    justify-center 
    pt-32
  "
       style={{ backgroundImage: `url(${portada})` }}

      >
        <h1
          className="
      text-3xl
      sm:text-4xl
      md:text-5xl
      lg:text-6xl
      xl:text-7xl
      font-bold 
      text-white 
      drop-shadow-lg
      text-center
      px-4
    "
        >
          ¡Bienvenidos!
        </h1>

        <div
          className="
      absolute 
      bottom-[3rem]
      left-1/2 
      -translate-x-1/2 
      grid grid-cols-1 md:grid-cols-2
      gap-8 
      max-w-6xl 
      w-full 
      px-6
    "
        >
          <Link to="/products">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer hover:bg-gray-700 transition">
              <TrendingUp size={40} className="text-emerald-400 mb-3" />
              <h3 className="text-gray-300 text-xl font-semibold mb-3">
                Nuestros Productos
              </h3>
              <p className="text-gray-300">
                Explora los productos que son tendencia y más populares.
              </p>
            </div>
          </Link>

          <Link to="/category">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer hover:bg-gray-700 transition">
              <Grid2x2 size={40} className="text-emerald-400 mb-3" />
              <h3 className="text-gray-300 text-xl font-semibold mb-3">
                Nuestras Categorías
              </h3>
              <p className="text-gray-300">
                Encontra celulares, ropa, inmuebles y mucho más.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-300 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Atención al cliente</h4>
            <p>0800 122 0338</p>
            <p>0810 999 3728</p>
            <p>LU-VI de 09:00 a 18:00</p>
            <p>SA de 9:00 a 13:00</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Cobranza de créditos</h4>
            <p>cobranzas@tiendara.com.ar</p>
          </div>

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
