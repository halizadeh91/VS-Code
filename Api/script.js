document.addEventListener('DOMContentLoaded', function() {
    const eventsContainer = document.getElementById('events-container');

    fetch('https://private-amnesiac-f3c71-tixrapi.apiary-proxy.com/v1/groups/1861/events?cpk=k4DuEdE0um63tQM93r70')
        .then(response => response.json())
        .then(data => {
            if (data.events && data.events.length > 0) {
                data.events.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = 'event';
                    eventElement.innerHTML = `
                        <h2>${event.name}</h2>
                        <p>${event.description}</p>
                        <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                    `;
                    eventsContainer.appendChild(eventElement);
                });
            } else {
                eventsContainer.innerHTML = '<p>No events found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching events:', error);
            eventsContainer.innerHTML = '<p>Failed to load events.</p>';
        });
});
