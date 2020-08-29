const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('@tailwindcss/ui/colors')
//const mdx = require('@mdx-js/mdx')

var colorPalettes = {
  red: {
    100: '#fff5f5',
    200: '#fed7d7',
    300: '#feb2b2',
    400: '#fc8181',
    500: '#f56565',
    600: '#e53e3e',
    700: '#c53030',
    800: '#9b2c2c',
    900: '#742a2a',
  },
  pink: {
    100: "#FFFDFE",
    200: "#FFF9FC",
    300: "#FFF6FA",
    400: "#FFEFF6",
    500: "#FFE8F2",
    600: "#E6D1DA",
    700: "#998B91",
    800: "#73686D",
    900: "#4D4649",
  },
  forest: {
    100: "#E8EAE9",
    200: "#C6CBC8",
    300: "#A4ACA7",
    400: "#606E66",
    500: "#1C3024",
    600: "#192B20",
    700: "#111D16",
    800: "#0D1610",
    900: "#080E0B",
  },
  deep: {
    100: "#E7EAEB",
    200: "#C4CBCE",
    300: "#A1ABB0",
    400: "#5A6D74",
    500: "#132E39",
    600: "#112933",
    700: "#0B1C22",
    800: "#09151A",
    900: "#060E11",
  },
  dark: {
    100: "#E8E8E8",
    200: "#C5C5C5",
    300: "#A3A3A3",
    400: "#5D5D5D",
    500: "#181818",
    600: "#161616",
    700: "#0E0E0E",
    800: "#0B0B0B",
    900: "#070707",
  },
}

module.exports = {
  future: {
    removeDeprecatedGapUtilities: false,
  },
  purge: {
    mode: 'all',
    content: ['./src/**/*.{js,mdx}', './next.config.js'],
    // options: {
    //   extractors: [
    //     {
    //       extensions: ['mdx'],
    //       extractor: (content) => {
    //         content = mdx.sync(content)

    //         // Capture as liberally as possible, including things like `h-(screen-1.5)`
    //         const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

    //         // Capture classes within other delimiters like .block(class="w-1/2") in Pug
    //         const innerMatches =
    //           content.match(/[^<>"'`\s.(){}[\]#=%]*[^<>"'`\s.(){}[\]#=%:]/g) || []

    //         return broadMatches.concat(innerMatches)
    //       },
    //     },
    //   ],
    // },
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        theme: colorPalettes.red,
        code: {
          green: '#b5f4a5',
          yellow: '#ffe484',
          purple: '#d9a9ff',
          red: '#ff8383',
          blue: '#93ddfd',
          white: '#fff',
        },
      },
      opacity: {
        "90": ".9",
      },
      width: {
        "half-screen": "50vw",
      },
      height: {
        "half-screen": "40vw",
      },
      typography: (theme) => ({
        default: {
          css: {
            color: theme('colors.gray.700'),
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
            },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.400'),
            },
            code: {
              color: theme('colors.gray.900'),
            },
            a: {
              color: theme('colors.gray.900'),
            },
            pre: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
            },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
          },
        },
      }),
    },
  },
  variants: {
    opacity: ["responsive", "hover", "focus", "group-hover"],
    textColor: ["responsive", "hover", "focus", "group-hover"],
  },
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/typography'),
    function ({ addBase, addComponents, theme }) {
      addBase([
        {
          '@font-face': {
            fontFamily: 'Inter var',
            fontWeight: '100 900',
            fontStyle: 'normal',
            fontNamedInstance: 'Regular',
            fontDisplay: 'swap',
            src: 'url("/fonts/Inter-roman.var-latin.woff2?3.13") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter var',
            fontWeight: '100 900',
            fontStyle: 'italic',
            fontNamedInstance: 'Italic',
            fontDisplay: 'swap',
            src: 'url("/fonts/Inter-italic.var-latin.woff2?3.13") format("woff2")',
          },
        },
      ])
    },
  ],
}
