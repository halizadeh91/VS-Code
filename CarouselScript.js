document.addEventListener('DOMContentLoaded', function() {
    const eventsContainer = document.getElementById('events-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    fetch('https://private-amnesiac-f3c71-tixrapi.apiary-proxy.com/v1/groups/1861/events?cpk=k4DuEdE0um63tQM93r70')
        .then(response => response.json())
        .then(data => {
            console.log('API Response Data:', data);

            if (Array.isArray(data) && data.length > 0) {
                const upcomingEvents = data.slice(0, 8); // Get the first 8 events
                eventsContainer.innerHTML = '';
                upcomingEvents.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = 'event';

                    const eventDate = new Date(event.start_date);
                    const eventDateString = `${eventDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} at ${eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} CDT`;

                    eventElement.innerHTML = `
                        <a href="${event.url}" target="_blank" style="text-decoration: none; color: inherit;">
                            <img src="${event.mobile_image_url}" alt="${event.name} Flyer">
                            <h2>${event.name}</h2>
                            <p>${eventDateString}</p>
                        </a>
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

    prevButton.addEventListener('click', function() {
        eventsContainer.scrollBy({
            left: -eventsContainer.clientWidth,
            behavior: 'smooth'
        });
    });

    nextButton.addEventListener('click', function() {
        eventsContainer.scrollBy({
            left: eventsContainer.clientWidth,
            behavior: 'smooth'
        });
    });
});
