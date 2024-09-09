const main = require('../src/index')

it('drop database', async () => {
    const expectedResult = true;
    const result = await main.drop();

    if (result !== expectedResult) {
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
})

it('make new region', async () => {
    const expectedResult = {id: 1, name: 'Москва'};
    const result = await main.makeNewRegion('Москва')

    if (result.id !== expectedResult.id || expectedResult.name !== result.name) {
        throw new Error(`Expected ${JSON.stringify(expectedResult)}, but got ${JSON.stringify(result)}`);
    }
})

it('make new hotel', async () => {
    const expectedResult = {id: 1, name: 'Тестовый отель', region: 1};
    const result = await main.makeNewHotel('Тестовый отель', 1);

    if (result.id !== expectedResult.id || expectedResult.name !== result.name || expectedResult.region !== result.region) {
        throw new Error(`Expected ${JSON.stringify(expectedResult)}, but got ${JSON.stringify(result)}`);
    }
    console.log(result)
})

it('make new room', async () => {
    const expectedResult = {id: 1, hotel: 1, category: 'luxury', count: 4, status: false};
    const result = await main.makeNewRoom(1, 'luxury', 4, false);
    await main.makeNewRoom(1, 'standart', 2, false);

    if (result.id !== expectedResult.id || expectedResult.hotel !== result.hotel || expectedResult.count !== result.count || expectedResult.status !== result.status) {
        throw new Error(`Expected ${JSON.stringify(expectedResult)}, but got ${JSON.stringify(result)}`);
    }
})

it('book a room', async () => {
    const result = await main.bookRoom(2);
    
    if (result[0] !== 1) {
        throw new Error(`${JSON.stringify(result)}`);
    }
})


it('get list of free rooms in hotel', async () => {
    const result = await main.getFreeRoomsInHotel(1);
    console.log(result)
})