(function(){

    const $ = q => document.querySelector(q);

    function convertPeriod(mil) {

        var min = Math.floor(mil / 60000);

        var sec = Math.floor((mil % 60000) / 1000);

        return `${min}minutos e ${sec}segundos`;
    };

    function renderGarage () {

        const garage = getGarage();

        $("#garage").innerHTML = "";

        garage.forEach(c => addCarToGarage(c))
    };

    const getGarage = () => localStorage.garage ? JSON.parse(localStorage.garage) : [];

    renderGarage();

    $("#send").addEventListener("click", e => {

        const name = $("#name").value;

        const licence = $("#licence").value;

        const corcarro = $("#corcarro").value;

        const quantasportas = $("#quantasportas").value;

        const propriet = $("#propriet").value;

        if(!name || !licence || !corcarro || !quantasportas || !propriet){

            alert("Digita no campo que está em falta.");

            return;
        }   

        const card = { name, licence, corcarro, quantasportas, propriet, time: new Date() };

        const garage = getGarage();

        garage.push(card);

        localStorage.garage = JSON.stringify(garage);

        addCarToGarage(card);

        $("#name").value = "";

        $("#licence").value = "";

        $("#corcarro").value = "";

        $("#quantasportas").value = "";

        $("#propriet").value = "";

    });

    function addCarToGarage (car) {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${car.name}</td>

            <td>${car.licence}</td>

            <td data-time="${car.time}">

                ${new Date(car.time)
                        .toLocaleString('pt-BR', { 
                            hour: 'numeric', minute: 'numeric' 
                })}

            </td>

            <td>${car.corcarro}</td>

            <td>${car.quantasportas}</td>

            <td>${car.propriet}</td>

            <td>

                <button class="delete">x</button>

            </td>

        `;

        $("#garage").appendChild(row);

    };

    $("#garage").addEventListener("click", (e) => {

        if(e.target.className === "delete")

            checkOut(e.target.parentElement.parentElement.cells);

    });
 
    function checkOut(info) {

        let period = new Date() - new Date(info[2].dataset.time);

        period = convertPeriod(period);

        const licence = info[1].textContent;

        const msg = `Veículo ${info[0].textContent} com a ${licence} esteve ${period} estacionado na garagem. \n\n Gostaria de finalizar?`;

        if(!confirm(msg)) return;
        
        const garage = getGarage().filter(c => c.licence !== licence);

        localStorage.garage = JSON.stringify(garage);
        
        renderGarage();
    };

})()