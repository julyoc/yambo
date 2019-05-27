module.exports = {
     "name": "producto",
     "esquema": {
          validator: {
               $jsonSchema: {
                    bsonType: "object",
                    required: ["nombre", "familyid", "lugar", "precio", "imagen", "descripcion"],
                    properties: {
                         nombre: {
                              bsonType: "string",
                              title: "Nombre",
                              description: "Una cadena de texto con el nombre del plato o bebida."
                         },
                         familyid: {
                              bsonType: "objectId",
                              title: "Family-ID",
                              description: "Un objeto-Id de la familia a la que pertenece el plato."
                         },
                         lugar: {
                              bsonType: "array",
                              items: {
                                   bsonType: "string",
                                   maxLength: 2,
                                   minLength: 2,
                                   enum: ["ba", "pa", "co"],
                              },
                              maxItems: 3,
                              minItems: 1,
                              title: "Lugar de preparacion",
                              description: "Una cadena de 2 caracteres que espesifica en que lugar se prepara el plato o bebida."
                         },
                         precio: {
                              bsonType: "object",
                              required: ["iva", "precio"],
                              properties: {
                                   iva: {
                                        bsonType: "bool",
                                        title: "IVA",
                                        description: "Se registra con true si el precio incluye IVA."
                                   },
                                   precio: {
                                        bsonType: "decimal",
                                        title: "Precio",
                                        description: "El precio del plato o bebida."
                                   }
                              }
                         },
                         imagen: {
                              bsonType: "string",
                              title: "ImagenUrl",
                              description: "Url de la imagen a guardar"
                         },
                         descripcion: {
                              bsonType: "string",
                              maxLength: 100,
                              title: "Descripcion",
                              description: "Una cadena de texto con una breve descripcion del plato o bebida."
                         }
                    }
               }
          }
     }
}
