import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="flex h-screen">

      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/Mario.jpg')" }}
      />

      {/* Sección derecha (contenido) */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center">
              <div>
                <div className="text-center text-xs">O</div>
                <div className="text-center text-xs">K</div>
              </div>
            </div>
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
      </div>
    </div>
  );
};
