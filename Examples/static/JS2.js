var t;
t = 13.2;

function MyGreeting(){
    var d = new Date;
    console.log(d); 
    console.log(d.getHours());
    if (d.getHours()<12.0) {
        document.getElementById("demo").innerHTML = "Good Morning";
    } else if(d.getHours()<=14.0) {
        document.getElementById("demo").innerHTML = "Good Afternoon";
    }else {
        document.getElementById("demo").innerHTML = "Good Evening";
    }
}
