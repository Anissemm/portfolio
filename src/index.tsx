import store from './store'
import { Provider } from 'react-redux'
import App from './App'
import ReactDOM from 'react-dom'
import './index.css'
import smoothscrollPolyfill from 'smoothscroll-polyfill'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))