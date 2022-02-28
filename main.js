import './style.css'
import Matter from 'matter-js'
const app = document.getElementById('app')
const button = document.getElementById('btn')

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite

let engine = Engine.create()

function init() {
    engine.events = {}
    Composite.clear(engine.world)
    Engine.clear(engine)
    engine = Engine.create()

    const render = Render.create({
        element: app,
        engine: engine,
        currentBackground: null,
        options: {
            wireframes: false,
            background: 'transparent',
            width: window.innerWidth,
            height: window.innerHeight,
        },
    })

    Composite.add(engine.world, [
        Bodies.rectangle(
            window.innerWidth / 2,
            window.innerHeight + 50,
            window.innerWidth,
            100,
            {
                isStatic: true,
            }
        ),
    ])

    Render.run(render)

    Runner.run(Runner.create(), engine)

    button.addEventListener('click', () => {
        Composite.add(engine.world, newCat())
    })
}

function newCat() {
    const ORIGINAL_SIZE = 120
    const SIZE = Math.floor(Math.random() * 76) + 30
    const cat = Bodies.circle(
        Math.round(Math.random() * window.innerWidth),
        -30,
        29,
        {
            angle: Math.PI * (Math.random() * 2 - 1),
            friction: 0.001,
            frictionAir: 0.01,
            restitution: 0.1,
            render: {
                sprite: {
                    texture: './cat.svg',
                    xScale: SIZE / ORIGINAL_SIZE,
                    yScale: SIZE / ORIGINAL_SIZE,
                },
            },
        }
    )

    return cat
}

init()

window.addEventListener(
    'resize',
    () => {
        init()
    },
    true
)
