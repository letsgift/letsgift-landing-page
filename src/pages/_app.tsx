import '@fontsource/poppins'
import { ChakraBaseProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import theme from '../styles/theme'
import 'swiper/css';

import { SectionsContextProvider } from '../context/Sections';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraBaseProvider resetCSS theme={theme}>
      <SectionsContextProvider>
        <Component {...pageProps} />
      </SectionsContextProvider>
    </ChakraBaseProvider>
  )
}
