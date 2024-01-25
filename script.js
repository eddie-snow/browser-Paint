const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input-color");
const tools = document.querySelectorAll(".button-tool");
const sizeButtons = document.querySelectorAll(".button-size");
const buttonClear = document.querySelector(".button-clear");


let brushSize = 20

let isPainting = false

let activeTool = "brush"

inputColor.addEventListener("change", ({ target }) =>{ //change color if input color is changed
  ctx.fillStyle = target.value
})

canvas.addEventListener("mousedown", ({ clientX, clientY}) =>{ //ao clicar o mouse
  isPainting = true

  if (activeTool == "brush"){
    draw (clientX, clientY)
  }

  if (activeTool == "eraser"){
    erase (clientX, clientY)
  }
})

canvas.addEventListener("mousemove", ({ clientX, clientY}) =>{ //ao move o mouse
  if (isPainting){
    if (activeTool == "brush"){
      draw (clientX, clientY)
    }

    if (activeTool == "eraser"){
      erase (clientX, clientY)
    }
  }
})

canvas.addEventListener("mouseup", ({ clientX, clientY}) =>{ //ao parar de clicar o mouse
  isPainting = false
})

const draw = (x, y) => {

  ctx.globalCompositeOperation = "source-over" //resetando o erase
  ctx.beginPath()
  ctx.arc(x - canvas.offsetLeft, // ctx.arc to make it circle
          y -canvas.offsetTop, //x-offsetleft/top is to make it so you draw right where your mouse is on the canvas, not taking the entire screen into consideration
          brushSize/2,  //brushsize is the radius, we devided per 2 because diametro = r*2 caso contrario o tamanho seria o dobro do brushsize 
          0, //0  2 * Math.PI the the angulo(angle) em radiano nao em graus, (PI metade circulo, PI*2 entire circulo). tudo isso sao parametros necessarios ao criar um brush circular
          2 * Math.PI
  )                                                                       
                                                                       
  ctx.fill()
}

const erase = (x, y) => {

  ctx.globalCompositeOperation = "destination-out" //ao inves de color, ele vai tirar 
  ctx.beginPath()
  ctx.arc(x - canvas.offsetLeft,
          y -canvas.offsetTop,
          brushSize/2,  
          0, 
          2 * Math.PI
  )                                                                       
                                                                       
  ctx.fill()
}

const selectTool = ({target}) =>{ //{target} so we dont need to event.target
  const selectTool = target.closest("button") //convergencias entre button e span, depending if you clicked on the button or icon, so we set it the the closest
  const action = selectTool.getAttribute("data-action")

  if (action){ //ou seja != null
    tools.forEach ((tool) => tool.classList.remove("active")) //limpar todas as ferramentas da classe active
    selectTool.classList.add("active") //class de backgroud diferent para tood selectionada
    activeTool = action
  }
}

const selectSize = ({target}) =>{ 
  const selectTool = target.closest("button")
  const size = selectTool.getAttribute("data-size")

  sizeButtons.forEach ((tool) => tool.classList.remove("active")) 
  selectTool.classList.add("active")
  brushSize = size
}

tools.forEach((tool) => { //tool eh uma lista(selectAll)
  tool.addEventListener("click", selectTool)
})

sizeButtons.forEach((button) => {
  button.addEventListener("click", selectSize)
})

buttonClear.addEventListener("click", ()=> { //limpar o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})