const filtrosDisponibles = [
  {
    id: 'gafas',
    nombre: 'Gafas',
    color: 'rgb(255, 220, 203)',
    widthFactor: 1.3,
    aspectRatio: 2,
    verticalFactor: 0.38,
    horizontalFactor: 0,
    imagen: require('../../assets/gafas-filtro.png'),
  },

  {
    id: 'sombrero',
    nombre: 'Sombrero de paja',
    color: 'rgb(255, 231, 168)',
    widthFactor: 1.3,
    aspectRatio: 1.4,
    verticalFactor: -0.15,
    horizontalFactor: 0,
    imagen: require('../../assets/sombrero-filtro.png'),
  },

  {
    id: 'monoculo',
    nombre: 'Monóculo',
    color: 'rgb(241, 228, 212)',
    widthFactor: 0.45,
    aspectRatio: 1,
    verticalFactor: 0.43,
    horizontalFactor: 0.22,
    imagen: require('../../assets/monoculo-filtro.png'),
  },

  {
    id: 'corbata',
    nombre: 'Corbata roja',
    color: 'rgb(255, 211, 218)',
    widthFactor: 0.65,
    aspectRatio: 0.65,
    verticalFactor: 1.8,
    horizontalFactor: 0,
    imagen: require('../../assets/corbata-filtro.png'),
  },

  {
    id: 'bigote',
    nombre: 'Bigote',
    color: 'rgb(238, 230, 223)',
    widthFactor: 1.0,
    aspectRatio: 2.4,
    verticalFactor: 0.70,
    horizontalFactor: 0,
    imagen: require('../../assets/bigote-filtro.png'),
  }
];

export default filtrosDisponibles;