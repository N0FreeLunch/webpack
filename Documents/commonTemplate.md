## 공통 템플릿

- 사이트를 구성할 때 탑 메뉴, 사이드바, 푸터 등은 여러 페이지에서 공통적으로 사용된다. 웹팩을 사용하여 이런 공통적인 html을 하나로 묶는 방법을 알아 보자.
- 사이트에는 여러 페이지가 존재할 것이고 한 페이지의 탑 메뉴, 사이드바, 푸터가 변경이 되면 모든 페이지의 탑 메뉴, 사이드바, 푸터를 변경해 주어야 한다. 이러한 불편함을 방지하고자 한 부분에서만 태그를 정의하고 이 부분만 변경하면 다른 모든 페이지도 변경되도록 한다.

### webpack 설정하기

webpack.config.js

```js
const headerTag = `
    <header>
        <div id="header">header</div>
    </header>
`;

const footerTag = `
    <footer>
        <div id="footer">footer</div>
    </footer>
`;

const config = {
  // 설정들...
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/pages/index.html",
      chunks: ["index"],
      headerTag: headerTag,
      footerTag: footerTag,
    }),
    new HtmlWebpackPlugin({
      filename: "subpage.html",
      template: "src/pages/subpage.html",
      chunks: ["sub"],
      headerTag: headerTag,
      footerTag: footerTag,
    }),
    // 다른 plugin 설정들...
  ],
};
```

- 웹팩의 `HtmlWebpackPlugin` 설정에서 자바스크립트 문자열을 `html` 파일 안에 넣는 기능을 제공한다.
- 먼저 자바스크립트에 변수를 저장하고, `HtmlWebpackPlugin` 플러그인의 옵션 이름을 지정하고 `html` 안에 넣을 문자열을 할당한다. (여기서는 `headerTag:` 옵션에 `: headerTag` `headerTag` 변수에 든 문자열을 `html` 안에 주입한다는 의미이다.)

### 주입된 문자열 받기

- `HtmlWebpackPlugin` 플러그인의 옵션으로 전달된 문자열을 받기 위해서는 `<%=`와 `%>`라는 태그와 비슷한 형태의 코드를 만들어 주어야 한다. 그리고 `<%=`와 `%>` 사이에 전달된 값을 가져오는 코드(`htmlWebpackPlugin.options.옵션명`)를 써 준다.
- `HtmlWebpackPlugin`의 플러그인 옵션으로 `headerTag: headerTag`, `footerTag: footerTag`으로 하였으므로 `<%=`와 `%>` 사이에 `headerTag`와 `footerTag`를 `htmlWebpackPlugin.options.headerTag`, `htmlWebpackPlugin.options.footerTag`으로 가져다 쓸 수 있다.

src/pages/index.html

```html
<!-- 다른 태그들 -->
<body>
  <%= htmlWebpackPlugin.options.headerTag %>
  <h1>Hello world!</h1>
  <h2>Tip: Check your console</h2>
  <img src="./assets/img/icon-square-big.svg" />
  <%= htmlWebpackPlugin.options.footerTag %>
</body>
<!-- 다른 태그들 -->
```

src/pages/subpage.html

```html
<!-- 다른 태그들 -->
<body>
  <%= htmlWebpackPlugin.options.headerTag %>
  <h2>subpage.html</h2>
  <%= htmlWebpackPlugin.options.footerTag %>
</body>
<!-- 다른 태그들 -->
```

- 웹 페이지에 접근을 하면 `<%= htmlWebpackPlugin.options.headerTag %>` 부분의 코드에는 `<header><div id="header">header</div></header>` 태그가 들어가게 되고, `<%= htmlWebpackPlugin.options.footerTag %>` 부분의 코드에는 `<footer><div id="footer">footer</div></footer>` 코드가 들어간 결과가 출력된다.
- 주의할 점은 공통 템플릿은 코드를 수정한다고 해서 웹팩이 자동으로 변경사항을 적용하지 않는다는 점이다. `webpack.config.js` 안의 자바스크립트 코드는 변경을 한다고 해서 이를 감지하지 않기 때문에 다음 코드를 변경하게 되면 기존의 로컬 서버 연 것을 종료하고 `npx webpack serve` 명령어를 다시 실행하여 서버를 새로 켜 주어야 한다.

