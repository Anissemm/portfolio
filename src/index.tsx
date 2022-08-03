import store, { persistor } from './store'
import { Provider as StoreProvider } from 'react-redux'
import App from './App'
import { PersistGate } from 'redux-persist/integration/react'
import ReactDOM from 'react-dom'
import './index.css'

ReactDOM.render(
    <StoreProvider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </StoreProvider>,
    document.getElementById('root'))