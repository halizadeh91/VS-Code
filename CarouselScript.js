$(document).ready(function () {
    const eventsContainer = $("#events-container");
    const prevButton = $("#prev-button");
    const nextButton = $("#next-button");
    let isAnimating = false;

    function fetchEvents() {
        return fetch('https://private-amnesiac-f3c71-tixrapi.apiary-proxy.com/v1/groups/1861/events?cpk=k4DuEdE0um63tQM93r70')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    eventsContainer.html('');
                    data.forEach(event => {
                        const eventDate = new Date(event.start_date);
                        const eventDateString = `${eventDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} at ${eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} CDT`;

                        const eventElement = $(`
                            <div class="event">
                                <a href="${event.url}" target="_blank" style="text-decoration: none; color: inherit;">
                                    <img src="${event.mobile_image_url}" alt="${event.name} Flyer">
                                    <h2>${event.name}</h2>
                                    <p>${eventDateString}</p>
                                </a>
                            </div>
                        `);
                        eventsContainer.append(eventElement);
                    });

                    // Clone events to create an infinite scroll effect
                    const items = eventsContainer.children();
                    const len = items.length;

                    for (let i = 0; i < len; i++) {
                        const clone = items.eq(i).clone(true);
                        eventsContainer.append(clone);
                    }

                    // Start the initial animation
                    createTimeline();
                    startAnimation();
                } else {
                    eventsContainer.html('<p>No events found.</p>');
                }
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                eventsContainer.html('<p>Failed to load events.</p>');
            });
    }

    function initSlider() {
        fetchEvents().then(() => {
            const slider = $("#slider1");
            const landingWrapper = slider.find(".carousel");
            const item = slider.find(".event");
            const numSlides = item.length;
            const contentWidth = slider.width();
            const itemWidth = contentWidth / 3; // Assuming 3 items per view
            const totalWidth = itemWidth * numSlides;

            item.css("width", itemWidth);
            landingWrapper.css("width", totalWidth);

            function scrollLeft() {
                gsap.to(landingWrapper, {
                    scrollTo: { x: "-=" + itemWidth * 3 },
                    duration: 0.5,
                    onComplete: () => {
                        isAnimating = false;
                        startAnimation();
                    }
                });
            }

            function scrollRight() {
                gsap.to(landingWrapper, {
                    scrollTo: { x: "+=" + itemWidth * 3 },
                    duration: 0.5,
                    onComplete: () => {
                        isAnimating = false;
                        startAnimation();
                    }
                });
            }

            function startAnimation() {
                gsap.to(landingWrapper, {
                    scrollTo: { x: totalWidth },
                    duration: 20,
                    ease: "none",
                    onComplete: function () {
                        gsap.set(landingWrapper, { scrollTo: { x: 0 } });
                        startAnimation();
                    }
                });
            }

            function stopAnimation() {
                gsap.killTweensOf(landingWrapper);
            }

            prevButton.on("click", function () {
                stopAnimation();
                scrollLeft();
            });

            nextButton.on("click", function () {
                stopAnimation();
                scrollRight();
            });

            $(".carousel-container").hover(
                function () {
                    stopAnimation();
                },
                function () {
                    startAnimation();
                }
            );

            startAnimation();
        });
    }

    initSlider();
});
