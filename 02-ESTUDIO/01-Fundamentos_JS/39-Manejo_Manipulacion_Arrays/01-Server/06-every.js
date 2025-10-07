// Every => Evalua que todos los elementos cumplan con la condicion, retorna true o false

const numeros = [1,2,3,46];
const rta = numeros.every(item => item <= 40);
console.log('rta', rta);


const team = [
    {
      name: "Nicolas",
      age: 18,
    },
    {
      name: "Andrea",
      age: 21,
    },
    {
      name: "Zulema",
      age: 26,
    },
    {
      name: "Santiago",
      age: 18,
    },
  ];

  const rta1 = team.every(item => item.age >= 18);
  console.log(rta1)