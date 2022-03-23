let validate = [];
let correctDrop = false;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    //alert(ev.target.id)
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    const dropElement = ev.target.getAttribute('data-draggable-id')
    const dragElement = document.getElementById(data)
    //console.log(data)
    if (data === dropElement) {
        ev.target.classList.add('dropped')
        dragElement.setAttribute('draggable', 'false')
        correctDrop = true
        validate.push(correctDrop)

    } else {
        ev.target.classList.add('dropped')
        dragElement.setAttribute('draggable', 'false')
        correctDrop = false
        validate.push(correctDrop)
    }

    console.log(validate)

}