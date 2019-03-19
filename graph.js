 // MAKE big svg width in percents

 class Graph {
    constructor(obj){
        this.WholeObj = obj
        this.obj = obj[0]
    }

    showData(){
        return this.obj
    }

    // Find maximum value of the charts in graph
    defineMax(){
        const  arrMax = []

        for(let i = 1; i < this.obj.columns.length; i++){
            let temp = this.obj.columns[i].splice(1, this.obj.columns[i].length)

            arrMax.push(Math.max(...temp))
            this.obj.columns[i].push(...temp)
        }

        return Math.max(...arrMax)
    }

    // Colors the element
    colorElement(element, firstElementOfArray){
        const color = this.obj.colors[firstElementOfArray]
        element.setAttributeNS(null, 'fill', `${color}`)
        element.setAttributeNS(null, 'stroke', `${color}`)
    }

    // set the coordiantes of the path or circle
    setTheCoordsOfElement(element ,startX, startY, endX, endY, attr){
        if(element.tagName === 'path'){
            element.setAttributeNS(null, 'd', `M${startX}, ${startY} L${endX}, ${endY}`)
            element.setAttribute('data-index', `${attr}`)
        }

        else if(element.tagName === 'circle'){
            element.setAttributeNS(null, 'cx', `${startX}`)
            element.setAttributeNS(null, 'cy', `${startY}`)
            element.setAttributeNS(null, 'r', "1")
        }
    }

    //create element where paths and circles will be added
    createWrapForChart(selector, index, SVG){
        const wrap = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
        wrap.classList.add('wrap')
        const width = SVG.getBoundingClientRect().width
        const height= SVG.getBoundingClientRect().height

        wrap.setAttributeNS(null, 'width', `${width}`)
        wrap.setAttributeNS(null, 'height', `${height}`)

        wrap.innerHTML = `
            <svg id="${selector}-${index}" style="width: 100%; height: 100%;">
                
            </svg>    
        `

        SVG.prepend(wrap)

    }



    // Build Charts
    addToPath(selector, charts = this.obj.columns){

        const SVG = document.querySelector(`.${selector}`)
        SVG.style.width = `${innerWidth}`
        const rectSVG = SVG.getBoundingClientRect()
        const intervalBetweenPoints = rectSVG.width / charts[1].length
        const max = this.defineMax()

        console.log(charts[1].length)

        charts.forEach((array, index) => {

                if(index > 0){

                    //Create wrap for chart
                    this.createWrapForChart(selector,index,SVG)
                    const wrap = document.querySelector(`#${selector}-${index}`)

                    let xPos = intervalBetweenPoints * 2

                    let startOfTheLoop
                    typeof charts[1][0] === 'string' ? startOfTheLoop = 2 : startOfTheLoop = 1

                    // // Set the 0 element of the chart
                    // // TODO: fix the bug with the startY
                    // const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
                    // const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
                    //
                    // const startX = 0
                    // const startY = parseInt(array[startOfTheLoop - 1] * 100 / max)
                    //
                    // const endX = intervalBetweenPoints
                    //
                    // let percent = parseInt((array[startOfTheLoop - 1] * 100) / max);
                    // let posOnTheScreen = parseInt((rectSVG.height * percent) / 100);
                    //
                    // const endY = posOnTheScreen
                    //
                    // this.setTheCoordsOfElement(path,startX, startY, startX, startY, startOfTheLoop - 1)
                    // this.setTheCoordsOfElement(circle,startX,startY)
                    // wrap.appendChild(path)
                    // wrap.appendChild(circle)

                    for(let i = startOfTheLoop; i < array.length;i++){
                        const curr = array[i]
                        const prev = array[i - 1]

                        let posOnTheScreen
                        let prevPercent = parseInt(prev * 100 / max)
                        let prevPos = parseInt(rectSVG.height * prevPercent / 100)

                        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
                        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")


                        if(curr === max){
                            this.colorElement(wrap, this.obj.columns[index][0])

                            posOnTheScreen = 2

                            //This consts will be added in to coords of the path and circle
                            const startX = xPos - intervalBetweenPoints
                            const startY = prevPos
                            const endX = xPos
                            const endY = posOnTheScreen

                            this.setTheCoordsOfElement(path,startX, startY, endX, endY, i)
                            this.setTheCoordsOfElement(circle,startX,startY)
                            // this.colorElement(circle, this.obj.columns[index][0])

                            wrap.appendChild(path)
                            wrap.appendChild(circle)
                        }

                        else{
                            this.colorElement(wrap, this.obj.columns[index][0])


                            let percent = parseInt((curr * 100) / max);
                            posOnTheScreen = parseInt((rectSVG.height * percent) / 100);

                            if(prev === max) prevPos = 2

                            // This consts will be added in to the coords of the elements
                            const startX = xPos - intervalBetweenPoints
                            const startY = prevPos
                            const endX = xPos
                            const endY = posOnTheScreen

                            this.setTheCoordsOfElement(path,startX, startY, endX, endY, i)
                            this.setTheCoordsOfElement(circle,startX,startY)

                            wrap.appendChild(path)
                            wrap.appendChild(circle)
                        }

                        xPos += intervalBetweenPoints
                    }

                    // const zeroPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
                    // const zeroCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
                    //
                    // const endCircle = wrap.querySelector('circle')
                    //
                    // const startX = 0
                    // const startY = array[startOfTheLoop - 1] * 100 / max
                    // const endX = intervalBetweenPoints
                    //
                    // const endY = array[startOfTheLoop] * 100 / max
                    // console.log(`startX - ${startX}, startY - ${startY}, endX - ${endX}, endY - ${endY}`)
                    //
                    // this.setTheCoordsOfElement(zeroPath,startX, startY, endX, endY, startOfTheLoop - 1)
                    // this.setTheCoordsOfElement(zeroPath,startX,startY)
                    // //
                    // wrap.appendChild(zeroPath)
                    // wrap.appendChild(zeroCircle)

                }
            })
    }

    // Resizes the graph on move of the selector
    ResizeGraph(){
        // Clear bigSVG
        this.clearBig()

        const context = this

        // Elements
        const smallSVG = document.querySelector('.smallSVG')
        const wraps = document.querySelectorAll('.smallSVG svg')
        const smallSVGWidth = smallSVG.getBoundingClientRect().width
        const leftCorner = document.querySelector('.leftCorner')
        const rightCorner= document.querySelector('.rightCorner')

        // Attributes of corners
        const leftWidth = leftCorner.getBoundingClientRect().width
        const rightWidth = rightCorner.getBoundingClientRect().width
        const leftX = +leftCorner.getAttribute('x')
        const rightX = +rightCorner.getAttribute('x')

        // Array which will we added in to addToPath()
        const charts = [[]]

        // Checks element and push it to charts
        function checkForRightElement(element,index){
            const dataIndex = +element.getAttribute('data-index')
            const elementRect = element.getBoundingClientRect().x

            if(elementRect >= (leftX) && elementRect <= (rightX)){
                // Here push value of charts
                charts[index].push(context.obj.columns[index][dataIndex])
            }
        }

        // Go through each foreignObject
        for(let i = 0; i < wraps.length;i++){

            if(!wraps[i].classList.contains('svgg')){
                const list = wraps[i].children
                charts.push([])

                for(let j = 0; j < list.length; j++){
                    if(list[j].tagName === 'path') checkForRightElement(list[j], i + 1)
                }
            }
        }
        this.addToPath('bigSVG', charts)
    }

    // Set the .bigSVG width bigger than screen width
    // 1 element in this.obj.columns == 20px
    setBigSVGWidth(chartLength){
        const bigSVG = document.querySelector('.bigSVG')


        bigSVG.style.width = `${chartLength * 20}`
    }

    // Delete charts and save selector
    clearPaths(index){
        this.obj = this.WholeObj[index]

        const svgg = document.querySelector('#selector') // Save this element from
        // deleting
        const bigSVG = document.querySelector('.bigSVG')
        const smallSVG = document.querySelector('.smallSVG')

        bigSVG.innerHTML = ''
        smallSVG.innerHTML = ''

        smallSVG.appendChild(svgg)
    }

    // Clear Only Big SVG
    clearBig(){
        const bigSVG = document.querySelector('.bigSVG')
        bigSVG.innerHTML = ''
    }

    // Read names of charts in the graph
    ReadNames(idName){
        const param = this.obj.names
        for (let key in param){
            console.log(key + ' - '+ param[key])
        }
    }

}