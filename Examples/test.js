{
    var index = 3;
    let x = 4;
}


function myfunction() {
    var cars = ["BMW", "Volvo", "Mini"];
    var x;
    for (x of cars) {
        document.write(x + "<br >");
    }

    var person = {
        firstName: "John", lastName: "Doe", age: 50,
        eyeColor: "blue"
    };

    var text = "";
    var x;
    for (x in person) {
        text += person[x];
    }
    console.log(text);

}

function createfunc (){
    document.createElement(div);
}
//console.log("outside function: " + index);
//console.log("outside function: " + x);*/