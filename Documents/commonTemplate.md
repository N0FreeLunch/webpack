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
