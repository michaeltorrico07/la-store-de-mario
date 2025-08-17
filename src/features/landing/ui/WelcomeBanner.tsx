import { Link } from "react-router-dom";

interface WelcomeBannerProps {
  isLogged: boolean
}

export const WelcomeBanner = ({ isLogged } : WelcomeBannerProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-600 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-red-600 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-red-600 rounded-full"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20">
            <img 
              src="/EscudoOttoKrause.jpg" 
              alt="Escudo Otto Krause" 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Mario Store
          <span className="block text-red-600">Otto Krause</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Tu destino para comida casera, dulces, snacks y todo lo que necesitas. 
          Variedad, calidad y precios accesibles en el corazón del Otto Krause.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to={isLogged ? '/products' : '/auth'}
            className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
          >
            {isLogged ? 'Ver' : 'Inicia sesión para ver'} el menú
          </Link>
        </div>
      </div>
    </section>
  );
};