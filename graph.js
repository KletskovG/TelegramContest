 // MAKE big svg width in percents

class Graph {
    constructor(obj){
        this.WholeObj = obj
        this.obj = obj[0]

        console.log(this.obj)
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
    setTheCoordsOfElement(element ,startX, startY, endX, endY){
        if(element.tagName === 'path'){
            element.setAttributeNS(null, 'd', `M${startX}, ${startY} L${endX}, ${endY}`)
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

    // Build Chrats
    addToPath(selector){
        this.setBigSVGWidth(this.obj.columns[0].length)

        const SVG = document.querySelector(`.${selector}`)
        const rectSVG = SVG.getBoundingClientRect()
        const intervalBetweenPoints = rectSVG.width / this.obj.columns[0].length

        const max = this.defineMax()

        this.obj.columns.forEach((array, index) => {

            if(index > 0){
                //Create wrap for chart
                this.createWrapForChart(selector,index,SVG)
                const wrap = document.querySelector(`#${selector}-${index}`)

                let xPos = 0

                for(let i = 2; i < array.length;i++){
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

                        this.setTheCoordsOfElement(path,startX, startY, endX, endY)


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

                        // This consts whill be added in to the coords of the elements
                        const startX = xPos - intervalBetweenPoints
                        const startY = prevPos
                        const endX = xPos
                        const endY = posOnTheScreen

                        this.setTheCoordsOfElement(path,startX, startY, endX, endY)
                        // this.colorElement(path, this.obj.columns[index][0])

                        this.setTheCoordsOfElement(circle,startX,startY)
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

    // Read names of charts in the graph
    ReadNames(){
        const param = this.obj.names
        for (let key in param){
            console.log(key + ' - '+ param[key])
        }
    }

}