getCovidWorld()

getCovidCountry();

getSelectedNameCovidCountry();

const btnSelectCountry = document.getElementById('selectedCountry');
btnSelectCountry.addEventListener('click', getCountryById);

function getCovidCountry() {
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/274')
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const id = data.location.id;
            const name = data.location.country;
            const population = data.location.country_population;
            const confimed = data.location.latest.confirmed;
            const death = data.location.latest.deaths;
            const time = data.location.last_updated;


            document.getElementById("selectedName").innerHTML = name.toLocaleString("en");
            document.getElementById("selectedId").innerHTML = id.toLocaleString("en");
            document.getElementById("selectedPoplation").innerHTML = population.toLocaleString("en");
            document.getElementById("selectedConfimed").innerHTML = confimed.toLocaleString("en");
            document.getElementById("selectedDeath").innerHTML = death.toLocaleString("en");
            document.getElementById("selectedTimeUpdate").innerHTML = time.substring(0, 10);
            document.getElementById("selectedPercent").innerHTML = ((Number(death) / Number(confimed)) * 100).toLocaleString("en") + '%';
            // console.log(data);
        })

};

function getCountryById(e) {
    console.log(e.target.value);
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/' + e.target.value)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const id = data.location.id;
            const name = data.location.country;
            const population = data.location.country_population;
            const confimed = data.location.latest.confirmed;
            const death = data.location.latest.deaths;
            const time = data.location.last_updated;


            document.getElementById("selectedName").innerHTML = name.toLocaleString("en");
            document.getElementById("selectedId").innerHTML = id.toLocaleString("en");
            document.getElementById("selectedPoplation").innerHTML = population.toLocaleString("en");
            document.getElementById("selectedConfimed").innerHTML = confimed.toLocaleString("en");
            document.getElementById("selectedDeath").innerHTML = death.toLocaleString("en");
            document.getElementById("selectedTimeUpdate").innerHTML = time.substring(0, 10);
            document.getElementById("selectedPercent").innerHTML = ((Number(death) / Number(confimed)) * 100).toLocaleString("en") + '%';
            // console.log(data);
        })


}





function getCovidWorld() {
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const html = data.locations.map(item => {
                const id = item.id;
                const name = item.country;
                const province = item.province;
                const population = item.country_population;
                const confimed = item.latest.confirmed;
                const death = item.latest.deaths;
                const time = item.last_updated.substring(0, 10);
                // const perCent = ((Number(death) / Number(confimed)) * 100).toLocaleString("en") + '%'
                return ` 
                    <ul class="list_world">
                        <li>
                            <p id="code">${id} </p>
                            <p style="color:red" id="country">Quoc Gia:${name} </p>
                            <p style="color:green" id="country">${province} </p>
                            <p id="danSo">Dan so: ${new Intl.NumberFormat().format(population)} </p>
                            <p id="capNhat">Cap Nhat:${time} </p>
                            <p id="caNhiem">Ca nhiem: ${new Intl.NumberFormat().format(confimed)} </p>
                            <p id="tuvong">Tu vong:${new Intl.NumberFormat().format(death)} </p>
                            <p id="phanTram">Phan Tram: ${
                                ((Number(death) / Number(confimed)) * 100).toLocaleString("en", {minimumFractionDigits:2, maximumFractionDigits:2}) + '%'
                            } </p>
                        </li>
                    </ul>
                `
            }).join("");
            document.getElementById("list").insertAdjacentHTML("afterbegin", html);

        });

};

function getSelectedNameCovidCountry() {
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const html = data.locations.map(itemSelected => {
                const id = itemSelected.id;
                const name = itemSelected.country;
                // console.log(name);

                var option = document.createElement('option');
                option.value = id;
                option.innerHTML = name;

                if (itemSelected.province !== '') {
                    option.innerHTML = name + ' ' + itemSelected.province;
                }
                document.getElementById('selectedCountry').appendChild(option);

            });

        });

}