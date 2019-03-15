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
        let max = Math.max(...arrMax) // Max value of arrays

        return max
    }

    colorElement(element, firstElementOfArray){
        const color = this.obj.colors[firstElementOfArray]
        if(element.tagName === 'circle'){
            element.setAttributeNS(null, 'fill', `${color}`)
        }

        else{
            element.setAttributeNS(null, 'stroke', `${color}`)
        }
    }

    // Build Chrats
    // TODO: also set the stroke and so on to this tag
    addToPath(selector){
        this.setBigSVGWidth(this.obj.columns[0].length)

        const SVG = document.querySelector(`.${selector}`)
        const rectSVG = SVG.getBoundingClientRect()
        const intervalBetweenPoints = rectSVG.width / this.obj.columns[0].length

        const max = this.defineMax()

        this.obj.columns.forEach((array, index) => {


            if(index > 0){
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
                        posOnTheScreen = 2
                        path.setAttributeNS(null, 'd', `M${xPos - intervalBetweenPoints}, ${prevPos} L${xPos}, ${posOnTheScreen}`)

                        this.colorElement(path, this.obj.columns[index][0])

                        circle.setAttributeNS(null, 'cx', `${xPos - intervalBetweenPoints}`)
                        circle.setAttributeNS(null, 'cy', `${prevPos}`)
                        circle.setAttributeNS(null, 'r', "1")
                        this.colorElement(circle, this.obj.columns[index][0])

                        SVG.prepend(path)
                        SVG.prepend(circle)
                    }

                    else{

                        let percent = parseInt((curr * 100) / max);
                        posOnTheScreen = parseInt((rectSVG.height * percent) / 100);

                        if(prev === max) prevPos = 2

                        // Add path
                        const path = document.createElementNS('http://www.w3.org/2000/svg','path')
                        path.setAttributeNS(null,'d', `M${xPos - intervalBetweenPoints}, ${prevPos} L${xPos}, ${posOnTheScreen}`)

                        this.colorElement(path, this.obj.columns[index][0])

                        circle.setAttributeNS(null, 'cx', `${xPos - intervalBetweenPoints}`)
                        circle.setAttributeNS(null, 'cy', `${prevPos}`)
                        circle.setAttributeNS(null, 'r', "2")

                        this.colorElement(circle, this.obj.columns[index][0])


                        SVG.prepend(path)
                        SVG.prepend(circle)
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

}