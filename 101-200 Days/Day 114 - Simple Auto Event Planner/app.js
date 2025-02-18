document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const eventForm = document.getElementById("eventForm");
    const calendar = document.getElementById("calendar");

    // ----- Google Calendar API Integration (Sample) -----
    // Replace the following placeholders with your actual credentials.
    const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
    const API_KEY = 'YOUR_API_KEY';
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = "https://www.googleapis.com/auth/calendar.events";

    // Load the Google API client and initialize it.
    function initGoogleAPI() {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            }).then(() => {
                console.log("Google API client initialized.");
            }, (error) => {
                console.error("Error initializing Google API client", error);
            });
        });
    }

    // Call initGoogleAPI if gapi is available.
    if (typeof gapi !== 'undefined') {
        initGoogleAPI();
    }

    // Function to sync an event with Google Calendar.
    // In production, you should check for sign-in and handle errors.
    function syncEventWithGoogleCalendar(eventData) {
        // Convert our event data to a format accepted by Google Calendar.
        const event = {
            summary: eventData.title,
            description: eventData.description,
            start: {
                dateTime: new Date(`${eventData.date}T${eventData.time}`).toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            end: {
                // Assume the event lasts 1 hour
                dateTime: new Date(new Date(`${eventData.date}T${eventData.time}`).getTime() + 60 * 60 * 1000).toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
        };

        // Check if the user is signed in; if not, prompt sign-in.
        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
            gapi.auth2.getAuthInstance().signIn().then(() => {
                insertEvent(event);
            });
        } else {
            insertEvent(event);
        }
    }

    function insertEvent(event) {
        gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        }).then(response => {
            console.log("Event synced to Google Calendar:", response.result);
        }, error => {
            console.error("Error syncing event:", error);
        });
    }
    // ----- End Google Calendar API Integration -----

    // ----- Utility Functions -----
    // Generate a simple unique ID based on the current timestamp.
    function generateId() {
        return Date.now().toString();
    }

    // Load events from localStorage and render them
    function loadEvents() {
        const events = JSON.parse(localStorage.getItem("events") || "[]");
        renderCalendar(events);
    }

    // Save events to localStorage
    function saveEvents(events) {
        localStorage.setItem("events", JSON.stringify(events));
    }

    // Render calendar events grouped by date, including action buttons.
    function renderCalendar(events) {
        calendar.innerHTML = "";
        if (events.length === 0) {
            calendar.innerHTML = "<p>No upcoming events.</p>";
            return;
        }

        // Group events by date.
        const eventsByDate = events.reduce((acc, event) => {
            acc[event.date] = acc[event.date] || [];
            acc[event.date].push(event);
            return acc;
        }, {});

        for (const date in eventsByDate) {
            const dateHeader = document.createElement("h3");
            dateHeader.textContent = date;
            calendar.appendChild(dateHeader);

            eventsByDate[date].forEach(event => {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("calendar-event");
                if (event.completed) {
                    eventDiv.classList.add("completed");
                }
                eventDiv.innerHTML = `<strong>${event.title}</strong> at ${event.time}<br>${event.description || ""}`;

                // Create the actions container.
                const actionsDiv = document.createElement("div");
                actionsDiv.classList.add("event-actions");

                // Edit Button
                const editBtn = document.createElement("button");
                editBtn.className = "edit";
                editBtn.textContent = "Edit";
                editBtn.addEventListener("click", () => {
                    editEvent(event.id);
                });
                actionsDiv.appendChild(editBtn);

                // Cancel Button
                const cancelBtn = document.createElement("button");
                cancelBtn.className = "cancel";
                cancelBtn.textContent = "Cancel";
                cancelBtn.addEventListener("click", () => {
                    cancelEvent(event.id);
                });
                actionsDiv.appendChild(cancelBtn);

                // Complete Button
                const completeBtn = document.createElement("button");
                completeBtn.className = "complete";
                completeBtn.textContent = "Complete";
                completeBtn.addEventListener("click", () => {
                    completeEvent(event.id);
                });
                actionsDiv.appendChild(completeBtn);

                eventDiv.appendChild(actionsDiv);
                calendar.appendChild(eventDiv);
            });
        }
    }

    // ----- Event Handlers for Actions -----
    // Edit an event using simple prompt dialogs (for demonstration).
    function editEvent(id) {
        const events = JSON.parse(localStorage.getItem("events") || "[]");
        const index = events.findIndex(e => e.id === id);
        if (index === -1) return;
        const event = events[index];
        const newTitle = prompt("Edit title:", event.title);
        const newDate = prompt("Edit date (YYYY-MM-DD):", event.date);
        const newTime = prompt("Edit time (HH:MM):", event.time);
        const newDescription = prompt("Edit description:", event.description);
        if (newTitle && newDate && newTime) {
            events[index] = {
                ...event,
                title: newTitle,
                date: newDate,
                time: newTime,
                description: newDescription
            };
            saveEvents(events);
            loadEvents();
        }
    }

    // Cancel (delete) an event.
    function cancelEvent(id) {
        let events = JSON.parse(localStorage.getItem("events") || "[]");
        events = events.filter(e => e.id !== id);
        saveEvents(events);
        loadEvents();
    }

    // Mark an event as complete.
    function completeEvent(id) {
        const events = JSON.parse(localStorage.getItem("events") || "[]");
        const index = events.findIndex(e => e.id === id);
        if (index === -1) return;
        events[index].completed = true;
        saveEvents(events);
        loadEvents();
    }

    // ----- Form Submission Handler -----
    eventForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("eventTitle").value;
        const date = document.getElementById("eventDate").value;
        const time = document.getElementById("eventTime").value;
        const description = document.getElementById("eventDescription").value;

        const newEvent = {
            id: generateId(),
            title,
            date,
            time,
            description,
            completed: false
        };

        const events = JSON.parse(localStorage.getItem("events") || "[]");
        events.push(newEvent);
        saveEvents(events);
        eventForm.reset();
        loadEvents();

        // Optionally sync the new event with Google Calendar.
        syncEventWithGoogleCalendar(newEvent);
    });

    // ----- Theme Toggle -----
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        document.body.classList.toggle("light-theme");
    });

    // Initial load of events.
    loadEvents();
});
