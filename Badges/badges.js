// Define Badge Criteria
const badgeCriteria = {
  'Budget Master': {
    description: 'Achieved by consistently staying within budget for all categories for a specified number of months.',
    monthsRequired: 6 // Specify the number of months required to achieve the badge
  },
  'Scan Wizard': {
    description: 'Awarded for uploading a certain number of receipts within a week or month.',
    receiptsRequiredPerPeriod: 10 // Specify the number of receipts required per week or month?
  },
  'Category Guru': {
    description: 'Spending percentage that adheres to original budget.',
    tightRangePercentage: 80 // Percentage of spending required to achieve the badge
  },
  'Financial Explorer': {
    description: 'Unlocked by exploring and utilizing all features of the app within a defined time frame.',
    featuresExplored: ['budgeting', 'receipt scanning', 'expense tracking'] // Specify features required to explore
  },
  'Streak Keeper': {
    description: 'Achieved by consistently logging expenses for a consecutive number of days.',
    consecutiveDaysRequired: 30 // Number of consecutive days required to achieve the badge
  },
  'Early Bird Bonus': {
    description: 'Achieved by setting monthly budgets and achieving them within the first week of the month.'
    // Add additional criteria
  }
};

// Function to Check if User Achieves Badge
function checkBadgeAchievement(userMetrics) {
  const badgesAchieved = [];
  
  // Check if user meets criteria for each badge
  for (const badge in badgeCriteria) {
    if (badgeCriteria.hasOwnProperty(badge)) {
      const criteria = badgeCriteria[badge];
      
      switch (badge) {
        case 'Budget Master':
          if (userMetrics.monthsStayingWithinBudget >= criteria.monthsRequired) {
            badgesAchieved.push(badge);
          }
          break;
        case 'Scan Wizard':
          if (userMetrics.receiptsUploaded >= criteria.receiptsRequiredPerPeriod) {
            badgesAchieved.push(badge);
          }
          break;
        case 'Category Guru':
          // Percentage of spending required to achieve the badge
          // For demonstration purposes, let's assume user already meets this criteria
          badgesAchieved.push(badge);
          break;
        case 'Financial Explorer':
          // Implement logic to check if all features have been explored
          // For demonstration purposes, let's assume user already meets this criteria
          badgesAchieved.push(badge);
          break;
        case 'Streak Keeper':
          if (userMetrics.consecutiveDaysLoggingExpenses >= criteria.consecutiveDaysRequired) {
            badgesAchieved.push(badge);
          }
          break;
        case 'Early Bird Bonus':
          // Implement logic to check if monthly budgets are achieved within first week
          // For demonstration purposes, let's assume user already meets this criteria
          badgesAchieved.push(badge);
          break;
        // Add cases for other badge criteria
      }
    }
  }

  return badgesAchieved;
}

// userMetrics object to simulate user data
const userMetrics = {
  monthsStayingWithinBudget: 8, // Example: User has stayed within budget for 8 months
  receiptsUploaded: 25, // Example: User has uploaded 25 receipts
  consecutiveDaysLoggingExpenses: 35 // Example: User has logged expenses for 35 consecutive days
};

// Function to Award Badges
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

// Award Badges to Example User
awardBadges(userMetrics);
