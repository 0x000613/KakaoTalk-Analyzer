// const wordCloudData = [
//     {
//       text: 'told',
//       value: 64,
//     },
//     {
//       text: 'mistake',
//       value: 11,
//     },
//     {
//       text: 'thought',
//       value: 16,
//     },
//     {
//       text: 'bad',
//       value: 17,
//     },
// ]

// if (wordCloudData.length > 0) {
//     wordCloudData.forEach(i => console.log(i))
// }

function getRandomColor() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

console.log(getRandomColor());