module.exports = {
     "name": "personal",
     "esquema": {
          validator: {
               $jsonSchema: {
                    bsonType: "object",
                    required: ["nombre", "url", "contrasenia", "root", "puesto"],
                    properties: {
                         nombre: {
                              bsonType: "string",
                              title: "Nombre",
                              description: "Una cadena de texto con los nombres del personal."
                         },
                         url: {
                              bsonType: "string",
                              title: "URl-Direccion",
                              description: "Una cadena de texto con la url que tomara al iniciar seccion."
                         },
                         contrasenia: {
                              bsonType: "string",
                              minLength: 7,
                              title: "Contraseña",
                              description: "Una cadena de texto con la contraseña de registro."
                         },
                         root: {
                              bsonType: "bool",
                              title: "Root",
                              description: "Un boolean determina el nivel de acceso."
                         },
                         puesto: {
                              bsonType: "string",
                              title: "Puesto de trabajo",
                              description: "Una cadena de texto que guarda el puesto que descempeña cada uno del personal."
                         }
                    }
               }
          }
     }
}
