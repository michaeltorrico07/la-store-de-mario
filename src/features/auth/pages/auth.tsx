import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export const Auth = () => {
  return (
    <>
      <div className="flex h-screen">

        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/Mario.jpg')" }}
        />

        {/* Sección derecha (contenido) */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <div className="w-full max-w-md px-8">
            {/* Logo */}
            <div className="flex justify-center mb-6 w-full h-20">
              <img src="/EscudoOttoKrause.jpg" alt="Escudo Otto Krause" />
            </div>

            {/* Título y descripción */}
            <h1 className="text-3xl font-bold mb-4 text-center">Bienvenido</h1>
            <p className="text-center mb-8">Selecciona una opción para continuar</p>

            {/* Botones */}
            <div className="space-y-4">
              <Link to="/login" className="block">
                <button className="w-full py-3 bg-red-600 text-white rounded-md cursor-pointer">
                  Iniciar sesión
                </button>
              </Link>
              <Link to="/register" className="block">
                <button className="w-full py-3 bg-gray-200 text-black rounded-md cursor-pointer">
                  Registrarse
                </button>
              </Link>
            </div>
          </div>
          <Link to={'/'} className='absolute top-3 left-3 text-white bg-red-500 hover:bg-red-700 p-3 rounded-md font-semibold'><ArrowLeft /></Link>
        </div>
      </div>
    </>
  );
};
