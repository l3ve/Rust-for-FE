// const { ipcRenderer } = require('electron')

// let input = document.querySelector('input');
// let orgin = document.querySelector('#orgin');
// let photo = document.querySelector('#photo');

// let orgin_ctx = orgin.getContext("2d");
// let photo_ctx = photo.getContext("2d");

// console.log(photo_ctx, orgin_ctx)
// input.addEventListener('change', (e) => {
//   console.log(1111)
//   handleImage(e, orgin, orgin_ctx).then((img) => {
//     console.log(22222)
//     let imageDate = img.ctx.getImageData(0, 0, img.width, img.height);
//     let data = imageDate.data;
//     console.log(console.time('log'))
//     for (let i = 0, len = data.length; i < len; i += 4) {
//       let red = data[i];
//       let green = data[i + 1];
//       let blue = data[i + 2];
//       let alpha = data[i + 3];

//       let average = Math.floor((red + green + blue) / 3);

//       data[i] = average;
//       data[i + 1] = average;
//       data[i + 2] = average;
//     }
//     console.timeEnd("log")
//     imageDate.data = data;
//     photo.width = img.width;
//     photo.height = img.height;
//     photo_ctx.putImageData(imageDate, 0, 0);
//     return imageDate
//   }).then((imageDate) => {
//     console.log(111111)
//     ipcRenderer.emit('send', imageDate)
//   })
// })


// function handleImage(e, canvas, ctx) {
//   return new Promise((reslove) => {
//     let reader = new FileReader();
//     reader.onload = (event) => {
//       console.log(3333)
//       var img = new Image();
//       img.onload = () => {
//         console.log(4444)
//         canvas.width = img.width
//         canvas.height = img.height
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//         reslove({
//           img,
//           ctx,
//           width: canvas.width,
//           height: canvas.height
//         });
//       }
//       img.src = event.target.result;
//     }
//     console.log(5555)
//     reader.readAsDataURL(e.target.files[0]);
//   })
// }