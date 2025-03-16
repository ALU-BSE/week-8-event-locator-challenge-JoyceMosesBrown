document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search') || '';
    const category = params.get('category') || '';
    const date = params.get('date') || '';
    const eventId = params.get('id'); // Get event ID from the URL

    console.log("Search Query:", searchQuery);
    console.log("Category:", category);
    console.log("Date:", date);
    console.log("Event ID:", eventId);

    const events = [
        { id: 1, name: "Art Exhibition", category: "Art", date: "2025-03-15", location: "South Africa", description: "A captivating art show in south Africa that offers a journey through the world of contemporary art, featuring a variety of styles from both up-and-coming and established artists. ", image: "south Arfrica.jpg" },
        { id: 2, name: "Music Festival:", category: "music", date: "2025-07-10", location: "Nigeria", description: "An immersive music festival celebrating Afrobeat, hip hop, and reggae in Nigeria, where the country’s music scene and rich culture come alive in unforgettable performances.", image: "music5.jpeg" },
        { id: 3, name: "Science Expo", category: "science", date: "2025-08-22", location: "London", description: "A celebration of scientific innovation in London, showcasing the latest breakthroughs in space, robotics, and sustainability, with interactive exhibits and expert talks to engage and inspire attendees.", image: "hello.jpg" },
        { id: 4, name: "Football Tournament", category: "sports", date: "2025-08-05", location: "Egypt", description: "The International Football Tournament brings together the best national teams from across the globe. Held in the heart of Cairo, Egypt, this thrilling event features intense matches, vibrant fan celebrations, and a showcase of football talent. With teams from Europe, Africa, and the Americas, it promises high-energy action on the pitch.", image: "football.jpeg" },
        { id: 5, name: "Cooking Workshop", category: "cooking", date: "2025-o9-12", location: "France", description: "A hands-on Italian cooking experience that lets you dive deep into authentic recipes, with the chance to learn about Italian food culture and create iconic dishes.", image: "cooking.jpg" },
        { id: 6, name: "Outdoor Adventure Camp", category: "outdoor", date: "2025-10-20", location: "Cape town", description: "Experience the thrill of outdoor adventure in the breathtaking landscapes of Cape Town, South Africa. This exciting camp offers a variety of activities, including hiking up the famous Table Mountain, rafting on the mighty Breede River, and wildlife watching in nearby nature reserves.", image: "camp.jpg" },
    
    ];

    function fetchEvents(searchQuery, category, date) {
        const eventContainer = document.getElementById("event-list");

        if (!eventContainer) {
            console.error("Event container not found.");
            return;
        }

        eventContainer.innerHTML = "";

        const filteredEvents = events.filter(event => {
            return (
                (!searchQuery || event.name.toLowerCase().includes(searchQuery.toLowerCase()) || event.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (!category || event.category.toLowerCase() === category.toLowerCase()) &&
                (!date || event.date === date)
            );
        });

        console.log("Filtered Events:", filteredEvents);

        if (filteredEvents.length === 0) {
            eventContainer.innerHTML = `<p class="text-center text-danger">No events found.</p>`;
            return;
        }

        const fragment = document.createDocumentFragment();

        filteredEvents.forEach(event => {
            const eventDiv = document.createElement("div");
            eventDiv.className = "col-md-4 mb-4";
            eventDiv.innerHTML = `
                <div class="card h-100">
                    <img src="assets/images/${event.image}" class="card-img-top" alt="${event.name}">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p><strong>Location:</strong> ${event.location}</p>
                        <p><strong>Date:</strong> ${event.date}</p>
                        <a href="event-details.html?id=${event.id}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            `;
            fragment.appendChild(eventDiv);
        });

        eventContainer.appendChild(fragment);
    }

    if (eventId) {
        const event = events.find(e => e.id === parseInt(eventId));

        if (event) {
            document.getElementById("event-name").textContent = event.name;
            document.getElementById("event-description").textContent = event.description;
            document.getElementById("event-date").textContent = event.date;
            document.getElementById("event-location").textContent = event.location;
            document.getElementById("event-image").src = "assets/images/" + event.image;
            document.getElementById("event-image").alt = event.name;
        } else {
            console.error("Event not found.");
        }
    } else {
        fetchEvents(searchQuery, category, date);
    }
});
