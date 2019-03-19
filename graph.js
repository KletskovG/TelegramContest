
// MAKE big svg width in percents

class Graph {
    constructor(obj) {
        this.WholeObj = obj
        this.obj = obj[0]

        console.log(this.obj)
    }

    showData() {
        return this.obj
    }

    // Find maximum value of the charts in graph
    defineMax() {
        const arrMax = []

        for (let i = 1; i < this.obj.columns.length; i++) {
            let temp = this.obj.columns[i].splice(1, this.obj.columns[i].length)

            arrMax.push(Math.max(...temp))
            this.obj.columns[i].push(...temp)
        }

        return Math.max(...arrMax)
    }

    // Colors the element
    colorElement(element, firstElementOfArray) {
        const color = this.obj.colors[firstElementOfArray]
        element.setAttributeNS(null, 'fill', `${color}`)
        element.setAttributeNS(null, 'stroke', `${color}`)
    }

    // set the coordiantes of the path or circle
    setTheCoordsOfElement(element, startX, startY, endX, endY) {
        if (element.tagName === 'path') {
            element.setAttributeNS(null, 'd', `M${startX}, ${startY} L${endX}, ${endY}`)
        }

        else if (element.tagName === 'circle') {
            element.setAttributeNS(null, 'cx', `${startX}`)
            element.setAttributeNS(null, 'cy', `${startY}`)
            element.setAttributeNS(null, 'r', "1")
        }
    }

    //create element where paths and circles will be added
    createWrapForChart(selector, index, SVG) {
        const wrap = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
        const width = SVG.getBoundingClientRect().width
        const height = SVG.getBoundingClientRect().height

        wrap.setAttributeNS(null, 'width', `${width}`)
        wrap.setAttributeNS(null, 'height', `${height}`)

        wrap.innerHTML = `
            <svg id="${selector}-${index}" style="width: 100%; height: 100%;">
                
            </svg>    
        `

        SVG.prepend(wrap)

    }

    // Build Chrats
    addToPath(selector) {
        this.setBigSVGWidth(this.obj.columns[0].length)

        const SVG = document.querySelector(`.${selector}`)
        const rectSVG = SVG.getBoundingClientRect()
        const intervalBetweenPoints = rectSVG.width / this.obj.columns[0].length

        const max = this.defineMax()

        this.obj.columns.forEach((array, index) => {

            if (index > 0) {
                //Create wrap for chart
                this.createWrapForChart(selector, index, SVG)
                const wrap = document.querySelector(`#${selector}-${index}`)

                let xPos = 0

                for (let i = 2; i < array.length; i++) {
                    const curr = array[i]
                    const prev = array[i - 1]

                    let posOnTheScreen
                    let prevPercent = parseInt(prev * 100 / max)
                    let prevPos = parseInt(rectSVG.height * prevPercent / 100)

                    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
                    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")

                    if (curr === max) {
                        this.colorElement(wrap, this.obj.columns[index][0])

                        posOnTheScreen = 2

                        //This consts will be added in to coords of the path and circle
                        const startX = xPos - intervalBetweenPoints
                        const startY = prevPos
                        const endX = xPos
                        const endY = posOnTheScreen

                        this.setTheCoordsOfElement(path, startX, startY, endX, endY)


                        this.setTheCoordsOfElement(circle, startX, startY)
                        // this.colorElement(circle, this.obj.columns[index][0])

                        wrap.appendChild(path)
                        wrap.appendChild(circle)


                    }

                    else {
                        this.colorElement(wrap, this.obj.columns[index][0])


                        let percent = parseInt((curr * 100) / max);
                        posOnTheScreen = parseInt((rectSVG.height * percent) / 100);

                        if (prev === max) prevPos = 2

                        // This consts whill be added in to the coords of the elements
                        const startX = xPos - intervalBetweenPoints
                        const startY = prevPos
                        const endX = xPos
                        const endY = posOnTheScreen

                        this.setTheCoordsOfElement(path, startX, startY, endX, endY)
                        // this.colorElement(path, this.obj.columns[index][0])

                        this.setTheCoordsOfElement(circle, startX, startY)
                        // this.colorElement(circle, this.obj.columns[index][0])

                        wrap.appendChild(path)
                        wrap.appendChild(circle)
                    }

                    xPos += intervalBetweenPoints
                }
            }
        })
    }

