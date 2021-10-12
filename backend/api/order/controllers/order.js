"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");

const GUEST_ID = "6162a15aa695cb743ad2fbee";

module.exports = {
  async place(ctx) {
    const {
      shippingAddress,
      billingAddress,
      shippingInfo,
      billingInfo,
      shippingOption,
      subtotal,
      total,
      items,
    } = ctx.request.body;

    let orderCustomer;

    if (ctx.state.user) {
      orderCustomer = ctx.state.user.id;
    } else {
      orderCustomer = GUEST_ID;
    }

    let serverTotal = 0;
    let unavailable = [];
    let invalid = false;

    await Promise.all(
      items.map(async (clientItem) => {
        const serverItem = await strapi.services.type.findOne({
          id: clientItem.type.id,
        });

        await strapi.services.type.update({ id: clientItem.type.id });
        serverTotal += serverItem.price * clientItem.qty;
      })
    );

    const shippingOptions = [
      { label: "Доставка по городу", price: 0 },
      { label: "Доставка за пределы", price: 500 },
    ];

    const shippingValid = shippingOptions.find(
      (option) =>
        option.label === shippingOption.label &&
        option.price === shippingOption.price
    );

    if (
      shippingValid === undefined ||
      (serverTotal + shippingValid.price).toFixed(2) !== total
    ) {
      ctx.send({ error: "Invalid Cart" }, 400);
    } else if (unavailable.length > 0) {
      ctx.send({ unavailable }, 409);
    } else {
      var order = await strapi.services.order.create({
        shippingAddress,
        billingAddress,
        shippingInfo,
        billingInfo,
        shippingOption,
        subtotal,
        total,
        items,
        user: orderCustomer,
      });

      order = sanitizeEntity(order, { model: strapi.models.order });
      console.log("sdssd", order)
      if (order.user.username === "Guest") {
        order.user = { username: "Guest" };
      }

      ctx.send({ order }, 200);
    }
  },
};
