// Function to get a specific achievement by ID
async function getAchievement(id) {
  try {
      const response = await fetch(`http://api.example.com/achievements/${id}`);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const achievement = await response.json();
      // Handle the achievement data here
      console.log(achievement);
  } catch (error) {
      console.error(`Error fetching achievement: ${error}`);
  }
}

// Function to get all achievements
async function getAchievements() {
  try {
      const response = await fetch('http://api.example.com/achievements');
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const achievements = await response.json();
      // Handle the achievements data here
      console.log(achievements);
  } catch (error) {
      console.error(`Error fetching achievements: ${error}`);
  }
}

// Usage
getAchievement(1);
getAchievements();