```js
const headerTag = `
    <header>
        <div id="header">header</div>
    </header>
`;

const footerTag = `
    <footer>
        <div id="footer">footer</div>
    </footer>
`;
```

### 공통 템플릿 설정의 단점

- `webpack.config.js` 안에 적어 주어야 하기 때문에 코드의 사이즈가 커지면 옵션 설정의 코드가 커지면서 코드 보는 것이 답답해진다.
- `webpack.config.js`에서 사용하는 코드 이므로, 변경 사항 저장시 자동으로 로컬 서버에 반영되지 않으므로 로컬 서버를 다시 실행해야 한다는 단점이 있다.

## 템플릿 태그를 자바스크립트로 주입하기

- `HtmlWebpackPlugin`의 플러그인은 템플릿 html 파일에 `<%=`와 `%>` 사이에 자바스크립트 코드를 적을 수 있다.
- `<%= htmlWebpackPlugin.options.headerTag %>`라는 코드의 경우에는 `htmlWebpackPlugin`이란 객체에 접근할 수 있는 자바스크립트 코드를 제공한 것이다.
- 만약 이 부분에 문자열을 적는다면 적은 문자열 그대로 출력된다. 태그 문자열을 적은 자바스크립트 모듈을 `<%=`와 `%>` 사이에서 불러오는 방법을 사용하여 다른 외부의 태그 조각을 주입하는 방식으로 사용해 보자.

### 자바스크립트로 태그를 정의하기

- 먼저 `src` 폴더 아래에 `fragments`라는 폴더를 만들자. 그리고 `fragments` 폴더 내에 `headerTag.js`와 `footerTag.js`를 만들도록 하자.

headerTag.js

```js
const tag = () => `
<header>
    <div id="header">header</div>
</header>
`;

export { tag as write };
```

footerTag.js

```js
const tag = () => `
<footer>
    <div id="footer">footer</div>
</footer>
`;

export { tag as write };
```

- 위의 코드는 함수로 만들었는데 함수가 아닌 상수를 `export` 해도 된다. 함수로 만든 것은 `require('../fragments/headerTag.js').write()`와 같은 방식으로 `write`라는 함수를 사용하는 것으로 태그를 템플릿에 쓴다는 느낌을 주기 위함이다.

```js
const tag = `
<header>
    <div id="header">header</div>
</header>
`;

export { tag };
```

- 위와 같이 함수가 아닌 상수를 `export`하는 코드로 만들어도 된다. 단, 이를 사용할 때는 `require('../fragments/headerTag.js').tag`와 같은 방식으로 사용해야 한다.

### 템플릿에서 불러오기

- `<%=`와 `%>` 사이에서 문자열로 이뤄진 태그 코드를 자바스크립트 모듈로 불러와서 `<%=`와 `%>`의 위치에 태그를 불러오자.

src/pages/index.html

```html
<!-- 다른 태그들 -->
<body>
  <%= require('../fragments/headerTag.js').write() %>
  <h1>Hello world!</h1>
  <h2>Tip: Check your console</h2>
  <img src="./assets/img/icon-square-big.svg" />
  <%= require('../fragments/footerTag.js').write() %>
</body>
<!-- 다른 태그들 -->
```

src/pages/subpage.html

```html
<!-- 다른 태그들 -->
<body>
  <%= require('../fragments/headerTag.js').write() %>
  <h2>subpage.html</h2>
  <%= require('../fragments/footerTag.js').write() %>
</body>
<!-- 다른 태그들 -->
```

### 웹팩 설정 다시하기

webpack.config.js

```js
const headerTag = `
    <header>
        <div id="header">header</div>
    </header>
