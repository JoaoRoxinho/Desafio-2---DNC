// CEP
const cepForm = document.querySelector("#form")
const cepInput = document.querySelector("#CEP-input")
const adressOutput = document.querySelector("#adress-output")
const bairroOutput = document.querySelector("#bairro-output")
const estadoOutput = document.querySelector("#estado-output")

// Só aceitar carcteres númericos
cepInput.addEventListener("input", (e) => {
    // Vai substituir os carcteres não númericos \D por uma string vazia ''
    e.target.value = e.target.value.replace(/\D/g, '');
});


cepInput.addEventListener("keyup", (e) => {

    const inputValue = e.target.value

    if(inputValue.length === 8) {
        getAdressData(inputValue)
    }
})

const getAdressData = async (cep) =>{
    const apiCepUrl = `https://viacep.com.br/ws/${cep}/json/`;

    const responseCep = await fetch(apiCepUrl);

    const dataCep = await responseCep.json();

    console.log(dataCep);

    // Caso o CEP seja invalido
    if (dataCep.erro) {
        alert("CEP inválido. Por favor, tente novamente.");
        cepInput.value = ""; // Limpa apenas o campo de CEP
        cepInput.placeholder = "CEP inválido. Por favor, tente novamente.";
        cepInput.classList.add("error");
        cepInput.blur();
        return;
    }

    // Restaura o placeholder original caso o CEP seja válido
    cepInput.placeholder = "Insira o CEP";
    cepInput.classList.remove("error");

    adressOutput.textContent = dataCep.logradouro;
    bairroOutput.textContent = dataCep.bairro;
    estadoOutput.textContent = dataCep.estado;
};

// CLIMA
const latitudeInput = document.querySelector("#latitude");
const longitudeInput = document.querySelector("#longitude");
const weatherOutput = document.querySelector('#weather-output');
const btnForm = document.querySelector('#btn-form');

// Só aceitar carcteres ^0-9.,-
const somenteCaracteres = (inputValue) => {
    inputValue.addEventListener("input", (e) =>{
        e.target.value = e.target.value.replace(/[^0-9.,-]/g, '');
    });
};

somenteCaracteres(latitudeInput);
somenteCaracteres(longitudeInput);

// Tentando usar o try catch
getWeatherData = async (latitude, longitude) =>{
    const apiWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
    try {
        const responseWeather = await fetch(apiWeatherUrl);

        if (!responseWeather.ok) {
            throw new Error(`Erro: ${responseWeather.status}`);
        }
        const dataWeather = await responseWeather.json();
        
        const currentWeather = dataWeather.current.temperature_2m;

        console.log(dataWeather);
        console.log(currentWeather);
        weatherOutput.textContent = `${currentWeather}°C`;

    } catch (error) {
        console.log("Ocorreu um erro ao tentar captar os dados da API Weather:", error)
    }
    
}

btnForm.addEventListener("click", (e) => {
    e.preventDefault();
    
    const latitude = latitudeInput.value;
    const longitude = longitudeInput.value;

    if (latitude && longitude) {
        getWeatherData(latitude, longitude);
    } else {
        alert("Por favor, preencha os campos de latitude e longitude.");
    }
});