// Load data for 4 charts and manage it 


// Load data 


// Test

//Find the width of scree

const arr = [100,200,20,30,80,60,50,90,150]

//TODO: delete it!
function log(...text){
    console.log(text)
}

const numberOfPoints = arr.length

const intervalBetweenPoints = parseInt(innerWidth / numberOfPoints)


const arrMax = Math.max(...arr)

function addToPath(curr, prev, xPos){
    log('Try to add path')
    
    let posOnTheScreen
    const SVG = document.querySelector(`svg`)
    let rectSVG = SVG.getBoundingClientRect()

    let prevPercent = parseInt(prev * 100 / arrMax)
    let prevPos = parseInt(rectSVG.height * prevPercent / 100)

    
    console.log(curr, max)
    // IF the element max on the screen
    if(curr === arrMax){
        posOnTheScreen = parseInt(rectSVG.height)

        // ADd path here
    }

    else{
        
          let percent = parseInt((curr * 100) / arrMax); // Percent of SVG height
          posOnTheScreen = parseInt((rectSVG.height * percent) / 100); // Find the position on the screen PIXELS

          // ADd path here
          const path = document.createElement('path')
          path.setAttribute('d', `M${xPos - intervalBetweenPoints}, ${prevPos} L${xPos}, ${posOnTheScreen}`)
          const circle = document.createElement('circle')
          circle.setAttribute('cx', `${xPos - intervalBetweenPoints}`)
          circle.setAttribute('cy', `${prevPos}`)
          circle.setAttribute('r', "2")

          SVG.appendChild(path)
          SVG.appendChild(circle)
        }

    // log(curr,prev, xPos)
}

window.onload = ()=> {
    const SVG = document.querySelector('svg')
    SVG.style.width = innerWidth

    // ADd path here
    // Change it for number of elements on the screen
    let xPos = 0
    for(let i = 1; i < arr.length; i++){
        addToPath(arr[i], arr[i - 1], xPos)

        xPos += intervalBetweenPoints
    }
}


