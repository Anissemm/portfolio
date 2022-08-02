import store from './store'
import { Provider as StoreProvider } from 'react-redux'
import App from './App'
import ReactDOM from 'react-dom'
import './index.css'

ReactDOM.render(
    <StoreProvider store={store}>
        <App />
    </StoreProvider>,
    document.getElementById('root'))