async function fetchEvent() {
    try {
        const response = await  fetch('/api/event');
        const data = await response.json();
        console.log("Dados do evento:", data);

        displayResults(data);

    } catch (error) {
        console.log('Erro: ', error)

        displayError(error);
    }
}


function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2>Evento Nostr Gerado:</h2>
        <pre>${JSON.stringify(data, null, 2 )}</pre>
    `;
}

function displayError(error) {
    const resultsDiv = document.getElementBYId('results');
    resultsDiv.innerHTML = `
        <h2>Erro:</h2>
        <pre>${error}</pre>
    `;
}

document.getElementById('fetchEventButton').addEventListener('click', fetchEvent());



fetchEvent();