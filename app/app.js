/* eslint-disable import/no-unresolved, import/no-duplicates, import/extensions, import/no-absolute-path */

/*
|--------------------------------------------------------------------------
| app.js
|--------------------------------------------------------------------------
|
| This is the entry file for the application, only setup and boilerplate
| code.
|
*/

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import 'sanitize.css/sanitize.css';
import 'file?name=[name].[ext]!./favicon.ico';
import '!file?name=[name].[ext]!./manifest.json';
import 'file?name=[name].[ext]!./.htaccess'; // eslint-disable-line
import App from './containers/App';
import LanguageProvider from './containers/LanguageProvider';
import configureStore from './store';
import createRoutes from './routes';
import { selectLocationState } from './containers/App/selectors';
import { translationMessages } from './i18n';

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
|
| Set initial state
|
*/

const initialState = {};

/*
|--------------------------------------------------------------------------
| Create redux store with history
|--------------------------------------------------------------------------
|
| Create redux store with history
| this uses the singleton browserHistory provided by react-router
| Optionally, this could be changed to leverage a created history
| e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
|
*/

const store = configureStore(initialState, browserHistory);

/*
|--------------------------------------------------------------------------
| Sync history abnd store
|--------------------------------------------------------------------------
|
| Sync history and store, as the react-router-redux reducer
| is under the non-default key ("routing"), selectLocationState
| must be provided for resolving how to retrieve the "route" in the state
|
*/

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState()
});

/*
|--------------------------------------------------------------------------
| Init Router
|--------------------------------------------------------------------------
|
| Set up the router, wrapping all Routes in the App component
|
*/

const rootRoute = {
    component: App,
    childRoutes: createRoutes(store)
};

/*
|--------------------------------------------------------------------------
| Init Render
|--------------------------------------------------------------------------
|
| Set render. useScroll is used to scroll to the top when going to a new
| page, imitating default browser bevior.
|
*/

const render = (messages) => {
    ReactDOM.render(
        <Provider store={store}>
            <LanguageProvider messages={messages}>
                <Router
                    history={history}
                    routes={rootRoute}
                    render={applyRouterMiddleware(useScroll())}
                />
            </LanguageProvider>
        </Provider>,
        document.getElementById('app')
    );
};

/*
|--------------------------------------------------------------------------
| Hot Reload
|--------------------------------------------------------------------------
|
| Hot reloadable translation json files. Modules.hot.accept does not accept
| dynamic dependencies, have to be constants at compile-time.
|
*/

if (module.hot) {
    module.hot.accept('./i18n', () => {
        render(translationMessages);
    });
}

/*
|--------------------------------------------------------------------------
| Init chunked polyfill
|--------------------------------------------------------------------------
|
| Chunked polyfill for browsers without Intl support
|
*/

if (!window.Intl) {
    (new Promise((resolve) => {
        resolve(System.import('intl'));
    }))
        .then(() => Promise.all([
            System.import('intl/locale-data/jsonp/en.js'),
            System.import('intl/locale-data/jsonp/de.js')
        ]))
        .then(() => render(translationMessages))
        .catch((err) => {
            throw err;
        });
} else {
    render(translationMessages);
}

/*
|--------------------------------------------------------------------------
| Init Offline-Plugin
|--------------------------------------------------------------------------
|
| Install ServiceWorker and AppCache in the end since
| it's not most important operation and if main code fails,
| we do not want it installed
|
*/

if (process.env.NODE_ENV === 'production') {
    require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
