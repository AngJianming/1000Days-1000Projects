const reviews = [
    {
        id: 1,
        name: "Neamat",
        job: "penetration tester",
        img: "img/fr-03.jpg",
        text: "Hello I am here, to give you a review to YOUr course, very good content!",
    },
    {
        id: 2,
        name: "jadi",
        job: "web developer",
        img: "img/ui-divya.jpg",
        text: "this is jadi a web developer and ceh certified and working hard every day to make a deffirace!"
    }
    ,
    {
        id: 4,
        name: "JM",
        job: "Best seller course creator",
        img: "img/ui-zac.jpg",
        text: "here is jm commong from the organization so we could help you improve your english!"
    },
    {
        id: 2,
        name: "jadi",
        job: "web developer",
        img: "img/fr-06.jpg",
        text: "this is jadi a web developer and ceh certified and working hard every day to make a deffirace!"
    }
];

const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentItem = 0;

window.addEventListener("DOMContentLoaded", function () {
    // console.log("shake and bake");

    // const item = reviews[currentItem];
    // img.src = item.img;
    // author.textContent = item.name;
    // job.textContent = item.job;
    // info.textContent = item.text;
    showPerson(currentItem);

});

function showPerson(person) {
    const item = reviews[currentItem];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
}

//show next person

nextBtn.addEventListener("click", function () {
    currentItem++;

    if (currentItem > reviews.length - 1) {
        currentItem = 0;
    }


    showPerson(currentItem);
});

prevBtn.addEventListener("click", function () {
    currentItem--;
    if (currentItem < 0) {
        currentItem = reviews.length - 1;
    }
    showPerson(currentItem);
})