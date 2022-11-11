const CheckFields = function (info) {
    if (info.Vegtables == "on" || info.HomemadeFood == "on" || info.Other == "on") {
        return true;
    }
    return false;
}

const cleanUP = function (info) {

    if (info.Vegtables != "on") {
        info.Vegtables = "off";
    }
    if (info.HomemadeFood != "on") {
        info.HomemadeFood = "off";
    }
    if (info.Other != "on") {
        info.Other = "off";
    }
    if(info.MoreDetails === ""){
        info.MoreDetails = "None";
    }
    return info;
}




module.exports = { CheckFields, cleanUP };