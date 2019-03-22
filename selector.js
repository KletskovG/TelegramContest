// Selector in the bottom chart
class Selector {

    dragSelector(){
        const selectorCorners = document.querySelectorAll('.selectCorner')
        const selector = document.querySelector('.selector')
        const selectorMain = document.querySelector('.selectMain')
        const smallSVG = document.querySelector('.smallSVG')

        const context = this

        const svg = document.querySelector('.selector svg')

        // Set width of the selector elements
        const smallSVGWidth = smallSVG.getBoundingClientRect().width
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
                    // if after change distance will be less than 100 then stop
                    // else move the corners

                    if(corner.clientX-width>1 && corner.clientX-width+37<+document.documentElement.clientWidth){
                        elem.setAttributeNS(null, 'x', `${corner.clientX - width}`)
                    }

                    // Change position of the main section of selector
                    // TODO: change + 10 to percents of the window.innerWidth
                    selectorMain.setAttributeNS(null, 'width', `${(+x1 - width)  - (+x2 - width) + 10}`)
                    const pos = leftCorner.getAttribute('x')
                    selectorMain.setAttributeNS(null, 'x',`${+pos +  10}`)


                    // Resize thr Graph
                    const event = new Event('rebuild')

                    window.dispatchEvent(event)

                }


            }

            function endDrag(corner) {
                isPressed = null
            }

            elem.addEventListener('mousedown', startDrag)
            elem.addEventListener('mousemove', drag)
            elem.addEventListener('mouseup', endDrag)
            elem.addEventListener('mouseleave', endDrag)

            elem.addEventListener("touchstart", startDrag)
            elem.addEventListener("touchend", endDrag)
            elem.addEventListener("touchcancel", endDrag)
            elem.addEventListener("touchmove", drag)
        }

        // Moves the middle part of a selector
        function moveMainSelector(){
            let isPressed = false
            let mousePos

            const width = +rightCorner.getAttribute('width')


            function startDragMain(evt){
                isPressed = true
                mousePos = calculateOffset(evt)
                // const x1 = selectorCorners[0].getAttribute('x')
                // const x2 = selectorCorners[1].getAttribute('x')
                //
                // selectorMain.setAttributeNS(null, 'width', `${parseInt((+x1 - width)  - (+x2 - width) + 10)}`)
            }

            // Find the offset between mouse and corners and mainSelector
            function calculateOffset(evt){
                const leftPosition = leftCorner.getAttribute('x')
                const rightPosition = rightCorner.getAttribute('x')

                const mousePos = evt.clientX


                return mousePos - leftPosition
            }

            // Return posotions of right and left corners

            function dragMain(evt){
                const selectorWidth = selectorMain.getBoundingClientRect().width
                const borderWidth = Math.round(+document.querySelector('.leftCorner').width.baseVal.value)

                const selectorMainX = selectorMain.getAttribute('x')

                const nextRightPosition = +selectorMainX + selectorWidth + borderWidth*0.1
                const nextLeftPosition = +selectorMainX - borderWidth

                const x1 = selectorCorners[0].getAttribute('x')
                const x2 = selectorCorners[1].getAttribute('x')

                //selectorMain.setAttributeNS(null, 'width', `${+x1 - +x2}`)



                if(isPressed){

                    // Change position of the main selector
                    if(+evt.clientX - +mousePos + nextRightPosition - nextLeftPosition+borderWidth*2 < document.documentElement.clientWidth && +evt.clientX - +mousePos > 0 ){

                        if(evt.clientX<+document.querySelector('.rightCorner').x.baseVal.value && evt.clientX>+document.querySelector('.leftCorner').x.baseVal.value)
                            selectorMain.setAttributeNS(null, 'x', `${+evt.clientX - +mousePos + borderWidth}`)
                    }

                    // Change position of the corners
                    leftCorner.setAttributeNS(null, 'x', nextLeftPosition)
                    rightCorner.setAttributeNS(null, 'x', nextRightPosition)

                    const event = new Event('rebuild')

                    window.dispatchEvent(event)
                }
            }

            function endDragMain(){
                isPressed = null
            }


            selectorMain.addEventListener('mousedown', startDragMain)
            selectorMain.addEventListener('mousemove', dragMain)
            selectorMain.addEventListener('mouseup', endDragMain)
            selectorMain.addEventListener('mouseleave', endDragMain)

            selectorMain.addEventListener("touchstart", startDragMain)
            selectorMain.addEventListener("touchend", endDragMain)
            selectorMain.addEventListener("touchcancel", endDragMain)
            selectorMain.addEventListener("touchmove", dragMain)
        }

        moveMainSelector()
    }
}




