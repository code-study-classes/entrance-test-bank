const sequelize = require('./db/index')
const Hotel = require('./db/models/hotels');
const Region = require('./db/models/regions');
const Room = require('./db/models/rooms');

const categories = ['standart', 'luxury', 'apartments'];

const makeNewRegion = async (name) => {
    try {
        const region = (await Region.create({
            name: name,
        })).get({plain:true});

        return region
    } catch (e) {
        console.error(e)
        return null
    }
}

const makeNewHotel = async (name, regionId) => {
    try {
        const region = await Region.findOne({
            where: {
                id: regionId
            }
        })
        if (region === null) {
            console.error('Регион не найден')
            return null
        }

        const hotel = (await Hotel.create({
            name: name,
            region: region.id
        })).get({plain:true});

        return hotel
    } catch (e) {
        console.error(e)
        return null
    }
}

const makeNewRoom = async (id, category, count, status) => {
    try {
        const hotel = await Hotel.findOne({
            where: {
                id: Number(id)
            }
        })

        if (hotel === null) {
            console.error('Отель не найден!')
            return null
        }

        if (!categories.includes(category)) {
            console.error('Категория отеля не найдена: standart, luxury, apartments')
            return null
        }

        if (![true, false].includes(status)) {
            console.error('Статус отеля не найден: true, false')
            return null
        }

        const room = (await Room.create({
            hotel: hotel.id,
            category: category,
            count: count,
            status: status
        })).get({plain:true})

        return room
    } catch (e) {
        console.error(e)
        return null
    }
}

const bookRoom = async (roomId) => {
    try {
        let room = await Room.findOne({
            where: {
                id: roomId
            }
        })

        if (room === null) {
            console.error('Комната не найдена!')
            return null
        }

        room = await Room.update({status: true}, {
            where: {
                id: roomId
            }
        })

        return room
    } catch (e) {
        console.error(e)
        return null
    }
}

const getFreeRoomsInHotel = async (hotelId) => {
    try {
        const rooms = await Room.findAll({
            where: {
                hotel: hotelId,
                status: false
            },
            raw: true
        })

        return rooms
    } catch (e) {
        console.error(e)
        return null
    }
}

const drop = async () => {
    try {
        await sequelize.sync({ force: true })
        return true
    } catch (e) {
        console.error(e)
        return null
    }
}
module.exports = {makeNewRegion, makeNewHotel, makeNewRoom, bookRoom, getFreeRoomsInHotel, drop}
//     await sequelize.sync({ force: true })