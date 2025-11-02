// Available cast member images
const castMembers = [
    "src/assets/imgs/Section 2/Zöe Kravitz.webp",
    "src/assets/imgs/Section 2/Robert Pattison.webp",
    "src/assets/imgs/Section 2/Paul Dano.jpg",
    "src/assets/imgs/Section 2/Colin Farrel.jpg",
    "src/assets/imgs/Section 2/Jeffrey Wright.webp",
    "src/assets/imgs/Section 2/John Turturro.jpg"
];

// Actor names and their characters
const castInfo = [
    { actor: "Zöe Kravitz", character: "Selina Kyle / Catwoman" },
    { actor: "Robert Pattinson", character: "Bruce Wayne / Batman" },
    { actor: "Paul Dano", character: "Edward Nashton / The Riddler" },
    { actor: "Colin Farrell", character: "Oswald Cobblepot / The Penguin" },
    { actor: "Jeffrey Wright", character: "James Gordon" },
    { actor: "John Turturro", character: "Carmine Falcone" }
];

// Cast member sets - each set contains [left, center, right] indices
const castSets = [
    [0, 1, 2], // First 3 actors: Zoe, Robert, Paul
    [3, 4, 5]  // Second 3 actors: Colin, Jeffrey, John
];

let currentSetIndex = 0;
let isInitialLoad = true;
let isAnimating = false;
let slideDirection = 'next'; // 'next' or 'prev'

function updateCardImages(animate = true) {
    const leftCardElement = document.querySelector('.card.secundario:nth-of-type(1)');
    const centerCardElement = document.querySelector('.card.destaque');
    const rightCardElement = document.querySelector('.card.secundario:nth-of-type(3)');
    
    const leftCard = leftCardElement.querySelector('img');
    const centerCard = centerCardElement.querySelector('img');
    const rightCard = rightCardElement.querySelector('img');
    
    const leftCardInfo = leftCardElement.querySelector('.card-info');
    const centerCardInfo = centerCardElement.querySelector('.card-info');
    const rightCardInfo = rightCardElement.querySelector('.card-info');
    
    const currentSet = castSets[currentSetIndex];
    const leftImg = castMembers[currentSet[0]];
    const centerImg = castMembers[currentSet[1]];
    const rightImg = castMembers[currentSet[2]];
    
    const leftInfo = castInfo[currentSet[0]];
    const centerInfo = castInfo[currentSet[1]];
    const rightInfo = castInfo[currentSet[2]];
    
    if (animate && !isInitialLoad) {
        isAnimating = true;
        
        // Disable buttons during animation
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        
        // Slide out current cards to the left
        leftCardElement.classList.add('switching-out');
        centerCardElement.classList.add('switching-out');
        rightCardElement.classList.add('switching-out');
        
        // Wait for slide out, then update images and slide in from right
        setTimeout(() => {
            // Update image sources
            leftCard.src = leftImg;
            leftCard.alt = leftImg.split('/').pop().split('.')[0];
            
            centerCard.src = centerImg;
            centerCard.alt = centerImg.split('/').pop().split('.')[0];
            
            rightCard.src = rightImg;
            rightCard.alt = rightImg.split('/').pop().split('.')[0];
            
            // Update actor and character names
            if (leftCardInfo) {
                leftCardInfo.querySelector('.actor-name').textContent = leftInfo.actor;
                leftCardInfo.querySelector('.character-name').textContent = leftInfo.character;
            }
            if (centerCardInfo) {
                centerCardInfo.querySelector('.actor-name').textContent = centerInfo.actor;
                centerCardInfo.querySelector('.character-name').textContent = centerInfo.character;
            }
            if (rightCardInfo) {
                rightCardInfo.querySelector('.actor-name').textContent = rightInfo.actor;
                rightCardInfo.querySelector('.character-name').textContent = rightInfo.character;
            }
            
            // Update CSS background images for the blur effect
            leftCardElement.style.setProperty('--bg-image-left', `url(${leftImg})`);
            centerCardElement.style.setProperty('--bg-image-center', `url(${centerImg})`);
            rightCardElement.style.setProperty('--bg-image-right', `url(${rightImg})`);
            
            // Remove slide out class and add slide in class
            leftCardElement.classList.remove('switching-out');
            centerCardElement.classList.remove('switching-out');
            rightCardElement.classList.remove('switching-out');
            
            // Start sliding in from the right
            leftCardElement.classList.add('switching-in');
            centerCardElement.classList.add('switching-in');
            rightCardElement.classList.add('switching-in');
            
            // Force reflow to trigger animation
            void leftCardElement.offsetWidth;
            
            // Add active class to slide into position
            setTimeout(() => {
                leftCardElement.classList.add('active');
                centerCardElement.classList.add('active');
                rightCardElement.classList.add('active');
                
                // Clean up classes after animation
                setTimeout(() => {
                    leftCardElement.classList.remove('switching-in', 'active');
                    centerCardElement.classList.remove('switching-in', 'active');
                    rightCardElement.classList.remove('switching-in', 'active');
                    
                    // Re-enable buttons after animation completes
                    isAnimating = false;
                    if (prevBtn) prevBtn.disabled = false;
                    if (nextBtn) nextBtn.disabled = false;
                }, 350); // Wait for slide in animation to complete
            }, 30);
        }, 350); // Wait for slide out to complete (0.35s)
    } else {
        // Update images immediately without animation (for initial load)
        leftCard.src = leftImg;
        leftCard.alt = leftImg.split('/').pop().split('.')[0];
        
        centerCard.src = centerImg;
        centerCard.alt = centerImg.split('/').pop().split('.')[0];
        
        rightCard.src = rightImg;
        rightCard.alt = rightImg.split('/').pop().split('.')[0];
        
        // Update actor and character names
        if (leftCardInfo) {
            leftCardInfo.querySelector('.actor-name').textContent = leftInfo.actor;
            leftCardInfo.querySelector('.character-name').textContent = leftInfo.character;
        }
        if (centerCardInfo) {
            centerCardInfo.querySelector('.actor-name').textContent = centerInfo.actor;
            centerCardInfo.querySelector('.character-name').textContent = centerInfo.character;
        }
        if (rightCardInfo) {
            rightCardInfo.querySelector('.actor-name').textContent = rightInfo.actor;
            rightCardInfo.querySelector('.character-name').textContent = rightInfo.character;
        }
        
        // Update CSS background images for the blur effect
        leftCardElement.style.setProperty('--bg-image-left', `url(${leftImg})`);
        centerCardElement.style.setProperty('--bg-image-center', `url(${centerImg})`);
        rightCardElement.style.setProperty('--bg-image-right', `url(${rightImg})`);
        
        isInitialLoad = false;
    }
}

function nextSet() {
    if (isAnimating) return; // Prevent clicking during animation
    slideDirection = 'next';
    // Move to next set
    currentSetIndex = (currentSetIndex + 1) % castSets.length;
    updateCardImages();
}

function prevSet() {
    if (isAnimating) return; // Prevent clicking during animation
    slideDirection = 'prev';
    // Move to previous set
    currentSetIndex = (currentSetIndex - 1 + castSets.length) % castSets.length;
    updateCardImages();
}

// Initialize buttons
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSet);
        nextBtn.addEventListener('click', nextSet);
    }
    
    // Initialize with first set (no animation on load)
    updateCardImages(false);
});

