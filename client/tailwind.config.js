module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      nino: ['Nino'],
      comfortaa: ['Comfortaa'],
      noto: ['Noto Sans Georgian', 'Noto Sans'],
    },
    extend: {
      fontSize: {
        md: '16px',
      },
      spacing: {
        3.5: '12px',
        15: '56px',
        81: '325px',
        160: '40rem',
        100: '357px',
      },
      colors: {
        green: {
          DEFAULT: '#186d47',
        },
        red: {
          DEFAULT: '#d43e4d',
        },
        'dark-purple': '#081A51',
        'light-white': 'rgba(255,255,255,0.17)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({addComponents}) {
      addComponents({
        '.container': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          '@screen sm': {maxWidth: '640px'},
          '@screen md': {maxWidth: '768px'},
          '@screen lg': {maxWidth: '975px'},
          '@screen xl': {maxWidth: '1080px'},
          '@screen 2xl': {maxWidth: '1080px'},
        },
      })
    },
  ],
}
