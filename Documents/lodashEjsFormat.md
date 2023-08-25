## ejs format

-   웹팩에서 html을 관리하기 위해서 html-webpack-plugin을 사용한다. html-webpack-plugin에서 html 템플릿을 사용할 때 `<%` `%>`에 자바스크립트 코드를 쓸 수 있는 EJS 템플릿 문법을 지원한다.
-   하지만, html-webpack-plugin의 html 템플릿 파일에서 사용할 수 있는 ejs 문법은 ejs의 모든 문법을 지원하지 않는다.

> By default (if you don't specify any loader in any way) a fallback ejs loader kicks in. Please note that this loader does not support the full ejs syntax as it is based on lodash template. <sup>[link](https://github.com/jantimon/html-webpack-plugin/blob/main/docs/template-option.md#1-dont-set-any-loader)</sup>

### 코드 하이라이팅

-   먼저 EJS를 사용하기에 앞서 html 파일에서 ejs를 보면 syntax highlight 가 활성화 되어 있지 않은 것을 확인할 수 있다.

src/pages/index.html

```html
<body>
    <%= require('html-loader!../fragments/headerTag.html').default %>
    <h2>index.html</h2>
    <!-- prettier-ignore -->
    <%=
        require('../fragments/transmitMsgTag.js')
        .write({
            redMsg: 'red index msg',
            blueMsg: 'blue index msg',
            greenMsg: 'green index msg'
        })
    %>
    <img src="assets/img/icon-square-big.svg" />
    <%= require('html-loader!../fragments/footerTag.html').default %>
</body>
```

```txt
require('../fragments/transmitMsgTag.js')
.write({
    redMsg: 'red index msg',
    blueMsg: 'blue index msg',
    greenMsg: 'green index msg'
})
```

-   ejs 문법에 문법 하이라이팅 기능을 사용하기 위해서 VSCode에서 [EJS language support](https://marketplace.visualstudio.com/items?itemName=DigitalBrainstem.javascript-ejs-support)라는 확장 프로그램을 설치하도록 하자.
-   위 확장 프로그램을 활성화하면 html 파일에서 ejs 문법의 자바스크립트에 문법 하이라이팅이 되면서 다음과 같이 색이 입혀진다.

```js
require('../fragments/transmitMsgTag.js')
.write({
    redMsg: 'red index msg',
    blueMsg: 'blue index msg',
    greenMsg: 'green index msg'
})
```

### EJS 문법 설명

-   ejs에서 공식적으로 지원하는 태그 문법은 `<%`, `<%_`, `<%=`, `<%-`, `<%#`, `<%%`, `%>`, `-%>`, `_%>`이다. 하지만 html-webpack-plugin에서 사용할 수 있는 EJS에서 사용할 수 있는 태그 문법은 `<%`, `<%_`, `<%=` 뿐이다.
-   html-webpack-plugin는 [lodash template](https://lodash.com/docs/4.17.15#template)를 기반으로 만들어졌는데, 여기서 지원하는 ejs 태그 문법을 사용한 설명이 적혀 있다.

src/pages/index.html

```html
<%= `
<div>apply pretttier to tag string in &lt;%= and %&gt;</div>
` %><!-- -->
```

-   결과는 `apply pretttier to tag string in <%= and %>`이다. 브라우저 검사(inspect) 창에서 element 탭에서 확인하면 `<div>` 태그가 로딩이 된 것을 확인할 수 있다.
-   `<%=`와 `%>` 사이의 문자열로 된 태그는 HTML의 태그로 읽힌다.

```html
<%- `
<div>apply pretttier to tag string in <%- and %>;</div>
` %><!-- -->
```

-   결과는 `<div>apply pretttier to tag string in &lt;%- and %&gt;</div>`이다. 입력한 문자열 그대로 출력된 것이다.
-   `<%-`와 `%>` 사이의 문자열로 된 태그는 문자열 그대로 출력이 된다.

```html
<%_ `
<div>apply pretttier to tag string in &lt;%_ and %&gt;</div>
` %><!-- -->
```

-   `<%_`의 코드는 공식 ejs의 문법이지만 html-webpack-plugin 템플릿의 ejs 태그 문법으로는 지원하지 않는다. 에러를 발생하지 않을 뿐이지 브라우저에 아무런 출력도 하지 않는다.
-   `<%+`, `<%{}`, `<%()=>{} ` 그냥 사용할 수 있는 자바스크립트가 `<%`와 `%>` 사이에 들어간 꼴일 뿐이다. `_`는 로다시 라이브러리를 사용할 수 있는 오브젝트이고, `+`는 문자열을 합칠 때 쓰는 연산자이며, `{}`는 빈 오브젝트이며 `()=>{}`는 함수일 뿐이다.
-   [lodash template](https://github.com/lodash/lodash/blob/master/test/template.js)의 코드를 보면 로다시 템플릿 기능에서 정의되지 않은 문법이라는 것을 알 수 있다.

#### `<%` `%>`

-   `<%`와 `%>` 사이에는 자바스크립트 코드를 넣을 수 있다. 그런데 `<%=`나 `<%-`에는 문자열을 출력하는 기능이 있는 반면 `<%`와 `%>`는 문자열을 출력하는 기능이 없다.

src/pages/index.html

```html
<% const tag = `
<h2>index.html</h2>
` %><!-- -->

<%= tag %>

<%- tag %>
```

-   `<%` `%>` 사이의 코드는 출력이 되지 않지만 자바스크립트 문법을 사용할 수 있다. 여기서 `tag` 변수에 할당한 값을 그 다음에 나오는 ejs 태그에서 사용할 수 있다.

src/pages/index.html

```html
<% if(true) {%>
<%= '<b>true</b>' %>
<% } else {%>
<%- '<b>false</b>' %>
<% } %>
```

-   위와 같이 if문과 같이 다양한 자바스크립트 문법을 사용할 수 있다.

### lodash 라이브러리 사용하기

```js
<%= _.join(['Be', 'joyful', 'always'], [separator=' ']) %>
```

-   html-webpack-plugin의 템플릿으로 사용되는 html 파일에서 일부 ejs 문법을 사용할 수 있다. 이 ejs 문법은 [lodash template](https://lodash.com/docs/4.17.15#template)를 기반으로 만들어졌다. lodash template 기반 ejs는 로다시 라이브러리를 사용할 수 있는 기능을 제공한다.
-   자바스크립트에서 변수는 `_`로도 사용할 수 있는데 `_` 변수에 로다시 라이브러리를 사용할 수 있는 오브젝트가 할당되어 있어서 `_.로다시함수`와 같은 방식으로 코드를 쓸 수 있다.
