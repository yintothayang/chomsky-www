
const requireModule = require.context('.', false, /\.js$/)
const modules = {}
requireModule.keys().forEach(fileName => {
  if(fileName.includes('index')) return // skip this file
  // Get the component config
  let module = requireModule(fileName)
  let comp = module.default || module
  let name = fileName.replace(/^\.\//, '').replace(/\.js$/, '')
  modules[name] = comp
})

export default modules