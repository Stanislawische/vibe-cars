import { Prisma } from "@prisma/client";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";
import { _categories, _plans } from "./constants";

const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 5) / 10;
};

/**
 * Генерирует объект элемента продукта
 *
 * @param {Object} options
 * @param {number} options.productId - Id продукта
 * @param {number} options.priceMultiplier - Множитель цены
 * @param {string} options.description - Описание продукта
 * @param {number} options.horsepower - Мощность продукта
 * @param {number} options.color - Цвет продукта
 * @param {number} options.gearbox - Тип коробки передач
 * @returns {Prisma.ProductItemDBUncheckedCreateInput}
 */
const generateProductItem = ({
    productId,
    description,
    color,
    gearbox,
}: {
    productId: number;
    description?: string;
    color?:
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26;
    gearbox?: 1 | 2;
}) => {
    return {
        productId,
        price: randomDecimalNumber(40, 70),
        description,
        horsepower: randomDecimalNumber(100, 500),
        color,
        gearbox,
    } as Prisma.ProductItemDBUncheckedCreateInput;
};

/**
 * Миграция для заполнения базы данных.
 *
 * Создает пользователей, категории, тарифы, автомобили, их комплектации, корзины и товары в корзине.
 */
async function up() {
    await prisma.userDB.createMany({
        data: [
            {
                fullName: "test",
                email: "test@test.com",
                password: hashSync("111111", 10).toString(),
                role: "USER",
                verified: new Date(),
            },
            {
                fullName: "admin",
                email: "admin@test.com",
                password: hashSync("111111", 10).toString(),
                role: "ADMIN",
                verified: new Date(),
            },
        ],
    });

    await prisma.categoryDB.createMany({
        data: _categories,
    });

    await prisma.productDB.createMany({
        data: [
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
        ],
    });

    await prisma.planDB.createMany({
        data: _plans,
    });

    const car_1 = await prisma.productDB.create({
        data: {
            name: "Dongfeng Shine GS", // Серый
            imageUrl:
                "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2FDongdeng_czvet_7ddccb4c84.png&w=828&q=75",
            categoryId: 6,
            plans: {
                connect: _plans.slice(0, 10),
            },
        },
    });

    const car_2 = await prisma.productDB.create({
        data: {
            name: "Voyah Free", // Черный
            imageUrl:
                "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fczvet_db8e3bf80d.png&w=828&q=75",
            categoryId: 5,
            plans: {
                connect: _plans.slice(0, 10),
            },
        },
    });

    const car_3 = await prisma.productDB.create({
        data: {
            name: "Geely Okavango", // Белый
            imageUrl:
                "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fbelyj_aa4cf0c931.png&w=2048&q=75",
            categoryId: 2,
            plans: {
                connect: _plans.slice(0, 10),
            },
        },
    });

    const car_4 = await prisma.productDB.create({
        data: {
            name: "Geely Monjaro", // Черный
            imageUrl:
                "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fchernyj_ff31ba4b79.png&w=1200&q=75",
            categoryId: 2,
            plans: {
                connect: _plans.slice(0, 10),
            },
        },
    });

    const car_5 = await prisma.productDB.create({
        data: {
            name: "MINI Cooper Electric", // Красный
            imageUrl:
                "https://hello.by/_next/image?url=https%3A%2F%2Fback.hello.by%2Fsites%2Fdefault%2Ffiles%2Fstrapi_vehicles%2Fkrasnyj_5c3680589b.png&w=640&q=75",
            categoryId: 6,
            plans: {
                connect: _plans.slice(0, 10),
            },
        },
    });

    await prisma.productItemDB.createMany({
        data: [
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: Серый, КПП: Автоматическая",
                //horsepower: 123,
                color: 11,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: Серый, КПП: Механическая",
                //horsepower: 123,
                color: 11,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: Черный, КПП: Автоматическая",
                //horsepower: 495,
                color: 10,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: Черный, КПП: Механическая",
                //horsepower: 495,
                color: 10,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: Белый, КПП: Автоматическая",
                //horsepower: 218,
                color: 12,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: Белый, КПП: Механическая",
                //horsepower: 218,
                color: 12,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: Черный, КПП: Автоматическая",
                //horsepower: 235,
                color: 10,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: Черный, КПП: Механическая",
                //horsepower: 235,
                color: 10,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: Красный, КПП: Автоматическая",
                //horsepower: 184,
                color: 13,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: Красный, КПП: Механическая",
                //horsepower: 184,
                color: 13,
                gearbox: 2,
            }),

            /* 10: '#000000',  // черный
                     11: '#7A7A7A',  // серый
                     12: '#FFFFFF',  // белый
                     13: '#FF0000',  // красный
                     14: '#051FFF',  // синий
                     15: '#26FF05',  // зеленый
                     16: '#F3FF05',  // желтый
                     17: '#FB05FF',  // фиолетовый
                     18: '#8A452E',  // оранжевый
                     21: '#FF470A',  // розовый
                     22: '#0AFFFA',  // голубой
                     23: '#FF0AD1',  // пурпурный
                     24: '#E8E8E8',  // светло-серый
                     25: '#8B2D30',  // коричневый
                     26: '#E3B726',  // бежевый  */

            generateProductItem({
                productId: 1,
                description: "Цвет: черный, КПП: Автоматическая",
                color: 10,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 2,
                description: "Цвет: серый, КПП: Автоматическая",
                color: 11,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 3,
                description: "Цвет: белый, КПП: Автоматическая",
                color: 12,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 4,
                description: "Цвет: красный, КПП: Автоматическая",
                color: 13,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 5,
                description: "Цвет: синий, КПП: Автоматическая",
                color: 14,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 6,
                description: "Цвет: черный, КПП: Механическая",
                color: 10,
                gearbox: 2,
            }),
            generateProductItem({
                productId: 7,
                description: "Цвет: серый, КПП: Механическая",
                color: 11,
                gearbox: 2,
            }),
            generateProductItem({
                productId: 8,
                description: "Цвет: белый, КПП: Механическая",
                color: 12,
                gearbox: 2,
            }),
            generateProductItem({
                productId: 9,
                description: "Цвет: красный, КПП: Механическая",
                color: 13,
                gearbox: 2,
            }),
            generateProductItem({
                productId: 10,
                description: "Цвет: синий, КПП: Механическая",
                color: 14,
                gearbox: 2,
            }),
            generateProductItem({
                productId: 11,
                description: "Цвет: зеленый, КПП: Автоматическая",
                color: 15,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 12,
                description: "Цвет: желтый, КПП: Автоматическая",
                color: 16,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 13,
                description: "Цвет: фиолетовый, КПП: Автоматическая",
                color: 17,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 14,
                description: "Цвет: оранжевый, КПП: Автоматическая",
                color: 18,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 15,
                description: "Цвет: голубой, КПП: Автоматическая",
                color: 22,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 16,
                description: "Цвет: зеленый, КПП: Автоматическая",
                color: 15,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 17,
                description: "Цвет: желтый, КПП: Автоматическая",
                color: 16,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 18,
                description: "Цвет: фиолетовый, КПП: Автоматическая",
                color: 17,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 19,
                description: "Цвет: оранжевый, КПП: Автоматическая",
                color: 18,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 20,
                description: "Цвет: голубой, КПП: Автоматическая",
                color: 22,
                gearbox: 1,
            }),
            generateProductItem({
                productId: 21,
                description: "Цвет: голубой, КПП: Автоматическая",
                color: 22,
                gearbox: 1,
            }),

            generateProductItem({
                productId: car_1.id,
                description: "Цвет: черный, КПП: Автоматическая",
                color: 10,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: серый, КПП: Автоматическая",
                color: 11,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: белый, КПП: Автоматическая",
                color: 12,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: красный, КПП: Автоматическая",
                color: 13,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: синий, КПП: Автоматическая",
                color: 14,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: черный, КПП: Механическая",
                color: 10,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: серый, КПП: Механическая",
                color: 11,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: белый, КПП: Механическая",
                color: 12,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: красный, КПП: Механическая",
                color: 13,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: синий, КПП: Механическая",
                color: 14,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: зеленый, КПП: Автоматическая",
                color: 15,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: желтый, КПП: Автоматическая",
                color: 16,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: фиолетовый, КПП: Автоматическая",
                color: 17,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: оранжевый, КПП: Автоматическая",
                color: 18,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_1.id,
                description: "Цвет: голубой, КПП: Автоматическая",
                color: 22,
                gearbox: 1,
            }),

            generateProductItem({
                productId: car_2.id,
                description: "Цвет: черный, КПП: Автоматическая",
                color: 10,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: серый, КПП: Автоматическая",
                color: 11,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: белый, КПП: Автоматическая",
                color: 12,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: красный, КПП: Автоматическая",
                color: 13,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: синий, КПП: Автоматическая",
                color: 14,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: черный, КПП: Механическая",
                color: 10,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: серый, КПП: Механическая",
                color: 11,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: белый, КПП: Механическая",
                color: 12,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: красный, КПП: Механическая",
                color: 13,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: синий, КПП: Механическая",
                color: 14,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: зеленый, КПП: Автоматическая",
                color: 15,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: желтый, КПП: Автоматическая",
                color: 16,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: фиолетовый, КПП: Автоматическая",
                color: 17,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: оранжевый, КПП: Автоматическая",
                color: 18,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_2.id,
                description: "Цвет: голубой, КПП: Автоматическая",
                color: 22,
                gearbox: 1,
            }),

            generateProductItem({
                productId: car_3.id,
                description: "Цвет: черный, КПП: Автоматическая",
                color: 10,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: серый, КПП: Автоматическая",
                color: 11,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: белый, КПП: Автоматическая",
                color: 12,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: красный, КПП: Автоматическая",
                color: 13,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: синий, КПП: Автоматическая",
                color: 14,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: черный, КПП: Механическая",
                color: 10,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: серый, КПП: Механическая",
                color: 11,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: белый, КПП: Механическая",
                color: 12,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: красный, КПП: Механическая",
                color: 13,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: синий, КПП: Механическая",
                color: 14,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: зеленый, КПП: Автоматическая",
                color: 15,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: желтый, КПП: Автоматическая",
                color: 16,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: фиолетовый, КПП: Автоматическая",
                color: 17,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: оранжевый, КПП: Автоматическая",
                color: 18,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_3.id,
                description: "Цвет: голубой, КПП: Автоматическая",
                color: 22,
                gearbox: 1,
            }),

            generateProductItem({
                productId: car_4.id,
                description: "Цвет: черный, КПП: Автоматическая",
                color: 10,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: серый, КПП: Автоматическая",
                color: 11,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: белый, КПП: Автоматическая",
                color: 12,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: красный, КПП: Автоматическая",
                color: 15,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: синий, КПП: Автоматическая",
                color: 14,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: черный, КПП: Механическая",
                color: 10,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: серый, КПП: Механическая",
                color: 11,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: белый, КПП: Механическая",
                color: 12,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: красный, КПП: Механическая",
                color: 15,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: синий, КПП: Механическая",
                color: 14,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: зеленый, КПП: Автоматическая",
                color: 15,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: желтый, КПП: Автоматическая",
                color: 16,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: фиолетовый, КПП: Автоматическая",
                color: 17,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: оранжевый, КПП: Автоматическая",
                color: 18,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_4.id,
                description: "Цвет: голубой, КПП: Автоматическая",
                color: 22,
                gearbox: 1,
            }),

            generateProductItem({
                productId: car_5.id,
                description: "Цвет: черный, КПП: Автоматическая",
                color: 10,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: серый, КПП: Автоматическая",
                color: 11,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: белый, КПП: Автоматическая",
                color: 12,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: красный, КПП: Автоматическая",
                color: 15,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: синий, КПП: Автоматическая",
                color: 14,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: черный, КПП: Механическая",
                color: 10,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: серый, КПП: Механическая",
                color: 11,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: белый, КПП: Механическая",
                color: 12,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: красный, КПП: Механическая",
                color: 15,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: синий, КПП: Механическая",
                color: 14,
                gearbox: 2,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: зеленый, КПП: Автоматическая",
                color: 15,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: желтый, КПП: Автоматическая",
                color: 16,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: фиолетовый, КПП: Автоматическая",
                color: 17,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: оранжевый, КПП: Автоматическая",
                color: 18,
                gearbox: 1,
            }),
            generateProductItem({
                productId: car_5.id,
                description: "Цвет: голубой, КПП: Автоматическая",
                color: 22,
                gearbox: 1,
            }),

            // generateProductItem({productId: 7,description: 'Цвет: черный, КПП: Автоматическая',color: 10,gearbox: 1}),
            // generateProductItem({productId: 7,description: 'Цвет: серый, КПП: Автоматическая',color: 11,gearbox: 1}),
            // generateProductItem({productId: 7,description: 'Цвет: белый, КПП: Автоматическая',color: 12,gearbox: 1}),
            // generateProductItem({productId: 7,description: 'Цвет: красный, КПП: Автоматическая',color: 15,gearbox: 1}),
            // generateProductItem({productId: 7,description: 'Цвет: синий, КПП: Автоматическая',color: 14,gearbox: 1}),
            // generateProductItem({productId: 7,description: 'Цвет: черный, КПП: Механическая',color: 10,gearbox: 2}),
            // generateProductItem({productId: 7,description: 'Цвет: серый, КПП: Механическая',color: 11,gearbox: 2}),
            // generateProductItem({productId: 7,description: 'Цвет: белый, КПП: Механическая',color: 12,gearbox: 2}),
            // generateProductItem({productId: 7,description: 'Цвет: красный, КПП: Механическая',color: 15,gearbox: 2}),
            // generateProductItem({productId: 7,description: 'Цвет: синий, КПП: Механическая',color: 14,gearbox: 2}),
            // generateProductItem({productId: 7,description: 'Цвет: зеленый, КПП: Автоматическая',color: 15,gearbox: 1}),
            // generateProductItem({productId: 7,description: 'Цвет: желтый, КПП: Автоматическая',color: 16,gearbox: 1}),
            // generateProductItem({productId: 7,description: 'Цвет: фиолетовый, КПП: Автоматическая',color: 17,gearbox: 1}),
            // generateProductItem({productId: 7,description: 'Цвет: оранжевый, КПП: Автоматическая',color: 18,gearbox: 1}),
            // generateProductItem({productId: 7,description: 'Цвет: голубой, КПП: Автоматическая',color: 22,gearbox: 1}),

            // generateProductItem({productId: 8,description: 'Цвет: черный, КПП: Автоматическая',color: 10,gearbox: 1}),
            // generateProductItem({productId: 8,description: 'Цвет: серый, КПП: Автоматическая',color: 11,gearbox: 1}),
            // generateProductItem({productId: 8,description: 'Цвет: белый, КПП: Автоматическая',color: 12,gearbox: 1}),
            // generateProductItem({productId: 8,description: 'Цвет: красный, КПП: Автоматическая',color: 15,gearbox: 1}),
            // generateProductItem({productId: 8,description: 'Цвет: синий, КПП: Автоматическая',color: 14,gearbox: 1}),
            // generateProductItem({productId: 8,description: 'Цвет: черный, КПП: Механическая',color: 10,gearbox: 2}),
            // generateProductItem({productId: 8,description: 'Цвет: серый, КПП: Механическая',color: 11,gearbox: 2}),
            // generateProductItem({productId: 8,description: 'Цвет: белый, КПП: Механическая',color: 12,gearbox: 2}),
            // generateProductItem({productId: 8,description: 'Цвет: красный, КПП: Механическая',color: 15,gearbox: 2}),
            // generateProductItem({productId: 8,description: 'Цвет: синий, КПП: Механическая',color: 14,gearbox: 2}),
            // generateProductItem({productId: 8,description: 'Цвет: зеленый, КПП: Автоматическая',color: 15,gearbox: 1}),
            // generateProductItem({productId: 8,description: 'Цвет: желтый, КПП: Автоматическая',color: 16,gearbox: 1}),
            // generateProductItem({productId: 8,description: 'Цвет: фиолетовый, КПП: Автоматическая',color: 17,gearbox: 1}),
            // generateProductItem({productId: 8,description: 'Цвет: оранжевый, КПП: Автоматическая',color: 18,gearbox: 1}),
            // generateProductItem({productId: 8,description: 'Цвет: голубой, КПП: Автоматическая',color: 22,gearbox: 1}),

            // generateProductItem({productId: 9,description: 'Цвет: черный, КПП: Автоматическая',color: 10,gearbox: 1}),
            // generateProductItem({productId: 9,description: 'Цвет: серый, КПП: Автоматическая',color: 11,gearbox: 1}),
            // generateProductItem({productId: 9,description: 'Цвет: белый, КПП: Автоматическая',color: 12,gearbox: 1}),
            // generateProductItem({productId: 9,description: 'Цвет: красный, КПП: Автоматическая',color: 15,gearbox: 1}),
            // generateProductItem({productId: 9,description: 'Цвет: синий, КПП: Автоматическая',color: 14,gearbox: 1}),
            // generateProductItem({productId: 9,description: 'Цвет: черный, КПП: Механическая',color: 10,gearbox: 2}),
            // generateProductItem({productId: 9,description: 'Цвет: серый, КПП: Механическая',color: 11,gearbox: 2}),
            // generateProductItem({productId: 9,description: 'Цвет: белый, КПП: Механическая',color: 12,gearbox: 2}),
            // generateProductItem({productId: 9,description: 'Цвет: красный, КПП: Механическая',color: 15,gearbox: 2}),
            // generateProductItem({productId: 9,description: 'Цвет: синий, КПП: Механическая',color: 14,gearbox: 2}),
            // generateProductItem({productId: 9,description: 'Цвет: зеленый, КПП: Автоматическая',color: 15,gearbox: 1}),
            // generateProductItem({productId: 9,description: 'Цвет: желтый, КПП: Автоматическая',color: 16,gearbox: 1}),
            // generateProductItem({productId: 9,description: 'Цвет: фиолетовый, КПП: Автоматическая',color: 17,gearbox: 1}),
            // generateProductItem({productId: 9,description: 'Цвет: оранжевый, КПП: Автоматическая',color: 18,gearbox: 1}),
            // generateProductItem({productId: 9,description: 'Цвет: голубой, КПП: Автоматическая',color: 22,gearbox: 1}),

            // generateProductItem({productId: 10,description: 'Цвет: черный, КПП: Автоматическая',color: 10,gearbox: 1}),
            // generateProductItem({productId: 10,description: 'Цвет: серый, КПП: Автоматическая',color: 11,gearbox: 1}),
            // generateProductItem({productId: 10,description: 'Цвет: белый, КПП: Автоматическая',color: 12,gearbox: 1}),
            // generateProductItem({productId: 10,description: 'Цвет: красный, КПП: Автоматическая',color: 15,gearbox: 1}),
            // generateProductItem({productId: 10,description: 'Цвет: синий, КПП: Автоматическая',color: 14,gearbox: 1}),
            // generateProductItem({productId: 10,description: 'Цвет: черный, КПП: Механическая',color: 10,gearbox: 2}),
            // generateProductItem({productId: 10,description: 'Цвет: серый, КПП: Механическая',color: 11,gearbox: 2}),
            // generateProductItem({productId: 10,description: 'Цвет: белый, КПП: Механическая',color: 12,gearbox: 2}),
            // generateProductItem({productId: 10,description: 'Цвет: красный, КПП: Механическая',color: 15,gearbox: 2}),
            // generateProductItem({productId: 10,description: 'Цвет: синий, КПП: Механическая',color: 14,gearbox: 2}),
            // generateProductItem({productId: 10,description: 'Цвет: зеленый, КПП: Автоматическая',color: 15,gearbox: 1}),
            // generateProductItem({productId: 10,description: 'Цвет: желтый, КПП: Автоматическая',color: 16,gearbox: 1}),
            // generateProductItem({productId: 10,description: 'Цвет: фиолетовый, КПП: Автоматическая',color: 17,gearbox: 1}),
            // generateProductItem({productId: 10,description: 'Цвет: оранжевый, КПП: Автоматическая',color: 18,gearbox: 1}),
            // generateProductItem({productId: 10,description: 'Цвет: голубой, КПП: Автоматическая',color: 22,gearbox: 1}),
        ],
    });

    await prisma.cartDB.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: "111111",
            },
            {
                userId: 2,
                totalAmount: 0,
                token: "222222",
            },
        ],
    });

    await prisma.cartItemDB.create({
        data: {
            cartId: 1,
            quantity: 1,
            productItemId: 2,
            plan: {
                connect: [{ id: 6 }],
            },
        },
    });

    await prisma.cartItemDB.create({
        data: {
            cartId: 2,
            quantity: 1,
            productItemId: 4,
            plan: {
                connect: [{ id: 9 }],
            },
        },
    });
}

/**
 * Очищает все таблицы в базе данных, используя SQL-команду TRUNCATE.
 *
 * @throws {Error} Если любая из команд TRUNCATE выбросит ошибку.
 */
async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "UserDB" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "CategoryDB" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductDB" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItemDB" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "PlanDB" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartDB" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItemDB" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "OrderDB" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "VerificationCodeDB" RESTART IDENTITY CASCADE;`;
}

/**
 * Выполняет функцию seed для заполнения базы данных default-значениями.
 *
 * Сначала, она выполняет функцию down для очистки всех таблиц в базе данных.
 * Затем, она выполняет функцию up для заполнения таблиц default-значениями.
 *
 * @throws {Error} Если любая из функций down или up выбросит ошибку.
 */
async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
