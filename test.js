/* eslint-disable prettier/prettier */
// const txt = "37 AC, at Dragonstone";
// let numb = txt.match(/^\d+|\d+\b|\d+(?=\w)/g);
// numb = numb[0]
// console.log('Number: ', numb);

const characterInfo = {
    died:"In 299 AC, at King's Landing",
    born:"In 298 AC, at King's Landing"
}
const age = ((characterInfo.died).match(/^\d+|\d+\b|\d+(?=\w)/g))[0]- ((characterInfo.born).match(/^\d+|\d+\b|\d+(?=\w)/g))[0]
console.log("Age:", age)