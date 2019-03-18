//import { runInThisContext } from "vm";
// TODO: Handle touches

let  DATA // DATA form JSON file

window.onload = async () => {
    // Read JSON
    await fetch('chart_data.json')
         .then(res => res.json())
         .then(res => DATA = res)
         .catch(err => console.log(err))

    let obj = DATA // select graph from json file

    const selector = new Selector()

    const firstGraph = new Graph(obj)

    // Delete current charts and build new
    function rebuildGraph() {
        const radioInputs = document.querySelectorAll('.selectGraphs input')
        const radioInputNew = document.querySelectorAll('.selectLine input')
        for (let i = 0; i < radioInputs.length; i++) {
            if (radioInputs[i].checked === true) {
                firstGraph.clearPaths(i)

                firstGraph.addToPath('smallSVG')
                firstGraph.addToPath('bigSVG')
                firstGraph.ReadNames()
            }
        }
        for (let i = 0; i < radioInputNew.length; i++) {
            if (radioInputs[i].checked === true) {
                firstGraph.clearPaths(i)

                // Make selector draggable
                // selector.dragSelector()

                // Build Charts
                firstGraph.addToPath('smallSVG')
                firstGraph.addToPath('bigSVG')

            }

            // Select the graphs here
            const radioInputs = document.querySelectorAll('.selectGraphs input')
            for (let i = 0; i < radioInputs.length; i++) {
                radioInputs[i].addEventListener('click', rebuildGraph)
            }

        }

    }

    selector.dragSelector()

    // Build Charts
    firstGraph.addToPath('smallSVG')
    firstGraph.addToPath('bigSVG')

    // Select the graphs here
    const radioInputs = document.querySelectorAll('.selectGraphs input')
    for (let i = 0; i < radioInputs.length; i++) {
        radioInputs[i].addEventListener('click', rebuildGraph)
    }

    // Select names here
    // const radioInputNew = document.querySelectorAll('.selectLine input')
    // for (let i = 0; i < radioInputNew.length; i++) {
    //     radioInputNew[i].addEventListener('click', buildLine)
    // }

    CircleHover()
}


// TODO DElete it !!
window.addEventListener('mousemove', (evt)=>{
    const circles = document.querySelectorAll('.big circle')

    for(let i = 0; i < circles.length; i++){
        if(circles[i].getBoundingClientRect().left === evt.clientX){
            circles[i].setAttributeNS(null, 'r', '5')
        }

    }
})

// TODO: delete it
function CircleHover() {
    const circles = document.querySelectorAll('.big circle')

    function getPos(el){
        console.log(el.offsetLeft, el.clientLeft)

        return +el.offsetLeft + +el.clientLeft
    }


    for(let i = 0; i < circles.length; i++){
        console.log(getPos(circles[i]))
    }
}