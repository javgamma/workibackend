'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.entityService.findOne('api::category.category', id, {
      populate: ['professionals'], // aquí pones el nombre exacto del campo
    });

    if (!entity) {
      return ctx.notFound('Categoría no encontrada');
    }

    return this.transformResponse(entity);
  },
}));
