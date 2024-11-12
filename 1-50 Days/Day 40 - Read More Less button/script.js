function readMore() {
    const dots = document.getElementById("dots");
    const moreText = document.getElementById("more");
    const btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read More";
        moreText.style.opacity = "0"; // Start with zero opacity
        setTimeout(() => {
            moreText.style.display = "none"; // Hide after fade-out
        }, 300); // Duration should match the transition time in CSS
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read Less";
        moreText.style.display = "inline";
        setTimeout(() => {
            moreText.style.opacity = "1"; // Fade in
        }, 0); // Delay to trigger transition
    }
}
