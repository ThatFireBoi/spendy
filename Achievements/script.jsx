// Function to fetch badge data from the backend
async function fetchBudgetMasterData() {
  try {
    const response = await fetch('https://api.gamelayer.co/api/v0/achievements/{id}');
    const data = await response.json();
    return data.badges; // Assuming badge data is returned as an array
  } catch (error) {
    console.error('Error fetching badges:', error);
    return [];
  }
}

// Function to display badges in the UI
async function displayBudgetMasterData() {
  const badgeContainer = document.getElementById('badgeContainer');
  const badges = await fetchBudgetMasterData();
  
  // Clear existing badges
  badgeContainer.innerHTML = '';

  // Add badges to the UI
  badges.forEach(badge => {
    const badgeElement = document.createElement('div');
    badgeElement.classList.add('badge');
    badgeElement.textContent = badge.name; // Assuming each badge has a 'name' property
    badgeContainer.appendChild(badgeElement);
  });
}

// Initial call to display badges when the page loads
displayBadges();
