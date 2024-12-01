type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export const Typography = {
  h1: {
    fontSize: 48,
    fontWeight: 700 as FontWeight,
    letterSpacing: -0.5,
    lineHeight: 56
  },
  h2: {
    fontSize: 28,
    fontWeight: 500 as FontWeight,
  },
  h3: {
    fontSize: 24,
    fontWeight: 500 as FontWeight,
  },
  button: {
    fontSize: 16,
    fontWeight: 700 as FontWeight,
  },
  body: {
    fontSize: 16,
    fontWeight: 400 as FontWeight,
  }

};
