let DATA
async function getData() {
    // fetch('chart_data.json')
    //     .then(res => res.json())
    //     .then(res => DATA = res)
    //     .catch(err => console.log(err))
}


//TODO: delete it! 
function randomInRange(start, end) {
  return Math.floor(Math.random() * (end - start + 1) + start);
}

const arr = []

for(let i = 0; i < 20; i++){
 arr.push(randomInRange(40,200))
}

const numberOfPoints = arr.length

const intervalBetweenPoints = parseInt(innerWidth / numberOfPoints)

const arrMax = Math.max(...arr)

function addToPath(curr, prev, xPos, selector) {

    let posOnTheScreen
    const SVG = document.querySelector(`${selector}`)
    let rectSVG = SVG.getBoundingClientRect()

    let prevPercent = parseInt(prev * 100 / arrMax)
    let prevPos = parseInt(rectSVG.height * prevPercent / 100)


    // IF the element max on the screen
    if (curr === arrMax) {
        posOnTheScreen = 0

        // Add path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        
        path.setAttributeNS(null, 'd', `M${xPos - intervalBetweenPoints}, ${prevPos} L${xPos}, ${posOnTheScreen}`)
        path.setAttributeNS(null,'filter', 'url(#blueMe)')
        
        
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

function buildChart(){

}

window.onload = async () => {
    // DATA.forEach(object => {
    //     object.columns.forEach(xpos => console.log(xpos))
    // })

    await fetch('chart_data.json')
        .then(res => res.json())
        .then(res => DATA = res)
        .catch(err => console.log(err))

    DATA.forEach(object => {
        object.columns.forEach(xpos => console.log(xpos))
    })


    // const SVG = document.querySelector('svg')
    // SVG.style.width = innerWidth
    // let selector = '.bigChart'
    //
    //
    // // Change it for number of elements on the screen
    // //TODO: refactor ; make function to build charts in for loop
    // let xPos = 0
    // for (let i = 1; i < arr.length; i++) {
    //     addToPath(arr[i], arr[i - 1], xPos, selector)
    //     addToPath(arr[i], arr[i-1],xPos,'.smallChart')
    //     xPos += intervalBetweenPoints
    // }
}


