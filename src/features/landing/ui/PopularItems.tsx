import { Link } from "react-router-dom";

interface PopularItemsProps {
  isLogged: boolean
}

interface MenuItem {
  title: string;
  description: string;
  icon: string;
}

export const PopularItems = ({ isLogged } : PopularItemsProps) => {
  const highlights: MenuItem[] = [
    {
      title: "Comidas Caseras",
      description: "Empanadas, sándwiches y platos preparados con ingredientes frescos",
      icon: "🍽️"
    },
    {
      title: "Bebidas Frescas",
      description: "Gaseosas, jugos naturales y agua mineral",
      icon: "🥤"
    },
    {
      title: "Snacks y Golosinas",
      description: "Dulces, chocolates, galletitas y snacks variados",
      icon: "🍭"
    },
    {
      title: "Postres Caseros",
      description: "Postres dulces para cerrar el día perfecto",
      icon: "🍰"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Lo Más Popular</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos comidas caseras, bebidas frescas, postres dulces, snacks y mucho más
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center cursor-pointer"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            to={isLogged ? '/products' : '/auth'}
            className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg cursor-pointer"
          >
            {isLogged ? 'Ver' : 'Inicia sesión para ver'} el menú
          </Link>
        </div>
      </div>
    </section>
  );
};