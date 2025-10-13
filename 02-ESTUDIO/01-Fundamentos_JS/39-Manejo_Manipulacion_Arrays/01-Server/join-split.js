/*
JOIN = Unificar todo un array
 */

const elements = ['Fuego', 'Aire', 'Agua']
const rta = elements.join('--')
console.log('Join', rta)

const title = 'Curso de manipulacion de arrays';
const urlFinal = title.split(' ').join('-').toLocaleLowerCase();
console.log('UrlFinal ', urlFinal)

