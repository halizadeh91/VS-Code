document.addEventListener('DOMContentLoaded', function() {
    const eventsContainer = document.getElementById('events-container');

    fetch('https://private-amnesiac-f3c71-tixrapi.apiary-proxy.com/v1/groups/1861/events?cpk=k4DuEdE0um63tQM93r70')
        .then(response => response.json())
        .then(data => {
            console.log('API Response Data:', data);

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = 'event';

                    const eventDate = new Date(event.start_date);
                    const eventDateString = `${eventDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} at ${eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} CDT`;

                    eventElement.innerHTML = `
                        <img src="${event.flyer_url}" alt="${event.name} Flyer">
                        <h2>${event.name}</h2>
                        <p>${eventDateString}</p>
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
