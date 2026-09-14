import dell5440ChargerImg from '../assets/dell-latitude-5440-charger.webp';

export const products = [
  {
    id: 'charger-dell-5440-orig',
    name: 'Cargador original para notebook Dell Latitude 14 5440',
    category: 'Cargadores',
    price: 49.99,
    rating: 5.0,
    reviews: 186,
    image: dell5440ChargerImg,
    tag: 'Original Dell',
    specs: {
      Voltaje_Amperaje: '20V - 3.25A (65W)',
      Conector: 'USB Tipo C',
      Modelo_Laptop: 'Dell Latitude 14 5440',
      Garantía: '1 año oficial Dell'
    },
    description: 'Cargador original de fábrica para notebook Dell Latitude 14 5440. Salida de 20V - 3.25A (65W) con conector USB Tipo-C reversible y cable de alimentación de pared de alta resistencia.'
  },
  {
    id: 'mac-01',
    name: 'MacBook Pro 16" M3 Max (36GB / 1TB SSD)',
    category: 'Laptops & Mac',
    price: 3499.99,
    rating: 5.0,
    reviews: 240,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    tag: 'Más Vendido',
    specs: {
      Chip: 'Apple M3 Max (16-core CPU / 40-core GPU)',
      Memoria: '36GB Memoria Unificada',
      Almacenamiento: '1TB SSD Ultrarrápido',
      Pantalla: '16.2" Liquid Retina XDR 120Hz ProMotion',
      Batería: 'Hasta 22 horas de autonomía'
    },
    description: 'La laptop profesional definitiva. Diseñada con el chip M3 Max de Apple para ofrecer un rendimiento monstruoso en renderizado 3D, desarrollo e inteligencia artificial con eficiencia energética récord.'
  },
  {
    id: 'gpu-01',
    name: 'NVIDIA GeForce RTX 4090 OC 24GB GDDR6X',
    category: 'Componentes',
    price: 1899.99,
    rating: 4.9,
    reviews: 185,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
    tag: 'Top Rendimiento',
    specs: {
      Arquitectura: 'NVIDIA Ada Lovelace',
      Núcleos_CUDA: '16384',
      VRAM: '24 GB GDDR6X 384-bit',
      Reloj_Boost: '2625 MHz',
      TDP: '450W'
    },
    description: 'La tarjeta gráfica para juegos y creación más potente del mundo. Gráficos fotorrealistas con Ray Tracing de última generación y escalado acelerado por IA con DLSS 3.5.'
  },
  {
    id: 'mon-01',
    name: 'ASUS ROG Swift 32" 4K OLED 240Hz Gaming Monitor',
    category: 'Periféricos',
    price: 1299.99,
    rating: 4.9,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    tag: 'Recomendado',
    specs: {
      Panel: '32" QD-OLED 4K UHD (3840x2160)',
      Tasa_Refresco: '240Hz ultra fluido',
      Tiempo_Respuesta: '0.03ms GtG',
      Conectividad: 'HDMI 2.1, DisplayPort 1.4, USB-C 90W'
    },
    description: 'Experimenta imágenes cinematográficas sin precedentes. Colores negros absolutos, contraste infinito y tiempo de respuesta casi instantáneo para gaming competitivo y edición profesional.'
  },
  {
    id: 'cpu-01',
    name: 'AMD Ryzen 7 7800X3D Processor',
    category: 'Componentes',
    price: 389.99,
    rating: 4.8,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=800&q=80',
    tag: 'Más Vendido',
    specs: {
      Núcleos: '8 Núcleos / 16 Hilos',
      Caché_L3: '96MB 3D V-Cache',
      Frecuencia: '4.2 GHz Base / 5.0 GHz Turbo',
      Socket: 'AM5 PCIe 5.0'
    },
    description: 'El procesador indiscutible número 1 para gaming. Equipado con la tecnología AMD 3D V-Cache que maximiza los FPS y minimiza la latencia en los títulos más exigentes.'
  },
  {
    id: 'lap-02',
    name: 'Dell XPS 16 Touch (Core Ultra 9 / RTX 4070)',
    category: 'Laptops & Mac',
    price: 2899.99,
    rating: 4.7,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    tag: 'Diseño Premium',
    specs: {
      Procesador: 'Intel Core Ultra 9 185H NPU IA',
      Gráfica: 'NVIDIA RTX 4070 8GB',
      RAM: '32GB LPDDR5x',
      Pantalla: '16.3" 4K+ OLED Táctil'
    },
    description: 'El portátil con Windows de gama más alta. Fabricado en aluminio mecanizado CNC con cristal Gorilla Glass 3 y pantalla táctil OLED de resolución impresionante.'
  },
  {
    id: 'mou-01',
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    category: 'Periféricos',
    price: 99.99,
    rating: 4.9,
    reviews: 520,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    tag: 'Esencial',
    specs: {
      Sensor: '8000 DPI Darkfield funcional sobre cristal',
      Botones: 'Clicks silenciosos Quiet Clicks',
      Scroll: 'Desplazamiento electromagnético MagSpeed',
      Conectividad: 'Bluetooth / Logi Bolt (hasta 3 dispositivos)'
    },
    description: 'El ratón de productividad preferido por creadores y programadores de todo el mundo. Ergonomía avanzada, desplazamiento hiperrápido y botones silenciosos.'
  },
  {
    id: 'ssd-01',
    name: 'Samsung 990 PRO 4TB NVMe M.2 PCIe 4.0 SSD',
    category: 'Componentes',
    price: 329.99,
    rating: 4.9,
    reviews: 195,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    tag: 'Ultrarrápido',
    specs: {
      Lectura: 'Hasta 7450 MB/s',
      Escritura: 'Hasta 6900 MB/s',
      Capacidad: '4TB NVMe Gen 4.0',
      Disipador: 'Control térmico inteligente'
    },
    description: 'Velocidad extrema sin sobrecalentamiento. Ideal para la carga instantánea de videojuegos, edición de vídeo 8K y proyectos pesados.'
  },
  {
    id: 'pc-01',
    name: 'ADMO Studio Titan Pro Workstation',
    category: 'Gaming & PC Custom',
    price: 4299.99,
    rating: 5.0,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    tag: 'Flagship ADMO',
    specs: {
      CPU: 'Intel Core i9-14900KS (6.2 GHz)',
      GPU: 'NVIDIA RTX 4090 24GB Liquid Cooled',
      RAM: '64GB DDR5 RGB 6400MHz',
      Almacenamiento: '4TB NVMe Gen4 + 4TB HDD'
    },
    description: 'La computadora ensamblada por nuestros ingenieros expertos de ADMO. Enfriamiento líquido a medida, cableado impecable y calibración de rendimiento garantizada.'
  },
  {
    id: 'key-01',
    name: 'Keychron Q1 Max Custom Mechanical Keyboard',
    category: 'Periféricos',
    price: 219.99,
    rating: 4.8,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    tag: 'Custom',
    specs: {
      Cuerpo: 'Aluminio CNC 75% Gasket Mount',
      Conexión: '2.4GHz / Bluetooth 5.1 / USB-C',
      Switches: 'Gateron Jupiter Red Hot-swappable',
      Teclas: 'KSA Double-shot PBT'
    },
    description: 'Teclado mecánico premium inalámbrico con estructura de aluminio sólido, amortiguación acústica de múltiples capas y soporte completo con QMK/VIA.'
  },
  {
    id: 'pad-01',
    name: 'Apple iPad Pro 13" M4 OLED (1TB Ultra)',
    category: 'Laptops & Mac',
    price: 1899.99,
    rating: 4.9,
    reviews: 164,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    tag: 'Nuevo',
    specs: {
      Pantalla: '13" Tandem OLED Ultra Retina XDR',
      Chip: 'Apple M4 con Neural Engine 38 TOPS',
      Grosor: '5.1mm (el producto más delgado de Apple)',
      Accesorio: 'Compatible con Apple Pencil Pro y Magic Keyboard'
    },
    description: 'La tableta más avanzada jamás creada. Grosor ultrafino de 5.1 mm, pantalla Tandem OLED de brillo extremo y chip M4 para creativos y profesionales en movimiento.'
  },
  {
    id: 'charger-dell-01',
    name: 'Cargador Dell USB-C 65W Original (Latitude 5410 / 5440)',
    category: 'Cargadores',
    price: 49.99,
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    tag: 'Original Dell',
    specs: {
      Potencia: '65W USB Power Delivery',
      Conector: 'USB Type-C',
      Compatibilidad: 'Dell Latitude 5410, 5440, 5520, 7420, XPS 13',
      Voltaje: 'Auto-sensing 5V/9V/15V/20V (3.25A)',
      Garantía: '1 año de reemplazo directo'
    },
    description: 'Cargador original Dell 65W USB-C de alta calidad. Diseñado para laptops Dell Latitude 5410, 5440 y series corporativas. Incluye protección contra picos de voltaje y carga rápida inteligente.'
  },
  {
    id: 'charger-hp-01',
    name: 'Cargador HP Smart AC 65W Original (ProBook 440 / 640)',
    category: 'Cargadores',
    price: 45.99,
    rating: 4.9,
    reviews: 180,
    image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?auto=format&fit=crop&w=800&q=80',
    tag: 'Original HP',
    specs: {
      Potencia: '65W (19.5V - 3.33A)',
      Conector: 'Punta Azul Smart Pin 4.5mm',
      Compatibilidad: 'HP ProBook 440 (G1-G9), HP ProBook 640 (G1-G8), EliteBook 840',
      Cable: 'Cable de alimentación reforzado'
    },
    description: 'Cargador original HP Smart AC de 65W con punta azul. Compatible con las populares líneas HP ProBook 440, ProBook 640 y EliteBook. Garantiza máxima estabilidad energética.'
  },
  {
    id: 'charger-hp-02',
    name: 'Cargador HP USB-C 65W Laptop Charger (ProBook 440 / 640 G9)',
    category: 'Cargadores',
    price: 49.99,
    rating: 4.8,
    reviews: 115,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    tag: 'HP USB-C',
    specs: {
      Potencia: '65W USB-C Fast Charge',
      Conector: 'USB-C Reversible',
      Compatibilidad: 'HP ProBook 440 G8/G9, 640 G8/G9, EliteBook 800 Series, Spectre x360',
      Tecnología: 'HP Smart Power Management'
    },
    description: 'Cargador rápido HP USB-C de 65W. Diseñado para las últimas generaciones de HP ProBook 440 y 640, permitiendo recargar de forma segura y eficiente.'
  }
];
