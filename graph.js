 // MAKE big svg width in percents
 // TODO: make func for size the smallSVG
 // TODO: Create inputs on the rebuild The graph
// TODO: calculate the x of the smallSVG

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

    setSmallCharts(){

    }

    // Build Charts
    addToPath(selector, charts = this.obj.columns){

        const SVG = document.querySelector(`.${selector}`)
        SVG.style.width = `${innerWidth}`
        const rectSVG = SVG.getBoundingClientRect()
        let intervalBetweenPoints = rectSVG.width / charts[1].length
        const max = this.defineMax()

        console.log(charts[1].length)

        charts.forEach((array, index) => {

                if(index > 0){

                    //Create wrap for chart
                    this.createWrapForChart(selector,index,SVG)
                    const wrap = document.querySelector(`#${selector}-${index}`)

                    this.colorElement(wrap, this.obj.columns[index][0]) // color the wrap

                    // CHANGE THE WIDTH HERE
                    // IN 3 PARAM
                    if(selector === 'smallSVG'){
                        intervalBetweenPoints = innerWidth * 0.96 / charts[1].length
                        wrap.parentElement.setAttributeNS(null, 'width', `${innerWidth * 0.96}`)
                        wrap.parentElement.setAttributeNS(null, 'x', '30')
                    }

                    let xPos =  0 - intervalBetweenPoints

                    let startOfTheLoop
                    typeof charts[1][0] === 'string' ? startOfTheLoop = 2 : startOfTheLoop = 1

                    for(let i = startOfTheLoop; i < array.length;i++){
                        const curr = array[i]
                        const prev = array[i - 1]

                        let posOnTheScreen
                        let prevPercent = parseInt(prev * 100 / max)
                        let prevPos = parseInt(rectSVG.height * prevPercent / 100)

                        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
                        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")


                        if(curr === max){

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
    ReadNames(name) {
         console.log("run - readnames")
         const param = this.obj.names
         const names = document.querySelectorAll('.selectGraphs').length

         for(name in param){

         }



         // TODO: check it fot usability!!!!
         // if (document.getElementById( 'selectLine') == null) {
         //     this.createForms()
         // }
         // else {
         //     document.getElementById('selectLine').parentNode.removeChild(document.getElementById('selectLine'))
         //     this.createForms()
         // }
         for (let i = 0; i < names; i++) {
             if (name == "0" && document.getElementById('firstLine') == null) {

                 this.CreateInput(name, param)

             }

             else if (name == "1" && document.getElementById('firstLine') == null) {

                 this.CreateInput(name, param)
             }
             else if (name == "4" && document.getElementById('firstLine') == null) {
                 this.CreateInput(name, param)
             }
             else {
                 document.getElementById('firstLine').parentNode.removeChild(document.getElementById('firstLine'))
             }
         }

     }

    CreateInput(line, param) {
        const form = document.querySelector('.selectLine')

        console.log("run - createinput")
        let label1 = document.createElement("label")
        let label2 = document.createElement("label")
        let label3 = document.createElement("label")
        let label4 = document.createElement("label")

        label1.setAttribute('id', 'firstLine')
        label2.setAttribute('id', 'secondLine')
        label3.setAttribute('id', 'thirdLine')
        label4.setAttribute('id', 'fourthLine')

        document.getElementById('selectLine').appendChild(label1)
        document.getElementById('selectLine').appendChild(label2)

        if (line != "4") {
            let input1 = document.createElement("input")
            let input2 = document.createElement("input")

            input1.setAttribute('type', 'checkbox')
            input1.setAttribute('name', 'chart')
            input1.setAttribute('value', param['y0'])
            input2.setAttribute('type', 'checkbox')
            input2.setAttribute('name', 'chart')
            input2.setAttribute('value', param['y1'])

            document.getElementById('firstLine').appendChild(input1)
            document.getElementById('secondLine').appendChild(input2)
         }

        else {
            let input1 = document.createElement("input")
            let input2 = document.createElement("input")
            let input3 = document.createElement("input")
            let input4 = document.createElement("input")

            document.getElementById('selectLine').appendChild(label3)
            document.getElementById('selectLine').appendChild(label4)
            input1.textContent = "FirstLine"

            input2.textContent = "SecondLine"
            input3.textContent = "ThirdLine"
            input4.textContent = "FourthLine"

            input1.setAttribute('type', 'checkbox')
            input2.setAttribute('type', 'checkbox')
            input3.setAttribute('type', 'checkbox')
            input4.setAttribute('type', 'checkbox')

            document.getElementById('firstLine').appendChild(input1)
            document.getElementById('secondLine').appendChild(input2)
            document.getElementById('thirdLine').appendChild(input3)
            document.getElementById('fourthLine').appendChild(input4)
         }
     }
 }