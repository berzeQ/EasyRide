
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = ({ Component, pageProps }) =>{
  return (
    <ChakraProvider>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <Component {...pageProps} />
    </PersistGate>
</Provider>
</ChakraProvider>
  
  )

}

export default App;
