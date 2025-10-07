// Metodo some: siempre retorna un true o false => some es si almenos o alguna

const numeros = [1,2,3,4,5,6];
const rta2 = numeros.some(item => item % 2 === 0);
console.log(`Rta: ${rta2}`);

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

const rta3 = orders.some(item => item.delivery);
console.log(`Las Ordenes entregadas son: ${rta3}`)

const dates = [
    {
      startDate: new Date(2021, 1, 1, 10),
      endDate: new Date(2021, 1, 1, 11),
      title: "Cita de trabajo",
    },
    {
      startDate: new Date(2021, 1, 1, 15),
      endDate: new Date(2021, 1, 1, 15, 30),
      title: "Cita con mi jefe",
    },
    {
      startDate: new Date(2021, 1, 1, 20),
      endDate: new Date(2021, 1, 1, 21),
      title: "Cena",
    },
  ];

  const newAppointment = {
    startDate: new Date(2021, 1, 1, 19),
      endDate: new Date(2021, 1, 1, 20,30),
  }

  const { areIntervalsOverlapping } = require("date-fns"); // Linea Importante
  const isOverlap = (newDate) =>{
    return dates.some(date => {
        return areIntervalsOverlapping(
            {start: date.startDate , end: date.endDate},
            {start: newDate.startDate , end: newDate.endDate},

        )
    })
  }
  console.log('isOverlap',isOverlap(newAppointment))


