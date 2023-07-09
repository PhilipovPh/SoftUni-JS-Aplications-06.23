async function getInfo() {
    const stopId = document.getElementById('stopId').value;
    const busesUl = document.getElementById('buses');
    busesUl.textContent = '';

    try {
        const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`);

        if (!response.ok) {
            const error = new Error(response.statusText);
            throw error;
        }

        const data = await response.json();

        console.log(data);

        document.getElementById('stopName').textContent = data.name;

        Object.entries(data.buses).forEach(([busNumber, time]) => {
            const busesLi = document.createElement('li');
            busesLi.textContent = `Bus ${busNumber} arrives in ${time} minutes`
            busesUl.appendChild(busesLi);
        });
    } catch (err) {
        document.getElementById('stopName').textContent = `Error: ${err.message}`;
    }

}