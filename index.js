let DATA // DATA form JSON file

function setTheCoreners(){
    const corners = document.querySelectorAll('.selectCorner')
    for(let i = 0; i < corners.length; i++){
        corners[i].addEventListener('', ()=>{

        })
    }
}

window.onload = async () => {

    await fetch('chart_data.json')
        .then(res => res.json())
        .then(res => DATA = res)
        .catch(err => console.log(err))

    // TODO: Change DATA[0] to index thaty client is choosed
    let obj = DATA[0]
    const firstGraph = new Graph(obj)
    firstGraph.addToPath('smallSVG')
    firstGraph.addToPath('bigSVG')

    const selectorCorners = document.querySelectorAll('.selectCorner')
    for(let i = 0; i < selectorCorners.length; i++){
        // makeDraggable(selectorCorners[i])

        // moveSection(selectorCorners[i],'350','0')
    }
}


// TODO: stop here trying to make selector corners move right
function makeDraggable(elem){
    let svg = elem;
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);

    let selectedElement = false
    let offset

    let prevX

    function startDrag(elem) {
        if(elem.classList.contains('selectCorner')){
            selectedElement = elem
        }
    }

    function getMousePosition(elem) {

    }

    function drag(elem) {
        let transformAttr = ' translate(' + xOffset + ',' + yOffset + ')';
        elem.setAttribute('transform', transformAttr);
    }

    function endDrag(elem) {

    }
}

// function moveSection(elem, xOffset, yOffset) {
//
//     if (elem.classList.contains('selectCorner')) {
//         let transformAttr = ' translate(' + xOffset + ',' + yOffset + ')';
//         elem.setAttribute('transform', transformAttr);
//     }
// }



