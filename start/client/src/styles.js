import { injectGlobal } from 'react-emotion';

export const unit = 8;
export const colors = {
  primary: '#220a82',
  secondary: '#14cbc4',
  accent: '#e535ab',
  background: '#f7f8fa',
  grey: '#d8d9e0',
  text: '#343c5a',
  textSecondary: '#747790'
};

export default () => injectGlobal({
  [['html', 'body']]: {
    height: '100%',
  },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "'Source Sans Pro', sans-serif",
    backgroundColor: colors.background,
    color: colors.text,
  },
  '#root': {
    display: 'block'
  },
  '*': {
    boxSizing: 'border-box',
  },
  [['h1', 'h2', 'h3', 'h4', 'h5', 'h6']]: {
    margin: 0,
    fontWeight: 600,
  },
  h1: {
    fontSize: 48,
    lineHeight: 1,
  },
  h2: {
    fontSize: 40,
  },
  h3: {
    fontSize: 36,
  },
  h5: {
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  ".pagination": {
    display: "inline-block",
    padding: "0 15px 0 15px"
  },
  ".pagination li": {
    display: "inline-block"
  },
  ".pagination a": {
    color: "#272727",
    cursor: "pointer",
    position: "relative",
    float: "left",
    padding: "6px 12px",
    marginLeft: "-1px",
    lineHeight: 1.42857143,
    textDecoration: "none",
    outline: "unset"
  },
  ".pagination .disabled a": {
    cursor: "none"
  },
  ".active a": {
    background: "#fff",
    borderBottom: "3px solid #272727"
  },
  ".disabled a": {
    color: "#bfbfbf",
    outline: "none"
  },
  ".pagination a:hover": {
    fontSize: 17,
    fontWeight: 700
  },
  ".items-per-page": {
    width: "25%"
  },
  ".product-layout": {
    padding: 0
  },
  "@media(max-width:767px)": {
    ".form-button": {
      margin: 0,
      minWidth: 100,
    }
  },
  "@media(min-width:768px)": {
    ".form-button": {
      margin: "0 15px",
      minWidth: 160,
    },
    ".contentWrapper": {
      gridTemplateColumns: "repeat(2, 1fr)"
    },
    ".items-per-page": {
      width: "14%"
    },
    ".product-layout": {
      padding: "40px"
    }
  },
  "@media(min-width:1024px)": {
    ".contentWrapper": {
      gridTemplateColumns: "repeat(3, 1fr)"
    },
    ".items-per-page": {
      width: "10%"
    }
  },
  "@media(min-width:1280px)": {
    ".contentWrapper": {
      gridTemplateColumns: "repeat(4, 1fr)"
    },
    ".items-per-page": {
      width: "8%"
    }
  }
});
