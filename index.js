//import { runInThisContext } from "vm";
// TODO: Handle touches

let  DATA // DATA form JSON file

window.onload = async () => {
    // const inputs = document.querySelectorAll('.selectLine input')
    // console.log(inputs)

    // Read JSON
    await fetch('chart_data.json')
         .then(res => res.json())
         .then(res => DATA = res)
         .catch(err => console.log(err))

    const firstGraph = new Graph(DATA)
    const selector = new Selector()

    setUpCheckers()

    // Delete current charts and build new
    function rebuildGraph() {
        const radioInputs = document.querySelectorAll('.selectGraphs input')
        const radioInputNew = document.querySelectorAll('.selectLine input')

        for (let i = 0; i < radioInputs.length; i++) {
            if (radioInputs[i].checked === true) {
                firstGraph.clearPaths(i)

                firstGraph.addToPath('smallSVG')
                firstGraph.ResizeGraph()
                firstGraph.ReadNames()

            }
        }

        for (let i = 0; i < radioInputNew.length; i++) {
            console.log(radioInputs)
            if (radioInputs[i].checked === true) {
                // firstGraph.clearPaths(i)
                //
                // // Build Charts
                // firstGraph.addToPath('smallSVG')
                // firstGraph.addToPath('bigSVG')
                // TODO: stop here trying to add inputs
                firstGraph.ResizeGraph()

                firstGraph.ReadNames()
            }

            // Select the graphs here
        }

    }

    // Create custom Event to resize Graph
    window.addEventListener('rebuild', (evt)=>{
        firstGraph.ResizeGraph()
    })


    selector.dragSelector()

    // Build Charts
    firstGraph.addToPath('smallSVG')
    firstGraph.ResizeGraph()

    // Select the graphs here
    const radioInputs = document.querySelectorAll('.selectGraphs input')
    for (let i = 0; i < radioInputs.length; i++) {
        radioInputs[i].addEventListener('click', rebuildGraph)
    }

    // Select names here
    // const radioInputNew = document.querySelectorAll('.selectLine input')
    // for (let i = 0; i < radioInputNew.length; i++) {
    //
    //     radioInputNew[i].addEventListener('click', )
    // }

}
