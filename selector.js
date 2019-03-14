// Selector in the bottom chart
function dragSelector(){
    const selectorCorners = document.querySelectorAll('.selectCorner')
    const selector = document.querySelector('.selector')
    const selectorMain = document.querySelector('.selectMain')
    const smallSVG = document.querySelector('.smallSVG')

    //Offsets


    const svg = document.querySelector('.selector svg')


    // Set width of the selector elements
    const smallSVGWidth = smallSVG.getBoundingClientRect().width
    // TODO: set the width here
    selector.setAttributeNS(null, 'width',`${window.innerWidth}`)

    for(let i = 0; i < selectorCorners.length; i++){
        selectorCorners[i].setAttributeNS(null, 'width', `${smallSVGWidth * 0.02}`)
    }

    // left and right element of selector
    document.querySelector('.leftCorner').setAttributeNS(null, 'x', `0`)
    const rightCornerStartPos = smallSVGWidth * 0.25 - smallSVGWidth * 0.02
    document.querySelector('.rightCorner').setAttributeNS(null, 'x', `${rightCornerStartPos}`)

    //main section of the selector
    selectorMain.setAttributeNS(null, 'x', `${smallSVGWidth * 0.02}`)
    const selectorMainLen = rightCornerStartPos - smallSVGWidth * 0.02
    selectorMain.setAttributeNS(null, 'width', `${selectorMainLen}`)

    const svgg = document.querySelector('.svgg')
    document.querySelector('.svgg').addEventListener('click', (e)=>{
        svgg.style.left = `200px`
    })

    const rightCorner = document.querySelector('.rightCorner')
    moveCorner(rightCorner)
    const leftCorner = document.querySelector('.leftCorner')
    moveCorner(leftCorner)

    // Moves the corner (left or right) of a selector
    function moveCorner(corner){
        let elem = corner
        let isPressed = false

        const width = elem.getAttribute('width')

        function checkForCornersCollision(){
            const x1 = selectorCorners[0].getAttribute('x')
            console.log(selectorCorners[0])
            const x2 = selectorCorners[1].getAttribute('x')

            return x2 - x1;
        }

        function startDrag(corner){
            isPressed = true
        }

        function drag(corner){
            const x1 = selectorCorners[0].getAttribute('x')
            const x2 = selectorCorners[1].getAttribute('x')

            if(isPressed){
                // TODO: Get the distance between corners
                 // if after change distance will be less than 100 then stop
                 // else move the corners

                elem.setAttributeNS(null, 'x', `${corner.clientX - width}`)

                // Change position of the main section of selector
                selectorMain.setAttributeNS(null, 'width', `${(+x1 - width)  - (+x2 - width) + 10}`)
                const pos = leftCorner.getAttribute('x')
                selectorMain.setAttributeNS(null, 'x',`${pos +  10}`)
           }
        }

        function endDrag(corner) {
            isPressed = null
        }

        elem.addEventListener('mousedown', startDrag)
        elem.addEventListener('mousemove', drag)
        elem.addEventListener('mouseup', endDrag)
        elem.addEventListener('mouseleave', endDrag)
    }

    // Moves the middle part of a selector
    function moveMainSelector(){
        let isPressed = false
        let mousePos


        function startDragMain(evt){
            isPressed = true
            mousePos = calculateOffset(evt)
        }

        // Find the offset between mouse and corners and mainSelector
        function calculateOffset(evt){
            const leftPosition = leftCorner.getAttribute('x')
            const rightPosition = rightCorner.getAttribute('x')

            const mousePos = evt.clientX


            return mousePos - leftPosition
       }

        function dragMain(evt){
            const selectorWidth = selectorMain.getBoundingClientRect().width

            if(isPressed){

                // Change position of the main selector
                selectorMain.setAttributeNS(null, 'x', `${evt.clientX - mousePos}`)

                // Change position of the corners
                const selectorMainX = selectorMain.getAttribute('x')
                leftCorner.setAttributeNS(null, 'x', selectorMainX)
                const rightCornerPosition = Number(+selectorMainX + selectorMainLen)

                rightCorner.setAttributeNS(null, 'x', `${rightCornerPosition}`)
            }
        }

        function endDragMain(){
            isPressed = null
        }


        selectorMain.addEventListener('mousedown', startDragMain)
        selectorMain.addEventListener('mousemove', dragMain)
        selectorMain.addEventListener('mouseup', endDragMain)
        selectorMain.addEventListener('mouseleave', endDragMain)
    }

    moveMainSelector()
}





