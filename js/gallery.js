
/*=========3d scroll============*/
let zSpacing = -500,
    lastPos = zSpacing / 5,
    $frames = document.getElementsByClassName('frame'),
    frames = Array.from($frames),
    zVals = [] 

window.onscroll = function() {

  let top = document.documentElement.scrollTop,
    delta = lastPos - top

  lastPos = top

    frames.forEach(function(n, i)  { // n - current processed element(this) i-his index
    zVals.push((i * zSpacing) + zSpacing)
    zVals[i] += delta * -5

    let frame = frames[i],
      transform = `translateZ(${zVals[i]}px)`,
      opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0
    frame.setAttribute('style', `transform: ${transform}; opacity:${opacity} `) 
  })
}
window.scrollTo(0, 1)

/*=================Audio================*/

const muzbtn = document.querySelector('.muzbtn'),
      audio = document.querySelector('.audio')

muzbtn.addEventListener('click', e => {
  muzbtn.classList.toggle('paused')
  audio.paused ? audio.play() : audio.pause()
})

window.onfocus = function() {
  muzbtn.classList.contains('paused') ? audio.pause() : audio.play()
}

window.onblur = function() {
  audio.pause()
}

/*============Text Parallax=================*/