`; // 삭제

const footerTag = `
    <footer>
        <div id="footer">footer</div>
    </footer>
`; // 삭제

const config = {
  // 설정들...
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/pages/index.html",
      chunks: ["index"],
      headerTag: headerTag, // 삭제
      footerTag: footerTag, // 삭제
    }),
    new HtmlWebpackPlugin({
      filename: "subpage.html",
      template: "src/pages/subpage.html",
      chunks: ["sub"],
      headerTag: headerTag, // 삭제
      footerTag: footerTag, // 삭제
    }),
    // 다른 plugin 설정들...
  ],
};
```

- 템플릿에서 자바스크립트 모듈을 통해서 태그를 로드하였기 때문에 `HtmlWebpackPlugin`의 옵션으로 불러오는 방식은 필요없어졌으므로 `// 삭제`로 표기하였다.

### 템플릿 태그를 자바스크립트로 주입하는 방법의 장점

- 태그를 `HtmlWebpackPlugin`의 옵션으로 주입하기 위해서는 `webpack.config.js` 안에 태그 문자열 코드를 추가해야 하기 때문에 적을 필요가 없기 때문에 코드가 지저분해지고 답답해지게 되지만, 외부의 자바스크립트로 분리할 수 있엉서 코드를 깔끔하게 유지할 수 있다.
- `webpack.config.js`에 설정하는 방식이 아니며, 템플릿 html과 그 안의 `<%=`와 `%>` 사이의 자바스크립트 모듈로 태그 문자열을 불러오는 방식이기 때문에 모듈의 변경 사항을 저장할 때 자동으로 로컬 서버에 변경 사항이 반영되므로 작성된 코드를 편리하게 확인할 수 있다.
- 빌드된 이후에는 자바스크립트 코드가 아닌 html의 태그 코드로 변경된 결과가 들어가기 때문에 순수하게 html 태그의 정보만을 수집하는(자바스크립트의 실행으로 페이지의 태그 변경을 감지할 수 없는 구형) 검색 엔진의 봇에 의해 정보가 수집되므로 SEO에 유리한 장점이 있다.

### 좀 더 알아보기

- `HtmlWebpackPlugin`을 사용하면 템플릿 html에서 기본적으로 `<%=`와 `%>` 사이의 자바스크립트 코드를 사용할 수 있는 기능을 제공한다. 이 때 기본적으로 제공되는 템플릿 문법은 `lodash template` 기반의 ejs 템플릿 엔진을 사용한다. `lodash template` 기반의 ejs는 ejs의 모든 기능을 제공하지 않기 때문에 템플릿 문법 사용에 어느 정도 제약이 있다.
- 다른 템플릿 엔진 (pug, ejs(디폴트로 설치된 것이 아닌 전체 문법을 지원하는 템플릿), underscore, handlebars, html-loader)를 사용할 수 있는 기능을 지원한다. 이 중에서 그나마 깃 허브 별의 갯수가 많은 것은 `html-loader`이고, 웹팩에 연결되는 나머지 템플릿 엔진은 인기가 많이 떨어지므로 사용한다면 `html-loader`으로 사용하는 편이 좋다.
- 하지만 다른 템플릿 엔진을 사용하는 경우 기존 웹팩 설정과 충돌하는 현상이 생길 수 있다. `HtmlWebpackPlugin`은 기본적으로 html 태그에서 사용되는 외부 링크 주소는 빌드된 폴더에서의 PATH를 기준으로 작성되어야 하지만 `html-loader`를 사용하는 경우 템플릿 파일의 경로를 기준의 PATH로 외부 링크 주소가 작성되어야 하므로 템플릿 엔진을 추가하는 순간 상당히 많은 코드의 변경을 요구하는 경우가 생긴다. 따라서 초기 설정부터 `html-loader`를 세팅하고 사용하면 모를까 그렇지 않고 점진적인 추가를 하는 경우에는 외부 템플릿 엔진을 사용하는 것이 좋지 않은 경우가 있다.

