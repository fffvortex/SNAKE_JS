let canvas = document.getElementById('canvas')

let ctx = canvas.getContext('2d')

let socket = io()

let countBlock = 30

let snakes = Object()
let food = { x: 10, y: 10 }

let sizeBox = 20

canvas.width = countBlock * sizeBox
canvas.height = countBlock * sizeBox

socket.emit('start', 1)

function draw() {
    ctx.fillStyle = '#333834'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#3dad53'

    for (let snake in snakes) { // let
        let currentSnake = snakes[snake]

        for (let i = 0; i < currentSnake.pos.length; i++) {
            ctx.fillRect(currentSnake.pos[i].x * sizeBox, currentSnake.pos[i].y * sizeBox, sizeBox - 1, sizeBox - 1)
        }
    }
    ctx.fillStyle = '#bd3719'
    ctx.fillRect(food.x * sizeBox, food.y * sizeBox, sizeBox - 1, sizeBox - 1)
}

setInterval(draw, 25)

socket.on('snakes', function (msg) {
    snakes = JSON.parse(msg)
})

socket.on('food', function (msg) {
    food = JSON.parse(msg)
})

document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyW') {
        socket.emit('keyDown', 'U')
    }
    if (event.code === 'KeyA') {
        socket.emit('keyDown', 'L')
    }
    if (event.code === 'KeyS') {
        socket.emit('keyDown', 'D')
    }
    if (event.code === 'KeyD') {
        socket.emit('keyDown', 'R')
    }
})