export const StoreHistory = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Nuestra Historia</h2>
            <div className="w-24 h-1 bg-red-600"></div>
            <p className="text-gray-600 leading-relaxed text-lg">
              Desde hace años, nuestro comedor es el corazón de la comunidad estudiantil 
              del Otto Krause. Con Mario al frente, ofrecemos comida casera preparada 
              con amor y dedicación.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Cada plato está pensado para brindar energía y satisfacción a nuestros 
              estudiantes, manteniendo siempre precios accesibles sin sacrificar calidad.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 overflow-hidden">
            <img 
              src="/Mario.jpg" 
              alt="Mario en su cocina" 
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};