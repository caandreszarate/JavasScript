// find y findIndex

const numeros = [1,30,49,29,10,13];
const rta = numeros.find(item => item === 30333)
console.log('find', rta)


const productos = [
    {
        name: 'Pizza',
        price: 12,
        id: "🍕"
    },
    {
        name: 'Hamburguesa',
        price: 23,
        id: "🍔"
    },
    {
        name: 'Hot Dog',
        price: 34,
        id: "🌭"
    },{
        name:'Hot Cakes',
        price: 21,
        id: '🥮'
    }
]

const rta3 = productos.find(item => item.id === '🍔')
console.log("Respuesta: ", rta3)

const rta4 = productos.findIndex(item => item.id === "🍔")
console.log("FindIndex: ", rta4)

