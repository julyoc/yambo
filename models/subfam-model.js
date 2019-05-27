module.exports = {
     "name": "subfamily",
     "esquema": {
          validator: {
               $jsonSchema: {
                    bsonType: "object",
                    required: ["nombre", "familyid", "descripcion", "imagen"],
                    properties: {
                         nombre: {
                              bsonType: "string",
                              title: "Nombre",
                              description: "Una cadena de texto con el nombre de la familia."
                         },
                         familyid: {
                              bsonType: "objectId",
                              title: "family-ID",
                              description: "id de la familia a la que pertenece"
                         },
                         descripcion: {
                              bsonType: "string",
                              title: "Descripcion",
                              description: "Una cadena de texto con la descripcion de la familia."
                         },
                         imagen: {
                              bsonType: "string",
                              title: "URL-Imagen",
                              description: "Una cadena de texto con la direccion de la imagen representativa de la familia."
                         }
                    }
               }
          }
     }
}
