//import { runInThisContext } from "vm";

let  DATA // DATA form JSON file
window.onload = async () => {
    // Read JSON
    await fetch('chart_data.json')
        .then(res => res.json())
        .then(res => DATA = res)
        .catch(err => console.log(err))

    // TODO: Change DATA[0] to index thaty client is choosed
    let obj = DATA // select graph from json file

    const selector = new Selector()

    const firstGraph = new Graph(obj)

    // Delete current charts and build new
    function rebuildGraph(index, GraphObject) {
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
    const radioInputNew = document.querySelectorAll('.selectLine input')
    for (let i = 0; i < radioInputNew.length; i++) {
        radioInputNew[i].addEventListener('click', buildLine)
    }
}

// TODO: delete it!
window.addEventListener('click', ()=>{
    document.querySelector('#bigSVG-2').style.transform = 'translateY(-20px)'
})