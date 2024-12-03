![Screenshot 2024-02-15 at 09-38-28 Spendy](https://github.com/ThatFireBoi/spendy/assets/132520554/0ff738ad-cac6-4292-bee5-70b9f64adb50)

# Spendy

Spendy is a budget analyzer that aims to make itself accessible to users of varying financial knowledge, bolstered by a chatbot powered by OpenAI and a reward system that incentives repeat use of the web app.

This project was born out of me and my partner’s background in finance. We are currently employed by Banco Popular de Puerto Rico and it is thanks to them that we have partaken in the foundations program at Holberton Coding School. As a result of various meetings and talks, the budget analyzer idea was born due to an interest in bolstering this functionality inside Popular’s own MiBanco system. Due to time constraints, the project currently stands on its own, independent of the bank’s systems but serves as a template of what they would like to implement for their online services refresh.

Regarding Spendy, we have so far implemented a database with Firebase, where the expenses and income for each user are saved, all behind log-in implementation using the user’s Google account. Currently, we are in the process of implementing the receipt scanner by way of a GPT and the API to provide a reward/achievement system. 

Creating and implementing the GPT has been the most challenging, with the reward system in second place. We currently have a ChatBot powered by OpenAI and BotPress that can give you savings and budgeting tips. Regarding the receipt parser, an alternative we are looking at is Google’s OCR system, which can be implemented with Firebase instead of using the GPT, but this would cause us to loose the chatbot part of the implementation. But in the end, in regards to the MVP, we could go with the OCR as a temporary solution and later on work on implementing the OpenAI GPT. This project is also being built on React JS, which has brought it’s own challenges due to having elements of HTML without using actual HTML files, but instead implementing that functionality inside the javascript files themselves.

# Developers

Gabriel Castro- Full Stack engineer on Spendy, delving into learning how to leverage Firebase and React to create the spending analyzer. During my tenure at Holberton I've acquired knowledge in C, Python and JavaScript, among many other things. This has given me the foundation to be able to embark in attempting to develop this web app. Previous to Holberton, I studied Game Design, with a focus on C# developtment and environmental design by way of Blender, Unity and Unreal Engine. Going forward I hope to join a game development team or partake in web development. 

Natalia Rivera- As a Lead Developer at Spendy, I'm currently immersing myself in integrating APIs to build a an engaaging and unique spending analyzer. My experience at Holberton has equipped me with skills in C, Python, and JavaScript, providing me with the necessary groundwork to undertake this project.

# Technologies Used

React JS, CSS, Firebase, OpenAI

# Mockups

![image](https://github.com/ThatFireBoi/spendy/assets/132520554/de7548e0-707d-474f-8a65-c3d46de9089c)
![image](https://github.com/ThatFireBoi/spendy/assets/132520554/d522eef6-e440-4eb9-8772-28b06009f3cc)

# Risks

Technical Risks:

The primary technical risks involve potential issues with image recognition accuracy while scanning receipts, leading to incorrect data input. This could impact the accuracy of expense tracking and budgeting. To mitigate this, constant refinement and testing of the image recognition system are planned. Additionally, users will have the option to manually edit and verify scanned information to ensure accuracy.

Non-Technical Risks:

Non-technical risks include data security breaches that could compromise users' financial information. Safeguards include robust encryption protocols, regular security audits, and compliance with industry standards to ensure data protection. Moreover, user education on best practices for secure account management will be emphasized to prevent phishing or unauthorized access.
Additionally, potential market changes affecting spending habits might impact the app's effectiveness. Continuous user feedback and adapting to evolving financial trends will be essential strategies to counter such risks and ensure the app remains relevant and beneficial to users.

# Future Features

-Adding advising based on the spending

-Spending alerts

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [https://spendy-86fa0.web.app/](https://spendy-86fa0.web.app/) to view it in your browser.

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
