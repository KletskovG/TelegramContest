//


let DATA // DATA form JSON file



window.onload = async () => {

    // Read JSON
    await fetch('chart_data.json')
        .then(res => res.json())
        .then(res => DATA = res)
        .catch(err => console.log(err))

    // TODO: Change DATA[0] to index thaty client is choosed
    let obj = DATA[0]
    const firstGraph = new Graph(obj)
    // Build Charts
    firstGraph.addToPath('smallSVG')
    firstGraph.addToPath('bigSVG')

    const selector = new Selector()

    selector.dragSelector()
    


    // const selectorCorners = document.querySelectorAll('.selectCorner')
    // const selector = document.querySelector('.selector')
    // for(let i = 0; i < selectorCorners.length; i++){
    //     makeDraggable(selectorCorners[i])
    // }
    //
    // const smallSVG = document.querySelector('.smallSVG')
    // smallSVG.children[0].remove()
    // smallSVG.appendChild(selector)
    //
    //
    // const main = document.querySelector('.selectMain')
    // makeDraggable(main)

    // dragSelector()


}

