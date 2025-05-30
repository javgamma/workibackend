// // 'use strict';

// // /**
// //  * cita controller
// //  */

// // const { createCoreController } = require('@strapi/strapi').factories;

// // module.exports = createCoreController('api::cita.cita');

// 'use strict';

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::cita.cita', ({ strapi }) => ({

// async findOne(ctx) {
//     const { id } = ctx.params;

//     const entity = await strapi.entityService.findOne('api::cita.cita', id, {
//       populate: ['professional'], // <-- clave: usar el nombre correcto
//     });

//     if (!entity) {
//       return ctx.notFound('Cita no encontrada');
//     }

//     return this.transformResponse(entity);
//   },

//   async delete(ctx) {
//     const { id } = ctx.params;

//     const entity = await strapi.entityService.delete('api::cita.cita', id);

//     return { message: `Cita con ID ${id} eliminada correctamente`, data: entity };
//   },

//   async update(ctx) {
//     const { id } = ctx.params;
//     const { data } = ctx.request.body;

//     // Aquí puedes validar campos antes de actualizar si lo necesitas

//     const updatedCita = await strapi.entityService.update('api::cita.cita', id, {
//       data,
//       populate: ['professional'] // O lo que quieras devolver tras actualizar
//     });

//     return { message: `Cita actualizada correctamente`, data: updatedCita };
//   }
// }));


'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cita.cita', ({ strapi }) => ({

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.entityService.findOne('api::cita.cita', id, {
      populate: ['professional'],
    });

    if (!entity) {
      return ctx.notFound('Cita no encontrada');
    }

    return this.transformResponse(entity);
  },

  async delete(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.entityService.delete('api::cita.cita', id);

    return { message: `Cita con ID ${id} eliminada correctamente`, data: entity };
  },

  // *** MODIFICACIÓN CLAVE AQUÍ PARA DEPURAR EL UPDATE ***
  async update(ctx) {
    const { id } = ctx.params; // El ID que viene en la URL (ej. 26)
    const { data } = ctx.request.body; // Los datos del cuerpo de la petición (ej. { fechaHora: "...", estado: "..." })

    // --- LOGS EN EL SERVIDOR STRAPI ---
    console.log("--------------------------------------------------");
    console.log(`[CITA CONTROLLER] Iniciando operación UPDATE para ID: ${id}`);
    console.log(`[CITA CONTROLLER] Datos recibidos en el cuerpo:`, JSON.stringify(data, null, 2));
    console.log("--------------------------------------------------");
    // --- FIN LOGS EN EL SERVIDOR STRAPI ---

    try {
      const updatedCita = await strapi.entityService.update('api::cita.cita', id, {
        data,
        populate: ['professional'] // Simplificado para la depuración
      });

      // --- LOGS DESPUÉS DE LA OPERACIÓN DE ACTUALIZACIÓN ---
      console.log("--------------------------------------------------");
      console.log(`[CITA CONTROLLER] Resultado de strapi.entityService.update para ID ${id}:`);
      console.log(JSON.stringify(updatedCita, null, 2)); // Muestra el objeto completo retornado
      console.log("--------------------------------------------------");
      // --- FIN LOGS DESPUÉS DE LA OPERACIÓN DE ACTUALIZACIÓN ---

      if (!updatedCita) {
        // Esto debería ocurrir si el ID no existe o la actualización falla internamente
        console.warn(`[CITA CONTROLLER] entityService.update no encontró o no actualizó la cita con ID ${id}.`);
        return ctx.notFound(`Cita con ID ${id} no encontrada para actualizar.`);
      }

      // Si llegamos aquí, se supone que la actualización fue exitosa y updatedCita contiene los datos nuevos.
      // La respuesta debería devolver el ID que se intentó actualizar y los datos nuevos.
      return { message: `Cita actualizada correctamente`, data: updatedCita };

    } catch (error) {
      console.error(`[CITA CONTROLLER] ¡ERROR en la actualización de la cita con ID ${id}!`, error);
      // Devuelve un error más específico si la actualización falla.
      ctx.badRequest(`Error al actualizar cita con ID ${id}.`, {
        message: error.message,
        details: error.details || (error.response ? error.response.data : 'No additional error details.')
      });
      return;
    }
  }
}));