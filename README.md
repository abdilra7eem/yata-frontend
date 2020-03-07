# YATA-Frontend
YATA-Frontend is the frontend for YATA: Yet Another Todo-List App.

YATA-Frontend is created with React functional components and React hooks. 

This code is provided as is, with no guarantee whatsoever, under LGPL v3.0 license. Please read the attached LICENSE file.

The project is named after [Yatta](https://en.wikipedia.org/wiki/Yatta,_Hebron).

The backend is provided separately at: http://github.com/abdilra7eem/yata-backend

-----
This is still a work in progress. It still needs some features, optimization and UX/UI tweaks.

### It can:
	- communicate with the yata-backend
	- fetch the todo list from the server
	- create and edit todos
	- delete todo item

### Known issues:
- no **clear** visual clues about success and failure *(UX issue)*.
- If data is edited elsewhere (e.g.: with postman), the page needs to be refreshed to see changes.
- Still doesn't support non-latin languages.
- For some reason, setstate does not rerender. Changig the state should rerender the page. This **seems** as a bug in React *(not confirmed)*, and it causes some problems:
	- For example: setTodos(newTodos) in todoEdit and todoDelete functions didn't refresh the todo-list, and kept showing an outdated one. The spread operator was used as a workaround, and it worked.
	- However, The setEditable function still doesn't force refresh, which causes the newTodo text box to show outdated information. Example: You write a new todo with text "My new todo". After submitting, the 'editable' state is cleared, but the box still shows "My new todo". Hit 'enter' again, and you'll get an empty text todo item. A workaround is to check if the todo is empty before submitting.
- The code is messy. It needs to be cleaned up.
- Still needs inline documentation
- Some performance issues
- UI still need work

Handling CORS, managing state and inline todo editing were quite tricky to implement, especially that React nullifies DOM element when they are passed to functions. A workaround was to pass both `event` and `event.target` to the handler function.

-------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
