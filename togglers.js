function setUpCheckers(){
    const checkers = document.querySelectorAll('.selectGraphs-checker')
    const inputs = document.querySelectorAll('.graphInput')
    console.log(checkers)

    for(let i = 0; i < checkers.length; i++){

        // toggle Radio buttons
        checkers[i].addEventListener('click', (evt)=>{
            for(let j = 0 ;j < inputs.length; j++)
                inputs[i].checked = false

            const toggle = checkers[i].querySelector('.checkerRadio-in')

            toggle.classList.toggle('switchedOn')
            toggle.parentElement.children[0].checked = true

        })
    }
}