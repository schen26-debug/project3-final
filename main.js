let d = document,
b = d.body,
w = window
let speed = 2
let nbr = w.innerHeight / 15
let total = 0

// That's not what you think
let totalbar = d.createElement('span')
totalbar.classList.add('totalbar')
b.appendChild(totalbar)

// I am not going to take part of this, this is insane
for (var i = 0; i < nbr; i++) {
  let ri = Math.round(Math.random() * nbr * 500)
  setTimeout(function () {
    createSnowFlake()
  }, ri);
}

// I am forced to do that this way, sometimes you can't choose
function createSnowFlake(){
  if (total <= nbr) {
    let rs = Math.random() * 1 + 1
    let wi = Math.random() - 0.5
    let ro = Math.random() * 8 + 3
    let x = Math.random() * w.innerWidth
    let s = d.createElement("div")
    total++
    updateTotal()
    s.classList.add('snowflake')
    s.innerHTML = "<span>*</span>"
    s.style.top = "-30px"
    s.style.left = x+"px"
    s.style.fontSize = (25 + rs * 10) +"px"
    s.querySelector('span').style.animationDuration = ro+"s"
    s.setAttribute("data-top", "-30")
    s.setAttribute("data-left", x+1)
    s.setAttribute("data-velocity", rs)
    s.setAttribute("data-wind", wi)
    s.setAttribute("data-melting", "false")
    b.appendChild(s)
  }
}

// Our scene is turning into a fantasy, an exponential narrative, somehow expanding like a stable and familiar spiral
function step(timestamp) {
  let ss = d.querySelectorAll('.snowflake')
  for (var i = 0; i < ss.length; i++) {
    let top = ss[i].getAttribute("data-top")
    let left = ss[i].getAttribute("data-left")
    let rlimit = Math.round(Math.random() * 300)
    let melting = ss[i].getAttribute("data-melting")
    let velocity = Number(ss[i].getAttribute("data-velocity"))
    let wind = Number(ss[i].getAttribute("data-wind"))
    if (top >= (w.innerHeight - rlimit) && melting == "false") {
      ss[i].setAttribute("data-melting", "true")
    }
    if(melting == "true"){
      let newVel = velocity - 0.03
      ss[i].setAttribute("data-velocity", newVel)
      let newTop = Number(top) + newVel
      ss[i].style.top = newTop + 'px';
      ss[i].setAttribute("data-top", newTop)
      if (ss[i].style.top <= "100" ) {
        ss[i].remove()
        total--
        updateTotal()
        createSnowFlake()
      }
    }else{
      let newTop = Number(top) + velocity
      let newLeft = Number(left) + wind
      ss[i].setAttribute("data-top", newTop)
      ss[i].setAttribute("data-left", newLeft)
      ss[i].style.top = newTop + 'px';
      ss[i].style.left = newLeft + 'px';
    }
    if(top >= w.innerHeight || top <= -50) {
      ss[i].remove()
    }
  }
  window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);

// We get hot and we think it's summer
function updateTotal(){
  totalbar.setAttribute('style', '--total:'+total+';')
}

// We get cold and we think it's just a temporary nightmare
b.onclick = function(){
  if (b.classList.contains('debug')) {
    b.classList.remove('debug')
  }else {
    b.classList.add('debug')
  }
}

// To the gracefulness of the stable spiral
