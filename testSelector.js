class TestSelector{
    constructor(obj) {
        this.obj = obj
    }

    static show(){
        const rightSelector = document.querySelector('.rightCorner')
        const leftSelector = document.querySelector('.leftCorner')

        console.log(rightSelector, leftSelector)
    }

    setPositionOfSelector(){
        const selector = document.querySelector('.selector')
        const smallSVGRect = document.querySelector('.smallSVG').getBoundingClientRect()
        const selectorRect = selector.getBoundingClientRect()


        console.log(selector.style.top)


        selector.style.top = `${parseInt(+smallSVGRect.top - +selectorRect.top)}`
        selector.style.left = '0'
        selector.style.backgroundColor = 'red'
        console.log(selector.style.top)

        console.log('Hello')
    }
}