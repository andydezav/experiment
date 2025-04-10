document.addEventListener("DOMContentLoaded", () => {
  let currentType = '';
  let selectedDuration = '';
  let selectedGenre = '';
  let selectedService = '';

  // Show the next section
  function showNextSection(sectionId) {
    hideAllSections();
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.add('show');
    } else {
      console.error(`Element with ID '${sectionId}' not found.`);
    }
  }

  // Hide all content sections
  function hideAllSections() {
    const sections = document.querySelectorAll('.content-container');
    sections.forEach(section => section.classList.remove('show'));
  }

  // Handle the selection of movie or series type
  window.handleTypeSelection = function(type) {
    currentType = type;
    showNextSection(currentType === 'movie' ? 'movieQuestions' : 'seriesQuestions');
  };

  // Handle the selection of movie or series duration
  window.handleDurationSelection = function(type, duration) {
    selectedDuration = duration;
    showNextSection(type === 'movie' ? 'movieGenre' : 'seriesGenre');
  };

  // Handle the selection of genre
  window.chooseGenre = function(type, genre) {
    selectedGenre = genre;
    showNextSection('streamingService');
  };

  // Handle the selection of streaming service
  window.chooseStreamingService = function(service) {
    selectedService = service;
    showNextSection('loading');
    setTimeout(() => {
      showRecommendation();
    }, 2000); // Simulate loading time
  };

  // Show the final recommendation based on selections
  function showRecommendation() {
    const recommendations = {
      movie: {
        Drama: ['The Shawshank Redemption', 'The Godfather'],
        Comedy: ['Superbad', 'The Hangover'],
        Action: ['Mad Max: Fury Road', 'John Wick'],
        Horror: ['The Conjuring', 'Get Out'],
      },
      series: {
        Drama: ['Breaking Bad', 'The Crown'],
        Comedy: ['The Office', 'Parks and Recreation'],
        Action: ['The Mandalorian', 'Stranger Things'],
        Horror: ['The Haunting of Hill House', 'American Horror Story'],
      },
    };

    const recs = recommendations[currentType][selectedGenre] || ['No match found'];
    const pick = recs[Math.floor(Math.random() * recs.length)]; // Randomly pick a recommendation

    const resultElement = document.getElementById(`${currentType}ResultText`);
    if (resultElement) {
      resultElement.innerText = pick; // Display only the name of the movie/show
    } else {
      console.error(`Element with ID '${currentType}ResultText' not found.`);
    }

    const resultContainer = document.getElementById(`${currentType}Result`);
    if (resultContainer) {
      resultContainer.classList.add('show');
    } else {
      console.error(`Element with ID '${currentType}Result' not found.`);
    }
  }
});
