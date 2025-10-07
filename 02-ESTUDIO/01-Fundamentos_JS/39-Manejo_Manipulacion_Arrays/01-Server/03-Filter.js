// No cambia el array original sino que crea uno nuevo

const palabras = ['Juan','Pedro','Camilo','Roberto','Peregrina'];
const rta = palabras.filter(item => item.length >= 6);
console.log(`La respuesta es ${rta}`);

const orders = [
    {
        customerName: 'Zulay',
        total: 120,
        delivery: false
    },
    {
        customerName: 'Santiago',
        total: 234,
        delivery: true
    },
    {
        customerName: 'Camilo',
        total: 456,
        delivery: false
    },
    {
        customerName: 'Juan',
        total: 768,
        delivery:true
    },
    {
        customerName:'Santiago',
        total: 432,
        delivery:false
    }
];


const rta3 = orders.filter(item => item.delivery && item.total >= 300);
console.log(rta3)

const search = (query) => {
    return orders.filter(item => {
        return item.customerName.includes(query)
    })
}

console.log(search('o'))





