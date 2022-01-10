let count = 0;

const valores = document.querySelector("#value");
const but = document.querySelectorAll(".btn");

but.forEach(function(but) {
    but.addEventListener('click', function(e) {
        const styles = e.currentTarget.classList;
        if (styles.contains('diminuir')) {
            count--;
        } else if (styles.contains('aumentar')) {
            count++;
        } else {
            count = 0;
        }
        valores.textContent = count;
    });
});