let  DATA // DATA form JSON file

window.onload = async () => {

    // Read JSON
    await fetch('chart_data.json')
        .then(res => res.json())
        .then(res => DATA = res)
        .catch(err => console.log(err))

    // TODO: Change DATA[0] to index thaty client is choosed
    let obj = DATA[0] // select graph from json file
    const firstGraph = new Graph(obj)
    // Build Charts
    firstGraph.addToPath('smallSVG')
    firstGraph.addToPath('bigSVG')
    const selector = new Selector()

    selector.dragSelector()

}

