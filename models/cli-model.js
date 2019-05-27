module.exports = {
     "name": "cliente",
     "esquema": {
          validator: {
               $jsonSchema: {
                    bsonType: "object",
                    required: ["nombre", "cedula", "telefono", "direccion", "email"],
                    properties: {
                         nombre: {
                              bsonType: "string",
                              title: "Nombre",
                              description: "Una cadena de texto que contiene los nombres y apellidos del cliente."
                         },
                         cedula: {
                              bsonType: "string",
                              maxLength: 11,
                              minLength: 10,
                              title: "Numero de Cedula",
                              description: "Una cadena de texto que contiene el numero de celula del cliente."
                         },
                         telefono: {
                              bsonType: "string",
                              maxLength: 13,
                              minLength: 7,
                              title: "Telefono",
                              description: "Una cadena de texto que contiene el numero de telefono convencional o movil."
                         },
                         direccion: {
                              bsonType: "object",
                              required: ["ciudad", "calles"],
                              properties: {
                                   ciudad: {
                                        bsonType: "string",
                                        title: "Ciudad",
                                        description: "Una cadena de texto con la ciudad de origen del cliente."
                                   },
                                   calles: {
                                        bsonType: "string",
                                        title: "Calles",
                                        description: "Una cadena de texto con las calles de la residencia del cliente."
                                   }
                              },
                              title: "Direccion",
                              description: "Un objeto JSON con dos parametros la ciudad y las calles de residencia del cliente."
                         },
                         email: {
                              bsonType: "string",
                              title: "E-mail",
                              description: "email del cliente para envio de fantura y nuevas promociones."
                         }
                    }
               }
          }
     }
}
