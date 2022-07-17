// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ 
    config,
    fonts: {
        body: 'Poppins, sans-serif',
        heading: 'Lato',
        roboto: 'Roboto, sans-serif',
        lato: 'Lato, sans-serif',
        overpass: 'Overpass, sans-serif',
        poppins: 'Poppins, sans-serif',
        ubuntu: 'Ubuntu, sans-serif',
    },
    components: {
        Button: {
            variants: {
                'delete': () => ({
                    rounded: 'lg',
                    bg: 'red.500',
                    color: 'white',
                    _hover: {
                        bottom: '2px',
                    },
                    _active: {
                        bg: 'red.400'
                    }
                })
            }
        }
    }
})

export default theme