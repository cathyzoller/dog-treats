import log from './log'

export default (error) => {
  if (!error) {
    console.log('Uncaught exception with null error object')
    return
  }

  console.log(error)

  if (window.location.href.split('/')[2].split(':')[0] !== 'localhost') {
    setTimeout(() => {
      alert(`Whoops! Something went wrong. We\'re looking into it,
        but in the meantime please refresh your browser.`)
      document.location.reload(true)
    }, 2000)
  }
}
