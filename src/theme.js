export const theme = {
  colors: {
    black: '#000',
    white: '#fff',
    text: '#2a2a2a',
    bgBasic: '#d4d4d4',
    bgComponent: '#f5eece',
    primary: '#3f51b5',
    secondary: '#05a',
    accent: '#303f9f',
    muted: 'grey',

    //     muted: '#f6f6f6',
  },
  space: [0, 4, 8, 12, 16, 24, 32, 64, 128, 256, 512],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: {
    xs: '12px',
    s: '18px',
    m: '24px',
    l: '32px',
    xl: '64px',
  },
  sizes: [0, 4, 8, 12, 16, 20, 24, 32, 64, 128, 256, 512],
  fontWeights: {
    normal: 400,
    button: 500,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    button: 1.33,
    heading: 1.125,
  },
  borders: {
    zero: '0',
    none: 'none',
    normal: '1px solid',
    borderWidth: {
      thick: 'thick',
      '1em': '1em',
    },
  },
  radii: {
    none: '0',
    searchForm: '3px',
    normal: '2px',
    round: '50%',
  },
  shadows: {
    basic:
      '0px 1px 1px rgba(0, 0, 0, 0.12), 0px 4px 4px rgba(0, 0, 0, 0.06), 1px 4px 6px rgba(0, 0, 0, 0.16);',
    button:
      '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
    appBarr:
      '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  },
  zIndices: {
    appBar: '1110',
  },
};
