const canvas = document.querySelector("canvas")

const ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 400

let particlesArray = []
//handle mouse
const mouse = {
  x: null,
  y: null,
  radius: 200,
}
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x
  mouse.y = e.y
})

let imageCoordinates

const img1 = new Image(1000, 600)

img1.onload = function () {
  ctx.drawImage(img1, 0, 0, 200, 110)
  run()
}

img1.src = "html-css-js.png"

class Particle {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.size = 2
    this.baseX = this.x
    this.baseY = this.y
    this.density = Math.random() * 30 + 1
    // this.color = "rgb(34, 197, 94)"
    this.color = `rgb(${color})`
  }
  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, Math.PI * 0, Math.PI * 2, false)
    ctx.fill()
  }
  update() {
    let dx = mouse.x - this.x
    let dy = mouse.y - this.y
    let distance = Math.hypot(dy, dx)
    let forceDirectionX = dx / distance
    let forceDirectionY = dy / distance
    let maxDistance = mouse.radius

    let force = ((maxDistance - distance) / maxDistance / distance) * 10
    let directionX = forceDirectionX * force * this.density
    let directionY = forceDirectionY * force * this.density
    if (distance < mouse.radius) {
      this.x -= directionX
      this.y -= directionY
    } else {
      const index = this.x / innerWidth
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

function init() {
  particlesArray = []
  for (let y1 = 0, y2 = imageCoordinates.height; y1 < y2; y1++) {
    for (let x1 = 0, x2 = imageCoordinates.width; x1 < x2; x1++) {
      if (
        imageCoordinates.data[y1 * 4 * imageCoordinates.width + (x1 * 4 + 3)] >
        128
      ) {
        let posX = x1
        let posY = y1

        particlesArray.push(
          new Particle(
            posX * 3,
            posY * 3,
            ctx.getImageData(x1, y1, 1, 1).data.join(", ")
          )
        )
      }
    }
  }
}

const run = () => {
  imageCoordinates = ctx.getImageData(0, 0, 400, 400)

  init()
  animation()
}

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  particlesArray.forEach((particle) => {
    particle.draw()
    particle.update()
  })
  requestAnimationFrame(animation)
}

function connect() {
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i + 1; j < particlesArray.length; j++) {
      let dx = particlesArray[i].x - particlesArray[j].x
      let dy = particlesArray[i].y - particlesArray[j].y
      let distance = Math.hypot(dy, dx)
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
