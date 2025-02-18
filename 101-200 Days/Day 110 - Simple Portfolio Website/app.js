document.addEventListener('DOMContentLoaded', () => {
    // Sample Data
    const projects = [
        {
            title: 'Task Manager',
            description: 'A to-do list application with CRUD operations.',
            image: 'https://via.placeholder.com/250x150',
            link: '#'
        },
        {
            title: 'Weather App',
            description: 'Fetch and display weather data using an API.',
            image: 'https://via.placeholder.com/250x150',
            link: '#'
        },
        // Add more projects as needed
    ];

    const skills = ['JavaScript', 'HTML', 'CSS', 'Node.js', 'Express', 'React', 'MongoDB'];

    const projectList = document.getElementById('project-list');
    const skillsList = document.getElementById('skills-list');
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');

    // Render Projects
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" class="btn">View Project</a>
        `;
        projectList.appendChild(card);
    });

    // Render Skills
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
    });

    // Handle Contact Form Submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // For demonstration, simply show success message
        contactSuccess.classList.remove('hidden');
        contactForm.reset();
    });
});
