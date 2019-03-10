// Load data for 4 charts and manage it 


// Load data 


// Test

//Find the width of scree



function randomInRange(start, end) {
  return Math.floor(Math.random() * (end - start + 1) + start);
}

const arr = []

const arr2 = []

for(let i = 0; i < 20; i++){
 arr.push(randomInRange(40,200))
}

for(let i = 0; i < 20; i++){
    arr2.push(randomInRange(40,150))
}

// //TODO: delete it!
// function log(...text) {
//     console.log(text)
// }

const numberOfPoints = arr.length

const intervalBetweenPoints = parseInt(innerWidth / numberOfPoints)


const arrMax = Math.max(...arr,...arr2)

function addToPath(curr, prev, xPos) {

    let posOnTheScreen
    const SVG = document.querySelector(`svg`)
    let rectSVG = SVG.getBoundingClientRect()

    let prevPercent = parseInt(prev * 100 / arrMax)
    let prevPos = parseInt(rectSVG.height * prevPercent / 100)


    // IF the element max on the screen
    if (curr === arrMax) {
        posOnTheScreen = 0

        // Add path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttributeNS(null, 'd', `M${xPos - intervalBetweenPoints}, ${prevPos} L${xPos}, ${posOnTheScreen}`)
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttributeNS(null, 'cx', `${xPos - intervalBetweenPoints}`)
        circle.setAttributeNS(null, 'cy', `${prevPos}`)
        circle.setAttributeNS(null, 'r', "2")

        
        SVG.appendChild(path)
        SVG.appendChild(circle)
    }

    else {

        // Position of the current path
        let percent = parseInt((curr * 100) / arrMax); 
        posOnTheScreen = parseInt((rectSVG.height * percent) / 100);

        if(prev === arrMax) prevPos = 0

        // Add path
        const path = document.createElementNS('http://www.w3.org/2000/svg','path')
        path.setAttributeNS(null,'d', `M${xPos - intervalBetweenPoints}, ${prevPos} L${xPos}, ${posOnTheScreen}`)
        
        const circle = document.createElementNS("http://www.w3.org/2000/svg","circle")
        circle.setAttributeNS(null,'cx', `${xPos - intervalBetweenPoints}`)
        circle.setAttributeNS(null,'cy', `${prevPos}`)
        circle.setAttributeNS(null,'r', "2")

        SVG.appendChild(path)
        SVG.appendChild(circle)
    }
}

window.onload = () => {
    const SVG = document.querySelector('svg')
    SVG.style.width = innerWidth

    // Change it for number of elements on the screen
    let xPos = 0
    for (let i = 1; i < arr.length; i++) {
        addToPath(arr[i], arr[i - 1], xPos)

        xPos += intervalBetweenPoints
    }

    let xPos2 = 0
    for (let i = 1; i < arr2.length; i++) {
      addToPath(arr2[i], arr2[i - 1], xPos2);

      xPos2 += intervalBetweenPoints;
    }
}


