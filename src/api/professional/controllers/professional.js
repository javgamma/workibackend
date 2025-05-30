'use strict';

/**
 * professional controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::professional.professional');
module.exports = createCoreController('api::professional.professional', ({ strapi }) => ({
    // Este es un controlador personalizado para findOne
    async findOne(ctx) {
      const { id } = ctx.params;
      const entity = await strapi.db.query('api::professional.professional').findOne({
        where: { id: id },
        populate: ctx.query.populate || ['*'], // Permite populate en la consulta
      });
  
      if (!entity) {
        return ctx.notFound('Profesional no encontrado');
      }
  
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    }
  }));