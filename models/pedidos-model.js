module.exports = {
     "name": "pedidos",
     "esquema": {
          validator: {
               $jsonSchema: {
                    bsonType: "object",
                    required: ["clientid", "mesa", "consumo", "precio", "fecha", "mecero", "cancelado"],
                    properties: {
                         clientid: {
                              bsonType: "objectId",
                              title: "Cliente-ID",
                              description: "Un objeto-Id del cliente que ha realizado la orden."
                         },
                         mesa: {
                              bsonType: "int",
                              minimum: 0,
                              title: "Mesa",
                              description: "Un numero de 32 bits que guarda la mesa en la q se realiza el pedido."
                         },
                         consumo: {
                              bsonType: "array",
                              items: {
                                   bsonType: "object",
                                   required: ["plato", "observaciones"],
                                   properties: {
                                        plato: {
                                             bsonType: "objectId",
                                             title: "Plato-ID",
                                             description: "ID del plato o bebida pedido."
                                        },
                                        observaciones: {
                                             bsonType: "string",
                                             title: "Observaciones de preparacion",
                                             description: "guarda los cambios de preparacion de cada producto."
                                        }
                                   }
                              },
                              minItems: 1,
                              title: "Consumo",
                              description: "Array con todos los ID de los platos o bebidas ordenadas."
                         },
                         precio: {
                              bsonType: "decimal",
                              title: "PrecioTotal",
                              description: "El precio total de la orden."
                         },
                         fecha: {
                              bsonType: "date",
                              title: "Fecha",
                              description: "fecha y hora en que se realiza el pedido."
                         },
                         mecero: {
                              bsonType: "objectId",
                              title: "mecero-ID",
                              description: "Un objeto-Id del mecero que realiza la orden."
                         },
                         cancelado: {
                              bsonType: "bool",
                              title: "cancelado",
                              description: "Se ha pagado la cuenta del pedido."
                         }
                    }
               }
          }
     }
};
