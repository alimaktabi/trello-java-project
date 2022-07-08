const canvas = document.querySelector("canvas")

const ctx = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height = 400
let particlesArray = []
//handle mouse
const mouse = {
  x: null,
  y: null,
  radius: 100,
}
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x
  mouse.y = e.y
})
// basic setup
ctx.fillStyle = "rgb(22 163 74)"
ctx.font = "30px arial"
var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)

ctx.fillText("Trello Project", 10, 80)
const imageCoordinates = ctx.getImageData(0, 50, 200, 100)
// ctx.strokeStyle="white";
// ctx.strokeRect(10,50,200,100);

//particle classs
class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = 4.5
    this.baseX = this.x
    this.baseY = this.y
    this.density = Math.random() * 30 + 1
    this.color = x / innerWidth > 0.6 ? "blue" : "rgb(22 163 74)"
  }
  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, Math.PI * 0, Math.PI * 2, false)
    ctx.fill()
  }
  // increses particle size when mouse is near
  update() {
    let dx = mouse.x - this.x
    let dy = mouse.y - this.y
    let distance = Math.hypot(dy, dx)
    let forceDirectionX = dx / distance
    let forceDirectionY = dy / distance
    let maxDistance = mouse.radius

    let force = (maxDistance - distance) / maxDistance
    let directionX = forceDirectionX * force * this.density
    let directionY = forceDirectionY * force * this.density
    if (distance < mouse.radius) {
      this.x -= directionX
      this.y -= directionY
      this.color = "#d6a70e"
    } else {
      const index = this.x / innerWidth
      this.color =
        index > 0.66 ? "blue" : index > 0.3 ? "rgb(22 163 74)" : "red"
      if (this.x != this.baseX) {
        let dx = this.x - this.baseX
        this.x -= dx / 5
      }
      if (this.y != this.baseY) {
        let dy = this.y - this.baseY
        this.y -= dy / 50
      }
    }
  }
}

// initialize the particle array
function init() {
  particlesArray = []
  for (let y1 = 0, y2 = imageCoordinates.height; y1 < y2; y1++) {
    for (let x1 = 0, x2 = imageCoordinates.width; x1 < x2; x1++) {
      if (
        imageCoordinates.data[y1 * 4 * imageCoordinates.width + (x1 * 4 + 3)] <
        128
      ) {
        let posX = x1
        let posY = y1
        particlesArray.push(new Particle(posX * 10, posY * 10))
      }
    }
  }
}

init()

//animation
function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  particlesArray.forEach((particle) => {
    particle.draw()
    particle.update()
  })
  // connect();
  requestAnimationFrame(animation)
}
animation()

function connect() {
  // console.log("here")
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i + 1; j < particlesArray.length; j++) {
      let dx = particlesArray[i].x - particlesArray[j].x
      let dy = particlesArray[i].y - particlesArray[j].y
      let distance = Math.hypot(dy, dx)
      // console.log("distance",distance);
      if (distance < 30) {
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
        ctx.strokeStyle = particlesArray[j].color
        ctx.stroke()
      }
    }
  }
}
