## CSS 파일을 별도로 빌드하기

### CSS 파일을 별도로 빌드하는 이유

- 웹팩에서 CSS를 번들링하기 위해서는 [css-loader](https://github.com/webpack-contrib/css-loader)라는 라이브러리를 설치하고 설정해 주어야 한다. 하지만 이 방법은 CSS를 자바스크립트에 추가하는 방법을 사용한다.
- CSS를 자바스크립트로 빌드하는 것은 몇 가지 문제가 있는데 브라우저는 HTML의 태그를 순차적으로 읽는다. 브라우저에서 자바스크립트를 사용하는 여러 이유 중 하나는 브라우저에 로딩된 돔(DOM : 태그를 자바스크립트로 컨트롤 할 수 있는 기능)을 컨트롤 하기 위해서이다. 돔을 컨트롤하기 위해서는 돔을 컨트롤 하는 자바스크립트 코드가 실행되기 전에 돔이 미리 브라우저에 로드 되어야 한다. 하지만 웹팩에서 주입되는 자바스크립트는 특별한 설정을 하지 않은 경우 `head` 태그에 위치한다. 자바스크립트로 다루려는 태그는 `body`에 있는 사용자에게 표시되는 태그인데, `head`에서 자바스크립트가 로드가 되면 브라우저에 생성된 태그가 없기 때문에 자바스크립트로 태그를 컨트롤할 수 없다. 따라서 웹팩은 자바스크립트를 주입할 때 `defer`라는 속성을 `script` 태그에 준다. `<script defer src='대상 자바스크립트 파일의 주소'></script>` `defer` 속성은 `script` 태그의 자바스크립트 코드를 로드한 이후, 코드의 실행 시점을 브라우저의 태그가 다 로딩된 이후(구문 분석이 완료된 이후)에 실행하도록 한다. 따라서 `head` 태그에 `sciprt` 태그가 있어도 브라우저가 `html`의 구문을 다 읽고 나서 `script` 태그의 자바스크립트 코드가 실행이 되므로 자바스크립트로 돔을 컨트롤 할 수 있다.
- CSS 파일의 로딩 및 실행을 보통 `head`에 넣는 이유는 `body` 태그가 로드 되기 전에 미리 CSS를 입힐 수 있는 준비를 하기 위해서이다. 모든 태그가 로드된 이후 CSS가 적용이 되면 모든 태그가 로딩될 때까지 태그는 화면에 표시 되는데 태그에 CSS가 입히지 않아 페이지 로드 이후 잠시동안 화면이 깨져 보이는 시간이 생긴다. 태그를 화면에 표시를 할 때마다 바로 CSS가 적용되도록 하기 위해서 표시되는 태그 보다 앞서서 CSS를 로드하기 위해 `head` 태그에서 CSS를 불러오도록 한다.
- [css-loader](https://github.com/webpack-contrib/css-loader)를 사용하면 `defer` 속성이 지정된 `script` 태그에 CSS가 들어간다. 따라서 `body` 태그의 태그가 브라우저에 모두 표시된 이후 `script`의 자바스크립트가 실행이 되므로 CSS가 태그가 표시되는 즉시 입혀지는 것이 아니라, 모든 태그가 표시된 이후 입혀지게 되어 페이지 로드 이후 잠시 CSS가 적용이 되지 않는 시간이 생겨버린다. 따라서 CSS를 자바스크립트에 넣지 않고 별도로 빌드하여 `head` 태그에 넣어 `body` 태그가 로딩되기 전에 CSS가 적용되도록 해야 태그를 화면에 표시하는 즉시 CSS를 입혀 자연스런 페이지 로딩을 만들 수 있다.

#### defer 속성에 대한 설명

> 브라우저가 스크립트를 문서 분석 이후에, 그러나 DOMContentLoaded 발생 이전에 실행해야 함을 나타내는 불리언 속성입니다.
> defer 속성을 가진 스크립트는 자신의 평가가 끝나기 전까지 DOMContentLoaded 이벤트의 발생을 막습니다.

- https://developer.mozilla.org/ko/docs/Web/HTML/Element/script#attr-defer

### 설치하기

- 웹팩을 맨 처음 설치할 때 `npx webpack-cli init`을 사용하고 `? Do you want to extract CSS for every file?`라는 옵션을 yes로 선택했다면 특별한 설정을 하지 않아도 된다. 만약에 이 옵션을 선택하지 않았다면, `yarn add -D mini-css-extract-plugin`이란 명령어를 프로젝트 루트 경로의 CLI 창에 입력하여 `MiniCssExtractPlugin`을 설치해 주자.
- `webpack.config.js` 파일에서 다음 코드를 추가하자.

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  // 다른 옵션들
  plugins: [
    // 다른 플러그인들
    new MiniCssExtractPlugin(),
    // 다른 플러그인들
  ],
  // 다른 옵션들
};

// 웹팩 설정 코드들
```

- 플러그인을 가져온 후 (`const MiniCssExtractPlugin = require("mini-css-extract-plugin");`), 플러그인 옵션에 `new MiniCssExtractPlugin()`를 입력해 준다.

### 사용법

- `css-loader`를 사용할 때와 동일하게 자바스크립트에 `import 'CSS 파일 경로/파일명.css'`로 자바스크립트를 불어오면, dev 서버나 build를 할 때 자동으로 CSS 파일을 별도의 파일로 분리해 준다. 특별히 코드를 다르게 정의할 필요가 없다.
