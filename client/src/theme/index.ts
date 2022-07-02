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