### HTML을 템플릿으로 사용하기

- `HtmlWebpackPlugin`에서 지정한 템플릿 html에서는 기본적으로 `<%=`와 `%>` 코드 사이에 자바스크립트를 넣을 수 있도록 만들었다.
- `<%= require('../fragments/headerTag.js').write() %>`와 같은 방식으로 자바스크립트로 HTML 태그를 문자열로 만든 값을 가져와서 템플릿 안에 넣어 주었다.
- 이번에는 `<%= require('../fragments/headerTag.html') %>`과 같은 방식으로 템플릿을 로드하는 방법을 알아 보자.
- 이를 위해서는 `html-loader` 라이브러리를 설치해야 한다.

```
yarn add -D html-loader
```

- [`HtmlWebpackPlugin` 라이브러리](https://github.com/webpack-contrib/html-loader)의 설명을 보면 `webpack.config.js`에서 다음과 같은 로더 설정을 해야 사용할 수 있는 것 처럼 되어 있다. 하지만 이 방식을 사용하면 `HtmlWebpackPlugin` 플러그인에서 지정한 템플릿 html의 경로를 모두 바꿔 주어야 하는 문제점이 있다.

```js
module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          // Disables attributes processing
          sources: false,
        },
      },
    ],
  },
```

- 위 설정은 `HtmlWebpackPlugin`에서 템플릿으로 사용하는 html 파일에도 영향을 준다. `src/pages/index.html` 템플릿에서 `<%= require(대상 파일 경로) %>`로 불러오는 `src/fragments/headerTag.js` 뿐만 아니라 `HtmlWebpackPlugin`에서 지정한 템플릿인 `src/pages/index.html`의 외부 경로를 사용할 때 빌드된 폴더를 또는 로컬 서버의 접근한 도메인 주소를 기준으로 html 파일의 경로 기준으로 한 절대 경로나 상대 경로를 사용하는 것이 아닌 `src/pages/index.html` 위치에서의 로컬 파일 경로를 기준으로 경로를 작성해 줘야 한다. `HtmlWebpackPlugin`의 기본 설정은 그대로 유지하여 `HtmlWebpackPlugin`에서 지정한 템플릿의 경로는 그대로 사용하되, `HtmlWebpackPlugin` 템플릿에서 불러오는 html 파일에만 html-loader 로더의 설정이 적용되도록 하자.
- 위 설정이 `HtmlWebpackPlugin`에서 기본적으로 제공하는 템플릿의 경로 설정을 무시하는 이유는 `HtmlWebpackPlugin`에서 지정된 [fallback ejs loader](https://github.com/jantimon/html-webpack-plugin/blob/main/lib/loader.js) lodsh 템플릿 기반의 (` _.template(source, { interpolate: /<%=([\s\S]+?)%>/g, variable: 'data', ...options });`)을 무시하고 html-loader의 설정을 따르기 때문이다.
  > [However this also means that in the following example webpack will use the html loader for your template. This will cause html minification and it will also disable the ejs/lodash fallback loader.](https://github.com/jantimon/html-webpack-plugin/blob/main/docs/template-option.md)
- `HtmlWebpackPlugin`에서는 **위 설정을 사용하지 않는 방식(Don't apply the above method)** 으로 html-loader를 사용하여 `HtmlWebpackPlugin` 지정한 템플릿 파일은 그대로 사용하고 템플릿 파일에서 불러오는 외부 html에만 html-loader를 적용하는 방식이 있다. `HtmlWebpackPlugin`에서 지정한 템플릿 html에서 `<%=`와 `%>` 사이에서 로드하는 html 파일에만 html-loader를 사용해서 불러오는 방식이다.
- 먼저 `src/fragments` 폴더에 `headerTag.html`이란 파일을 만들고 자바스크립트가 아닌 HTML 태그의 일부분을 적어 준다.

src/fragments/headerTag.html

```
<header>
    <div id="header">html-loader로 불러온 header</div>
</header>
```

- `HtmlWebpackPlugin`에서 지정한 템플릿 html의 `<%=`와 `%>`에서 다음 코드를 통해서 html 파일을 불러 올 수 있다.

src/pages/index.html

```js
<%= require('html-loader!../fragments/headerTag.html').default %>
```

- `require` 함수의 인자로 받는 경로 앞에 `html-loader!`를 넣어 주고 `require` 함수의 실행 결과에 `.default`를 붙여주도록 한다. `.default`를 붙여주지 않는다면, `[object Module]`이란 표시만 나오므로 주의하자.
- 로컬 서버를 켜면 `src/fragments/headerTag.html` 파일에 정의한 `html-loader로 불러온 header`를 표시하는 html 태그가 로딩되는 것을 확인할 수 있다.
- html 코드 조각을 불러오는 방법으로 바꾸었다면 기존의 js 파일로 불러오는 코드를 삭제해 주자. ()`<%= require('../fragments/headerTag.js').write() %>` 코드를 삭제)

### 자바스크립트를 불러오는 것과 html을 불러오는 것의 차이점

- 자바스크립트를 불러오는 것은 자바스크립트로 통신을 하거나 새롭게 변동된 상황에 따라 변동되는 값들을 새롭게 적용해서 테그를 만들어 낼 수 있다는 장점이 있는 반면, html을 그대로 불러오는 방식은 고정된 html 파일만 불러온다는 단점이 있다.
- html 파일을 불러오는 방식을 사용하면 IDE(비쥬얼 스튜디오와 같은 에티터)에서 구문에 따라 색을 입혀주는 방식과 자동완성되는 방식의 코드를 사용할 수 있다는 장점이 있다.

### html 코드 조각 내에서의 외부 파일 경로

src/fragments/headerTag.html

```html
<header>
  <div id="header">
    <img
      src="../assets/img/icon-square-big.svg"
      style="width:2em; height: 2em"
    />
    html-loader로 불러온 header
  </div>
</header>
```

- 위와 같이 이미지 파일을 불러오는 코드를 만들어 주자.

src/pages/index.html

```html
<!-- 코드 생략 -->
<%= require('html-loader!../fragments/headerTag.html').default %>
<h1>Hello world!</h1>
<h2>Tip: Check your console</h2>
<img src="assets/img/icon-square-big.svg" />
<%= require('../fragments/footerTag.js').write() %>
<!-- 코드 생략 -->
```

- `src/pages/index.html`의 코드는 body 태그 내의 코드이다.
- `<img src="assets/img/icon-square-big.svg" />` 부분의 코드를 보면 절대 경로로 이미지 파일을 불러왔다. 하지만 `src/fragments/headerTag.html`의 이미지 파일의 경로는 `../assets/img/icon-square-big.svg`으로 상대 주소이다. html-loader로 불러온 html 태그 조각의 외부 파일 경로를 절대주소로 바꾸면 에러가 발생한다.
- 에러가 발생하는 이유를 보면, `HtmlWebpackPlugin`의 html 템플릿은 빌드된 폴더에서의 경로로 접근을 하기 때문에 `assets/img/icon-square-big.svg`으로 경로를 쓰면 `dist/assets/img/icon-square-big.svg`의 주소로 접근한다. 하지만 html-loader로 불러온 html 태그 조각은 html 태그 조각이 위치한 로컬 파일 경로를 기준으로 외부 파일 경로를 연결한다. 따라서 html-loader로 불러온 html 태그 조각에서의 이미지 경로는 `../assets/img/icon-square-big.svg`으로 설정된다.

---

## refer to the following

- https://github.com/jantimon/html-webpack-plugin/blob/main/docs/template-option.md
- https://github.com/jantimon/html-webpack-plugin
- https://github.com/jantimon/html-webpack-plugin/tree/main/examples/custom-template
- https://github.com/webpack-contrib/html-loader
