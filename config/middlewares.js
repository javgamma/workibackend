// module.exports = [
//   'strapi::logger',
//   'strapi::errors',
//   'strapi::security',
//   'strapi::cors',
//   'strapi::poweredBy',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   'strapi::favicon',
//   'strapi::public',
// ];


module.exports = [
  // Logs all HTTP requests (útil para desarrollo)
  'strapi::logger',

  // Manejo global de errores
  'strapi::errors',

  // Seguridad HTTP Headers (usa Helmet internamente)
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src':["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:','market-assets.strapi.io', 'res.cloudinary.com','https:'],
          'media-src': [
            "'self'",
             'data:',
             'blob:',
             'market-assets.strapi.io',
             'res.cloudinary.com',
             'https:'],
          'script-src': ["'self'", "'unsafe-inline'", 'https:'],
        },
      },
      crossOriginEmbedderPolicy: false, // Desactiva si usas blobs o iframes
    },
  },

  // CORS: permite acceso cruzado (ajusta los dominios si tienes frontend separado)
  {
    name: 'strapi::cors',
    config: {
      origin: ['*'], // Solo en desarrollo, permite todo
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: false,
    },
  },

  // Quita el header X-Powered-By
  'strapi::poweredBy',

  // Permite modificar y filtrar queries de los requests
  'strapi::query',

  // Parseo del cuerpo de las peticiones (JSON, form, etc.)
  'strapi::body',

  // Si usas sesiones (no es común en APIs REST modernas)
  'strapi::session',

  // Favicon para el admin panel
  'strapi::favicon',

  // Servir archivos estáticos (uploads)
  'strapi::public',
];