    // Set the .bigSVG width bigger than screen width
    // 1 element in this.obj.columns == 20px
    setBigSVGWidth(chartLength) {
        const bigSVG = document.querySelector('.bigSVG')

        bigSVG.style.width = `${chartLength * 20}`

    }

    // Delete charts and save selector
    clearPaths(index) {
        this.obj = this.WholeObj[index]

        const svgg = document.querySelector('#selector') // Save this element from
        // deleting
        const bigSVG = document.querySelector('.bigSVG')
        const smallSVG = document.querySelector('.smallSVG')

        bigSVG.innerHTML = ''
        smallSVG.innerHTML = ''

        smallSVG.appendChild(svgg)
    }

    // Read names of charts in the graph
    ReadNames(name) {
        console.log("run - readnames")
        const param = this.obj.names
        const names=document.querySelectorAll('.selectGraphs').length

        if(document.getElementById('selectLine')==null){
            this.createForms()
        }
        else{
            document.getElementById('selectLine').parentNode.removeChild(document.getElementById('selectLine'))
            this.createForms()
        }
        for (let i=0;i<names;i++) {
            if (name == "0" && document.getElementById('firstLine')==null) {

                this.CreateInput(name,param)
                
            }

            else if (name == "1" && document.getElementById('firstLine')==null ) {
                
                this.CreateInput(name,param)
            }
            else if (name == "4" && document.getElementById('firstLine')==null ){
                this.CreateInput(name,param)
            }
            else{
                document.getElementById('firstLine').parentNode.removeChild(document.getElementById('firstLine'))
            }
        }

    }
    CreateInput(line,param){
        console.log("run - createinput")
        let label1=document.createElement("label")
        let label2=document.createElement("label")
        let label3=document.createElement("label")
        let label4=document.createElement("label")

        label1.setAttribute('id','firstLine')
        label2.setAttribute('id','secondLine')
        label3.setAttribute('id','thirdLine')
        label4.setAttribute('id','fourthLine')

        document.getElementById('selectLine').appendChild(label1)
        document.getElementById('selectLine').appendChild(label2)
        
        if(line!="4"){
            let input1=document.createElement("input")
            let input2=document.createElement("input")

            input1.setAttribute('type','checkbox')
            input1.setAttribute('name','chart')
            input1.setAttribute('value',param['y0'])
            input2.setAttribute('type','checkbox')
            input2.setAttribute('name','chart')
            input2.setAttribute('value',param['y1'])

            document.getElementById('firstLine').appendChild(input1)
            document.getElementById('secondLine').appendChild(input2)
        }
        else{
            let input1=document.createElement("input")
            let input2=document.createElement("input")
            let input3=document.createElement("input")
            let input4=document.createElement("input")

            document.getElementById('selectLine').appendChild(label3)
            document.getElementById('selectLine').appendChild(label4)

            input1.textContent="FirstLine"
            input2.textContent="SecondLine"  
            input3.textContent="ThirdLine"
            input4.textContent="FourthLine"          
            
            input1.setAttribute('type','checkbox')
            input2.setAttribute('type','checkbox')
            input3.setAttribute('type','checkbox')
            input4.setAttribute('type','checkbox')

            document.getElementById('firstLine').appendChild(input1)
            document.getElementById('secondLine').appendChild(input2)
            document.getElementById('thirdLine').appendChild(input3)
            document.getElementById('fourthLine').appendChild(input4)
        
        }
    }
    createForms(){
        console.log('run - createforms')
        let createForm=document.createElement("form")

        createForm.setAttribute('action','')
        createForm.setAttribute('id','selectLine')
        createForm.setAttribute('class','selectLine')
        document.getElementById('app').appendChild(createForm)
    
    }


}