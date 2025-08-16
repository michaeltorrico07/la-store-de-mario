import { Link } from "react-router-dom"

export const EmployeesNavbar = () => {

  return (<>
    <nav className="bg-[#303030] text-white fixed top-0 left-0 right-0 z-50 drop-shadow-lg h-[8vh] max-h-[80px] min-h-[60px]">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 items-center h-full">
          {/* Navegación central */}
          <div className="flex items-center justify-center space-x-8 lg:space-x-12">
            <Link to="/delivery" className="text-white hover:text-gray-300 transition-colors font-medium whitespace-nowrap">
              Entrega
            </Link>
            <Link to="/kitchen" className="text-white hover:text-gray-300 transition-colors font-medium whitespace-nowrap">
              Cocina
            </Link>
            <Link to="/management" className="text-white hover:text-gray-300 transition-colors font-medium whitespace-nowrap">
              Gestión
            </Link>
            <Link to="/profile" className="text-white hover:text-gray-300 transition-colors font-medium whitespace-nowrap">
              Perfil
            </Link>
          </div>
        </div>
      </div>
    </nav>
    <div className="w-full h-[8vh] max-h-[80px] min-h-[60px]">Aguante Rem carajo I was here</div>
  </>)
}