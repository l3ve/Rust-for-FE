// Note that a dynamic `import` statement here is required due to
// webpack/webpack#6615, but in theory `import { greet } from './pkg';`
// will work here one day as well!
const rust = import('@pkg');
let obj = {
  name: 'js'
}

rust
  .then(m => {
    m.greet({ name: 'js' })
  }).then(()=>{
    console.log('js:',obj)
  })
  .catch(console.error);


export function ll() {
  return obj
}