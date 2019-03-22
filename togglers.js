class Togglers{
    constructor(DATA){
        this.DATA = DATA
        console.log(this.DATA)
    }

    createFormForGraphs(){
        const form = document.querySelector('.selectGraphs')

        let count = 0
        for(let i = 0; i < this.DATA.length; i++){
            count++
            const p = document.createElement('p')
            if(count === 1){

                p.innerHTML = `
                <input type="radio" id="graph${count}" name="radio-group" checked>
                <label for="graph${count}">Graph № ${count}</label>`

            }
            else{

                p.innerHTML = `
                <input type="radio" id="graph${count}" name="radio-group">
                <label for="graph${count}">Graph № ${count} </label>`
            }
            form.appendChild(p)
        }
    }
}