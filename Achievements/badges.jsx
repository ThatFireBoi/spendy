// Define API key
const apiKey = 'a342746cd9b856abad6ad1cf84c64e0b';

// Function to request GameLayers API
async function makeApiRequest(endpoint, data) {
    const apiUrl = 'https://api.gamelayer.co/api/v0'; //URL to get GameLayers API endpoint
    
    try {
        // Make a POST request to the specified endpoint with the API key in the headers
        const response = await fetch(`${apiUrl}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Return the response data
        return await response.json();
    } catch (error) {
        // Handle any errors
        console.error('Error making API request:', error);
        throw error; // Optionally, rethrow the error to handle it elsewhere
    }
}

// Define Badge Criteria
const badgeCriteria = {
  'Budget Master': {
    id: 'budget-master-badge',
    name: 'Achievements',
    description: 'Achieved by consistently staying within budget for all categories for a specified number of months.',
    tags: ['budget', 'streak'],
    monthsRequired: 6, // Specify the number of months required to achieve the badge
    imgUrl: 'https://images.gamelayer.co/glimages/gltest/badge1.png',
  },
};

// Function to Check if User Achieves Badge
function checkBadgeAchievement(userMetrics) {
  const badgesAchieved = [];
  
  // Check if user meets criteria for each badge
  for (const badge in badgeCriteria) {
    if (badgeCriteria.hasOwnProperty(badge)) {
      const criteria = badgeCriteria[badge]; // Get badge criteria
      const userMonthsInBudget = userMetrics.monthsInBudget || 0; // Get user's months in budget
    }
  }

  return badgesAchieved;
}

// Award Badges to Example User
function awardBadges(userMetrics) {
  const badgesAchieved = checkBadgeAchievement(userMetrics);
  if (badgesAchieved.length > 0) {
    console.log('Congratulations! You\'ve earned the following badges:');
    badgesAchieved.forEach(badge => {
      console.log(`- ${badge}: ${badgeCriteria[badge].description}`);
      // Code to display badges in Spendy interface or store badge information
    });
  } else {
    console.log('Keep up the good work!');
  }
}

// Example userMetrics object
const userMetrics = {
  // Define user metrics...
};

// Call function to award badges
awardBadges(userMetrics);
