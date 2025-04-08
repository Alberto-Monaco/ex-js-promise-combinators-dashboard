//! In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query),
//! che accetta una città come input e recupera simultaneamente:

// Nome completo della città e paese da  /destinations?search=[query]
// (result.name, result.country, nelle nuove proprietà city e country).

// Il meteo attuale da /weathers?search={query}
// (result.temperature e result.weather_description nella nuove proprietà temperature e weather).

// Il nome dell’aeroporto principale da /airports?search={query}
// (result.name nella nuova proprietà airport).

// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
// Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).

// Note del docente
// Scrivi la funzione getDashboardData(query), che deve:

// Essere asincrona (async).
// Utilizzare Promise.all() per eseguire più richieste in parallelo.
// Restituire una Promise che risolve un oggetto contenente i dati aggregati.
// Stampare i dati in console in un messaggio ben formattato.
// Testa la funzione con la query "london"

//? Esempio di utilizzo

// getDashboardData('london')
//     .then(data => {
//         console.log('Dasboard data:', data);
//         console.log(
//             `${data.city} is in ${data.country}.\n` +
//             `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
//             `The main airport is ${data.airport}.\n`
//         );
//     })
//     .catch(error => console.error(error));

//? Esempio di output atteso

// Risposta API
// {
//   city: "London",
//   country: "United Kingdom",
//   temperature: 18,
//     weather: "Partly cloudy",
//   airport: "London Heathrow Airport"
// }
// Output in console
// London is in United Kingdom.
// Today there are 18 degrees and the weather is Partly cloudy.
// The main airport is London Heathrow Airport.

// Funzione asincrona che prende una città come parametro
async function getDashboardData(query) {
	// URL base dell'API
	const BASE_URL = 'https://boolean-spec-frontend.vercel.app/freetestapi'

	// Prima Promise: recupera i dati della destinazione (città e paese)
	const destinationsPromise = fetch(`${BASE_URL}/destinations?search=${query}`).then((dest) => dest.json())
	// Seconda Promise: recupera i dati meteo
	const weathersPromise = fetch(`${BASE_URL}/weathers?search=${query}`).then((weather) => weather.json())
	// Terza Promise: recupera i dati dell'aeroporto
	const airportsPromise = fetch(`${BASE_URL}/airports?search=${query}`).then((airport) => airport.json())

	// Attende che tutte le Promise siano risolte e destruttura i risultati
	const [destinations, weathers, airports] = await Promise.all([destinationsPromise, weathersPromise, airportsPromise])

	// Crea l'oggetto con i dati aggregati prendendo il primo risultato di ogni array
	const dashboardData = {
		city: destinations[0].name,
		country: destinations[0].country,
		temperature: weathers[0].temperature,
		weather: weathers[0].weather_description,
		airport: airports[0].name
	}

	// Restituisce l'oggetto con i dati
	return dashboardData
}

// Chiamata alla funzione con 'london' come parametro e gestione del risultato
getDashboardData('london')
	.then((data) => {
		console.log(
			`${data.city} is in ${data.country}. \n` +
				`Today there are ${data.temperature} degrees and the weather is ${data.weather}. \n` +
				`The main airport is ${data.airport}. \n`
		)
	})
	.catch((error) => console.error(error)) // Gestione degli errori
