export const LandingFooter = () => {
  const teamMembers = [
    "Adrian De Sousa",
    "Michael Torrico", 
    "Facundo Soto",
    "Gian Marcos Esparragoza",
    "Tomas Andrada"
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Horarios - Lado izquierdo */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Horarios</h4>
            <div className="space-y-3 text-gray-400">
              <div>
                <p className="font-medium text-white">Recreos Mañana</p>
                <p className="text-sm">9:05 y 10:40</p>
              </div>
              <div>
                <p className="font-medium text-white">Almuerzo</p>
                <p className="text-sm">12:00 - 13:30</p>
              </div>
              <div>
                <p className="font-medium text-white">Recreos Tarde</p>
                <p className="text-sm">14:50 y 16:20</p>
              </div>
            </div>
          </div>

          {/* Logo y descripción - Lado derecho */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 mr-4 bg-white rounded-lg p-1">
                <img 
                  src="/EscudoOttoKrause.jpg" 
                  alt="Escudo Otto Krause" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Mario Store Otto Krause</h3>
                <p className="text-gray-400 text-sm">Alimentando futuros técnicos</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Somos el store oficial de la Escuela Técnica Otto Krause, 
              ofreciendo comida casera, dulces, snacks, bebidas y todo lo que 
              nuestra comunidad estudiantil necesita a precios accesibles.
            </p>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        {/* Equipo de desarrollo */}
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-4">Desarrollado por</h4>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {teamMembers.map((member, index) => (
              <span 
                key={index}
                className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {member}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            Estudiantes de 6to año - Especialidad Informática
          </p>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p>© 2024 Mario Store Otto Krause. Todos los derechos reservados.</p>
          <p className="mt-2">Hecho con ❤️ para nuestra comunidad estudiantil</p>
        </div>
      </div>
    </footer>
  );
};