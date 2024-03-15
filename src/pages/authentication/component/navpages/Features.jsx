import React from 'react';
import "..navpages/styles.css";

export const Features = () => {
  return (
      <div className="features" id="features">
          <th><span className="fancy">Features</span></th>
          <table>
              <tr>
                  <td>
                      <h3>Easy Tracking</h3>
                      <p>Our app makes expense tracking effortless. With user-friendly interfaces and streamlined workflows, you can easily input, categorize, and analyze your expenses in just a few clicks. Say goodbye to complicated spreadsheets and clunky interfaces, and hello to simplicity and efficiency.</p>
                  </td>
                  <td>
                      <h3>Intuitive Visuals</h3>
                      <p>Experience your financial data in a whole new light with our intuitive visuals. Our app offers a single, sleek graph that displays your income and expenses by category, providing a clear overview of your financial landscape. With just a glance, you can see where your money is going and make informed and fast decisions about your spending.</p>
                  </td>
                  <td>
                      <h3>Achievements</h3>
                      <p>Stay motivated on your financial journey with our achievements feature. Track your progress as you achieve financial milestones, from sticking to your budget to increasing your savings. Our app celebrates your successes and encourages you to keep striving for financial stability and success. With achievable goals and meaningful rewards, you'll feel empowered to take control of your finances and achieve your financial dreams.</p>
                  </td>
              </tr>
          </table>
      </div>
  );
}
