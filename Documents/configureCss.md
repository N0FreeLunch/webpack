## CSS 세팅하기

- `src` 폴더 안에 `css`라는 폴더를 만들자.
- `src/css/page.css`라는 css 파일을 만들도록 하자.

```css
body {
  background-color: lightgrey;
}
```

### 기본적인 CSS 실행방식

- 기본적으로 CSS는 HTML 안에 `style` 태그 내에 정의를 하는 방법과 외부의 css 파일을 `link` 태그에 `href` 속성으로 지정하여 실행할 수 있다.
- 브라우저가 HTML 파일이 실행되면서 `style` 태그의 CSS 코드를 실행하거나, HTML 파일을 실행하면서 `link` 태그에 지정된 CSS 파일에 접근을 하여 파일 내의 코드를 실행하는 방식으로 실행을 한다.
- CSS는 태그의 속성으로 추가해 줄 수도 있는데, CSS 파일에서 정의하는 것에 비해 제한적인 표현만 사용할 수 있다. 자바스크립트에서 CSS를 사용할 때도 태그의 속성으로 CSS를 정의하는 방법을 쓰거나 CSS를 불러오는 `link` 태그를 자바스크립트로 만들거나 style 태그를 자바스크립트로 만들어서 HTML 태그에 추가하는 방식으로 CSS를 추가하는 방법을 사용할 수 있다. 하지만 자바스크립트로 불러오는 방식은 자바스크립트 코드가 지저분해지는 경향이 있으므로 보통 사용하지는 않는다.

### 웹팩에서 CSS의 사용방식

- 웹팩은 기본적으로 자바스크립트 파일을 번들링 및 자바스크립트 코드를 변환한다. CSS는 웹팩의 기본적인 설정으로 번들링 및 코드의 변환이 되지 않는다. 하지만, [css-loader](https://github.com/webpack-contrib/css-loader)라는 라이브러리를 웹팩에 추가하면 자바스크립트를 빌드할 때 CSS를 자바스크립트에 포함해서 함께 빌드할 수 있다.
- 만약 CSS 파일을 자바스크립트에 포함하지 않고 번들링 및 코드 변환을 하고 싶은 경우 [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)라는 라이브러리를 사용해야 한다.

### 자바스크립트 안에 css 불러오기

- 우선은 `css-loader`라는 라이브러리가 웹팩에 세팅이 되어 있다고 가정한다.
- `src/js/index.js` 파일 안에 `import '../css/page.css';`라는 코드를 넣고 dev 서버를 실행하면 배경색이 `lightgrey`으로 세팅이 된 페이지를 확인할 수 있다.
- `import 'CSS파일의 경로.css'`의 코드를 자바스크립트에 로드를 하면, 웹 페이지가 로드될 때 웹팩으로 만들어진 자바스크립트 파일이 로드되면서 자바스크립트 내의 CSS를 로드하는 코드를 실행한다.
