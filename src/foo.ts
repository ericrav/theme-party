interface ProxyObj {
  [key: string]: any | ProxyObj;
}

interface ThemeObject<Theme = ProxyObj> {
  [key: string]: string | ThemeObject<Theme> | ((theme: Theme & ProxyObj) => unknown);
}

function foo<T>(obj: ThemeObject<T>) {}

foo({
  colors: {
    black: '#000',
    text: t => t.colors.black,
    link2: t => t.colors.text,
  }
})
