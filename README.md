                                              ![Screenshot 2024-02-15 at 09-38-28 Spendy](https://github.com/ThatFireBoi/spendy/assets/132520554/0ff738ad-cac6-4292-bee5-70b9f64adb50)

# Spendy

Spendy is a budget analyzer that aims to make itself accessible to users of varying financial knowledge, bolstered by a receipt scanning OpenAI GPT and a reward system that incentives repeat use of the web app.

This project was born out of me and my partner’s background in finance. We are currently employed by Banco Popular de Puerto Rico and it is thanks to them that we have partaken in the foundations program at Holberton Coding School. As a result of various meetings and talks, the budget analyzer idea was born due to an interest in bolstering this functionality inside Popular’s own MiBanco system. Due to time constraints, the project currently stands on its own, independent of the bank’s systems but serves as a template of what they would like to implement for their online services refresh.

Regarding Spendy, we have so far implemented a database with Firebase, where the expenses and income for each user are saved, all behind log-in implementation using the user’s Google account. Currently, we are in the process of implementing the receipt scanner by way of a GPT and the API to provide a reward/achievement system. 

Creating and implementing the GPT has been the most challenging, with the reward system in second place. An alternative we are looking at is Google’s OCR system, which can be implemented with Firebase instead of using the GPT, but this would cause us to loose the chatbot part of the implementation. But in the end, in regards to the MVP, we could go with the OCR as a temporary solution and later on work on implementing the OpenAI GPT. This project is also being built on React JS, which has brought it’s own challenges due to having elements of HTML without using actual HTML files, but instead implementing that functionality inside the javascript files themselves.

# Technologies Used

React JS, CSS, Firebase, OpenAI

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
