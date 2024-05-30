document.addEventListener('DOMContentLoaded', function() {
    const slider1 = document.getElementById('slider1');

    fetch('https://private-amnesiac-f3c71-tixrapi.apiary-proxy.com/v1/groups/1861/events?cpk=k4DuEdE0um63tQM93r70')
        .then(response => response.json())
        .then(data => {
            console.log('API Response Data:', data);

            if (Array.isArray(data) && data.length > 0) {
                slider1.innerHTML = '';
                data.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = 'event';

                    const eventDate = new Date(event.start_date);
                    const eventDateString = `${eventDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} at ${eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} CDT`;

                    eventElement.innerHTML = `
                        <a href="${event.url}" target="_blank" style="text-decoration: none;">
                            <img src="${event.flyer_url}" alt="${event.name} Flyer" style="width:10vw; Height:18vw; object-fit:cover; border-radius:5px;">
                            <h2>${event.name}</h2>
                            <p>${eventDateString}</p>
                        </a>
                    `;
                    slider1.appendChild(eventElement);
                });

                // Initialize the carousel after adding the items
                $('#slider1').slider({
                    NoItemLg: 4,
                    NoItemSm: 4,
                    SlidtoScroll: false,
                    ItemtoSlide: 2
                });
            } else {
                slider1.innerHTML = '<p>No events found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching events:', error);
            slider1.innerHTML = '<p>Failed to load events.</p>';
        });
});
