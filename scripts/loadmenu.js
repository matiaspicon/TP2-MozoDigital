db = db.getSiblingDB('MozoDigital');
db.Restaurantes.drop();
db.Restaurantes.insertMany([{
        nombre: "Restaurante",
        color_principal: "#ffa500",
        logo: "https://media-cdn.tripadvisor.com/media/photo-s/15/87/fd/52/restaurant-orange.jpg",
        sucursales: [
            {
                _id: 0,
                direccion: "Av Cabildo",
                menu: [
                    {
                    "_id": 0,
                    "titulo": "Suprema de Pollo",
                    "precio": 880,
                    "descripcion": "Este es un plato es muy rico",
                    "url_imagen": "https://unacomidaperuana.com/wp-content/uploads/2019/09/suprema-de-pollo.jpg",
                    "categoria": "minuta",
                    "habilitado": true
                    },
                    {
                    "_id": 1,
                    "titulo": "Milanesas con Papas Fritas",
                    "precio": 780,
                    "descripcion": "Este es un plato es muy rico",
                    "url_imagen": "https://static.misionesonline.news/wp-content/uploads/2020/05/28163533/milaaa.jpg",
                    "categoria": "minuta",
                    "habilitado": true
                    },
                    {
                    "_id": 2,
                    "titulo": "Ravioles",
                    "precio": 600,
                    "descripcion": "Este es un plato es muy rico",
                    "url_imagen": "https://cdn.kiwilimon.com/recetaimagen/30581/33975.jpg",
                    "categoria": "pasta",
                    "habilitado": true
                    },
                    {
                    "_id": 3,
                    "titulo": "Hamburguesa doble",
                    "precio": 550,
                    "descripcion": "Este es un plato es delicioso",
                    "url_imagen": "https://www.hogar.mapfre.es/media/2018/09/hamburguesa-sencilla.jpg",
                    "categoria": "hamburguesas",
                    "habilitado": true
                    },
                    {
                    "_id": 4,
                    "titulo": "Pizza Muzzarella",
                    "precio": 600,
                    "descripcion": "Este es un plato es delicioso",
                    "url_imagen": "https://vinomanos.com/wp-content/uploads/2020/08/MG_315.jpg",
                    "categoria": "pizza",
                    "habilitado": true
                    },
                    {
                    "_id": 5,
                    "titulo": "Ensalada",
                    "precio": 400,
                    "descripcion": "Este es un plato es delicioso",
                    "url_imagen": "https://www.laylita.com/recetas/wp-content/uploads/Ensalada-de-lechuga-con-limon-y-cilantro.jpg",
                    "categoria": "ensaladas",
                    "habilitado": true
                    },
                    {
                    "_id": 6,
                    "titulo": "Ensalada Caesar",
                    "precio": 450,
                    "descripcion": "Este es un plato es delicioso",
                    "url_imagen": "https://www.pequerecetas.com/wp-content/uploads/2015/06/Ensalada-Cesar-2.jpg",
                    "categoria": "ensaladas",
                    "habilitado": true
                    }
                ],
                telefono: 12312312,
                horario: "de 9 a 18",
                mail:"restaurant@gmail.com"
            },
            {
                _id: 1,
                direccion: "Av 9 de Julio",
                menu: [
                    {
                        "_id": 0,
                        "titulo": "Suprema de Pollo",
                        "precio": 880,
                        "descripcion": "Este es un plato es muy rico",
                        "url_imagen": "https://unacomidaperuana.com/wp-content/uploads/2019/09/suprema-de-pollo.jpg",
                        "categoria": "minuta",
                        "habilitado": true
                        },
                        {
                        "_id": 1,
                        "titulo": "Milanesas con Papas Fritas",
                        "precio": 780,
                        "descripcion": "Este es un plato es muy rico",
                        "url_imagen": "https://static.misionesonline.news/wp-content/uploads/2020/05/28163533/milaaa.jpg",
                        "categoria": "minuta",
                        "habilitado": true
                        },
                        {
                        "_id": 2,
                        "titulo": "Ravioles",
                        "precio": 600,
                        "descripcion": "Este es un plato es muy rico",
                        "url_imagen": "https://cdn.kiwilimon.com/recetaimagen/30581/33975.jpg",
                        "categoria": "pasta",
                        "habilitado": true
                        },
                        {
                        "_id": 3,
                        "titulo": "Hamburguesa doble",
                        "precio": 550,
                        "descripcion": "Este es un plato es delicioso",
                        "url_imagen": "https://www.hogar.mapfre.es/media/2018/09/hamburguesa-sencilla.jpg",
                        "categoria": "hamburguesas",
                        "habilitado": true
                        },
                        {
                        "_id": 4,
                        "titulo": "Pizza Muzzarella",
                        "precio": 600,
                        "descripcion": "Este es un plato es delicioso",
                        "url_imagen": "https://vinomanos.com/wp-content/uploads/2020/08/MG_315.jpg",
                        "categoria": "pizza",
                        "habilitado": true
                        },
                        {
                        "_id": 5,
                        "titulo": "Ensalada",
                        "precio": 400,
                        "descripcion": "Este es un plato es delicioso",
                        "url_imagen": "https://www.laylita.com/recetas/wp-content/uploads/Ensalada-de-lechuga-con-limon-y-cilantro.jpg",
                        "categoria": "ensaladas",
                        "habilitado": true
                        },
                        {
                        "_id": 6,
                        "titulo": "Ensalada Caesar",
                        "precio": 450,
                        "descripcion": "Este es un plato es delicioso",
                        "url_imagen": "https://www.pequerecetas.com/wp-content/uploads/2015/06/Ensalada-Cesar-2.jpg",
                        "categoria": "ensaladas",
                        "habilitado": true
                        }
                ],
                telefono: 12312312,
                horario: "de 9 a 18",
                mail:"restaurant@gmail.com"
            }
        ]
}])