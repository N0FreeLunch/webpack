## 언더스코어 템플릿 로더

-   html-webpack-plugin에서 사용되는 템플릿인 lodash template와 underscore-template-loader의 템플릿은 기본적으로 거의 똑같다. 다른점은 `_` 변수를 사용하기 위해서는 로더 옵션에 `_` 로다시 라이브러리를 바인딩 해 줘야 한다. 옵션을 지정하지 않는다면 `_`는 `undefined`이다. <sup>[link](https://github.com/emaphp/underscore-template-loader#template-engine)</sup>

### underscore-template-loader를 사용하는 이유

-   html-webpack-plugin에서 기본적으로 사용할 수 있는 lodash template는 `<%=` `%>`에서 import나 require을 사용하여 모듈의 값을 가져올 때 자바스크립트 모듈만 가져올 수 있다. 비-자바스크립트 모듈을 가져오기 위해서는 `require('로더명!경로')`와 같은 방식으로 로더를 사용해야 한다.
-   html-webpack-plugin은 웹팩에서 html 코드를 만들 때 코드 조각을 나누어 만들어 재상용성을 높이는 방식의 개발을 할 수 있도록 하는 것에 목적이 있다. 하지만 자바스크립트 모듈을 사용하여 html 코드를 만드는 경우 html 태그의 자동완성과 같은 기능을 사용할 수 없다는 문제점이 있다.
-   자바스크립트 모듈이 아닌, `.html` 확장자를 가진 html 파일을 모듈로 사용하면 html 태그 코드의 자동완성 기능은 유지한 채 `<%=` `%>`로 자바스크립트 코드를 추가하는 방식을 통해 html 코드 조각의 재사용성을 높여 모듈화된 방식으로 html 코드를 만들 수 있다는 장점이 있다.

### 설치하기

```
yarn add underscore-template-loader
```

### 언더스코어 템플릿 만들기

src/fragments/footerTag.html

```html
<footer>
    <div id="footer" style="background-color: darkgreen; color: white">
        <%= 'html-loader로 불러온 footer' %>
    </div>
</footer>
```

-   기존의 코드에 `html-loader로 불러온 footer` html 코드를 `<%= 'html-loader로 불러온 footer' %>`의 ejs 코드로 바꿔보자.

src/pages/index.html

```html
<body>
    <!-- other code ... -->
    <%= require('html-loader!../fragments/footerTag.html').default %>
    <%= require('!!underscore-template-loader!../fragments/footerTag.html')() %>
</body>
```

-   `footerTag.html`을 `html-loader`로 불러왔을 때와 `underscore-template-loader`으로 불러왔을 때의 차이를 살펴 보면, `html-loader`에서는 `<%=` `%>`를 포함한 코드가 그대로 랜더링 되고, `underscore-template-loader`에서는 `<%=` `%>` 사이의 자바스크립트 코드가 실행이 된 결과값이 문자열로 랜더링 되고 `<%=`와 `%>`는 랜더링 되지 않는다.

### 전역 설정

-   기본적으로 html-webpack-plugin을 사용할 때는 전역설정을 추천하지는 않는다. 왜냐하면 기본 lodash template과 충돌하는 문제가 발생할 수 있기 때문에 `require('!!underscore-template-loader!파일경로')()`와 같은 방식으로 사용하는 것을 추천한다.
-   underscore 템플릿을 전역 설정하여 사용하는 경우에는 html-webpack-plugin에서 사용되는 lodash template와 충돌하는 문제가 있다. 따라서 `test` 옵션의 정규식에 파싱될 대상 파일명을 lodash template에서 사용할 파일 경로 규칙과 underscore template에서 사용할 파일 경로 규칙을 구분해서 적어 주는 것이 좋다.

```js
{
    test: /\.html$/,
    loader: "underscore-template-loader",
    options: {
        engine: 'lodash',
    }
}
```

-   `test: /\.html$/` 부분에서 lodash template에서 사용할 html 파일과 underscore template에서 사용할 html 파일을 구분하기 위해 `test: /\.un\.html$/`등의 형식으로 설정하여 underscore template는 `파일명.un.html`의 경우에만 적용하는 등의 방식을 사용하는 방식을 추천한다.
-   `engine: 'lodash'` : 변수 언더바(\_)에 lodash 라이브러리를 바인딩한다.
