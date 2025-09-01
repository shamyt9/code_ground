// Function to apply syntax highlighting
// Search functionality
document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    filterCards();
});

// Filter functionality
document
    .getElementById('chapter-filter')
    .addEventListener('change', filterCards);
document
    .getElementById('language-filter')
    .addEventListener('change', filterCards);
document.getElementById('date-picker').addEventListener('change', filterCards);

function filterCards() {
    const searchTerm = document
        .getElementById('search-input')
        .value.toLowerCase();
    const selectedChapter = document.getElementById('chapter-filter').value;
    const selectedLanguage = document.getElementById('language-filter').value;
    const selectedDate = document.getElementById('date-picker').value;

    const codeCards = document.querySelectorAll('.code-card');

    codeCards.forEach((card) => {
        const cardChapter = card.getAttribute('data-chapter');
        const cardLanguage = card.getAttribute('data-language');
        const cardDate = card.getAttribute('data-date');
        const codeText = card.querySelector('code').textContent.toLowerCase();
        const titleText = card.querySelector('h3').textContent.toLowerCase();

        const chapterMatch =
            selectedChapter === 'all' || cardChapter === selectedChapter;
        const languageMatch =
            selectedLanguage === 'all' || cardLanguage === selectedLanguage;
        const dateMatch = !selectedDate || cardDate === selectedDate;
        const searchMatch =
            codeText.includes(searchTerm) || titleText.includes(searchTerm);

        if (chapterMatch && languageMatch && dateMatch && searchMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Copy button functionality
document.addEventListener('click', function (e) {
    if (
        e.target.classList.contains('copy-btn') ||
        e.target.closest('.copy-btn')
    ) {
        const button = e.target.classList.contains('copy-btn')
            ? e.target
            : e.target.closest('.copy-btn');
        const code = button
            .closest('.code-card')
            .querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        });
    }
});
// Mobile filter toggle
document
    .getElementById('mobile-filter-toggle')
    .addEventListener('click', function () {
        const filters = document.getElementById('filter-controls');
        filters.classList.toggle('active');

        if (filters.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-times"></i> Hide Filters';
        } else {
            this.innerHTML = '<i class="fas fa-filter"></i> Show Filters';
        }
    });

// Initialize the page
window.addEventListener('DOMContentLoaded', () => {
    filterCards();
});
