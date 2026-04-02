document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("myReviewForm")
    const reviewsGrid = document.querySelector(".reviews-grid")
    const starPicker = document.getElementById("starPicker")
    const stars = starPicker.querySelectorAll("span")
    const STORAGE_KEY = "dark_reviews_v1"
    
    let selectedRating = 0
    
    init()
    
    stars.forEach(star => {
        star.addEventListener("mouseover", () => previewStars(star.dataset.value))
        star.addEventListener("click", () => {
            selectedRating = parseInt(star.dataset.value)
            setActiveStars(selectedRating)
        })
    })
    
    starPicker.addEventListener("mouseleave", () => {
        setActiveStars(selectedRating)
    })
    
    form.addEventListener("submit", e => {
        e.preventDefault()
    
        const name = document.getElementById("myNameInput").value.trim()
        const text = document.getElementById("myTextInput").value.trim()
        const type = document.getElementById("myTypeInput").value
    
        if (!name || !text || !type || !selectedRating) return
    
        const review = {
            id: crypto.randomUUID(),
            name,
            text,
            type,
            rating: selectedRating,
            avatar: Math.floor(Math.random() * 70) + 1
        }
    
        const reviews = getReviews()
        reviews.unshift(review)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
        renderReviews(reviews)
    
        form.reset()
        selectedRating = 0
        setActiveStars(0)
    })
    
    function previewStars(count) {
        stars.forEach(star => {
            star.classList.remove("preview")
            if (star.dataset.value <= count) star.classList.add("preview")
        })
    }
    
    function setActiveStars(count) {
        stars.forEach(star => {
            star.classList.remove("active","preview")
            if (star.dataset.value <= count) star.classList.add("active")
        })
    }
    
    function getReviews() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    }
    
    function renderReviews(reviews) {
        reviewsGrid.innerHTML = ""
        reviews.forEach(review => {
            const card = document.createElement("div")
            card.className = "review-card"
    
            const starsHtml = "★".repeat(review.rating)
    
            card.innerHTML = `
                <div class="review-header">
                    <img src="/public/images/user.jpg">
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <p>${review.type}</p>
                    </div>
                </div>
                <p class="review-text">${review.text}</p>
                <div class="review-stars">${starsHtml}</div>
            `
            reviewsGrid.appendChild(card)
        })
    }
    
    function init() {
        renderReviews(getReviews())
    }
})