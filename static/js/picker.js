var btn = document.querySelector("#picker");
var restaurantName = document.querySelector('#name');
var restaurantPos = document.querySelector('#position');

btn.addEventListener("click", function() {
    fetch('/pick', {method: 'GET'}).then(res => {
        return res.json();
    }).then(result => {
        var totalNum = result.length;
        var randomIndex = randomNum(totalNum);
        restaurantName.textContent = result[randomIndex].name;
        restaurantPos.textContent = result[randomIndex].position;
    }).catch(err => {
        console.log(err);
    });
});

var randomNum = (n) => {
    return Math.floor(Math.random() * n);
}