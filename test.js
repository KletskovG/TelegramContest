// function loadJSON(callback){
//     let xobj = new XMLHttpRequest()
//     xobj.overrideMimeType('application/json')
//     xobj.open('GET', 'chart_data.json', true)
//     xobj.onreadystatechange = function(){
//         if(xobj.readyState === 4 && xobj.status === '200'){
//          callback(xobj.responseText)
//         }
//     }
//
//     xobj.send(null)
// }
//
// function init(){
//     loadJSON(function(res){
//       let json = JSON.parse(res)
//
//         console.log(json)
//     })
// }
//
// init()
//
// console.log('HEllo')

fetch('chart_data.json')
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))