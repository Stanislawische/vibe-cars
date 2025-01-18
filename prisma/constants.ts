export const _categories = [
    {
        name: "Седаны",
    },
    {
        name: "Кроссоверы",
    },
    {
        name: "Мини",
    },
    {
        name: "Эксклюзивы",
    },
    {
        name: "Заряженные",
    },
    {
        name: "Батарейки",
    },
];

export const _plans = [
    {
        name: "30 минут",
        price: 5,
    },
    {
        name: "1 час",
        price: 10,
    },
    {
        name: "3 часа",
        price: 20,
    },
    {
        name: "6 часов",
        price: 30,
    },
    {
        name: "12 часов",
        price: 40,
    },
    {
        name: "1 сутки",
        price: 50,
    },
    {
        name: "3 суток",
        price: 130,
    },
    {
        name: "5 суток",
        price: 200,
    },
    {
        name: "7 суток",
        price: 300,
    },
    {
        name: "1 месяц",
        price: 1200,
    },
].map((obj, index) => ({ ...obj, id: index + 1 }));

export const _products = [
    {
        name: "Geely Emgrand New",
        categoryId: 1,
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fseryj_ffc2757375.png&w=1920&q=75",
    },
    {
        name: "Skoda Rapid",
        categoryId: 1,
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fchernaya_1bb91208f7.png&w=1080&q=75",
    },
    {
        name: "Volkswagen Polo",
        categoryId: 1,
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2FZelenyj_8b9ec59447.png&w=1920&q=75",
    },
    {
        name: "Volkswagen Polo NEW",
        categoryId: 1,
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fsv_seryj_2_39fbb2f9bd.png&w=1920&q=75",
    },
    {
        name: "Shkoda Karoq",
        categoryId: 2,
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fseryj_bez_okl_133f1a47f3.png&w=828&q=75",
    },
    {
        name: "Geely Coolray New",
        categoryId: 2,
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fczvet_5700a100e1.png&w=750&q=75",
    },
    {
        name: "Volkswagen Taos",
        categoryId: 2,
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fchernyj_44a7226e50.png&w=1200&q=75",
    },
    {
        name: "Mini Countryman D",
        categoryId: 3,
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fchernaya_krysha_5af2a88c85.png&w=828&q=75",
    },
    {
        name: "Tesla Model Y",
        categoryId: 6,
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fbelaya_4fe2a7b91b.png&w=1080&q=75",
    },
    {
        name: "Tesla Model 3",
        categoryId: 6,
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fkrasnaya_2ef6adf9b4.png&w=1080&q=75",
    },
    {
        name: "Tesla Model X Performance",
        categoryId: 6,
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fseryj_060e8fac10.png&w=828&q=75",
    },
    {
        name: "Ford Mustang",
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Foranzhevyj_767844beba.png&w=1920&q=75",
        categoryId: 5,
    },
    {
        name: "Jaguar F-Type",
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fbelyj_c913f127f4.png&w=1080&q=75",
        categoryId: 4,
    },
    {
        name: "Chevrolet Camaro",
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fsinij_db1de958e9.png&w=1200&q=75",
        categoryId: 5,
    },
    {
        name: "Lamborghini Huracan Spyder",
        imageUrl:
            "https://i.pinimg.com/originals/30/1a/8e/301a8e973862cec90fc2be13a691dd30.png",
        categoryId: 4,
    },
    {
        name: "Dodge Challenger",
        imageUrl:
            "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fhalk_sajt_22a58bb6ff.png&w=828&q=75",
        categoryId: 5,
    },
];

export const _productItems = [
    {
        id: 1,
        price: 40,
        description: "Цвет: черный, КПП: автомат",
        horsepower: 110,
        color: 10,
        gearbox: 1,
    },
    {
        id: 2,
        price: 45,
        description: "Цвет: черный, КПП: механика",
        horsepower: 115,
        color: 10,
        gearbox: 2,
    },
    {
        id: 3,
        price: 40,
        description: "Цвет: серый, КПП: автомат",
        horsepower: 110,
        color: 11,
        gearbox: 1,
    },
    {
        id: 4,
        price: 45,
        description: "Цвет: серый, КПП: механика",
        horsepower: 115,
        color: 11,
        gearbox: 2,
    },
    {
        id: 5,
        price: 40,
        description: "Цвет: белый, КПП: автомат",
        horsepower: 110,
        color: 12,
        gearbox: 1,
    },
    {
        id: 6,
        price: 45,
        description: "Цвет: белый, КПП: механика",
        horsepower: 115,
        color: 12,
        gearbox: 2,
    },
    {
        id: 7,
        price: 40,
        description: "Цвет: Красный, КПП: автомат",
        horsepower: 110,
        color: 13,
        gearbox: 1,
    },
    {
        id: 8,
        price: 45,
        description: "Цвет: Красный, КПП: механика",
        horsepower: 115,
        color: 13,
        gearbox: 2,
    },
];
