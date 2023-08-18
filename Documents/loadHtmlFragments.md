## html 코드 조각 불러오기

### html-loader 사용하기

-   헤더뿐만 아니라 푸터 또한 html 로더를 사용한 방식으로 바꾸자.

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

src/fragments/footerTag.html

```html
<footer>
  <div id="footer" style="background-color: darkgreen; color: white;">
    html-loader로 불러온 footer
  </div>
</footer>
```

src/pages/index.html

```html
<body>
  <%= require('html-loader!../fragments/headerTag.html').default %>
  <h2>index.html</h2>
  <img src="assets/img/icon-square-big.svg" />
  <%= require('html-loader!../fragments/footerTag.html').default %>
</body>
```

src/pages/subpage.html

```html
<body>
  <%= require('html-loader!../fragments/headerTag.html').default %>
  <h2>subpage.html</h2>
  <%= require('html-loader!../fragments/footerTag.html').default %>
</body>
```

-   위와 같이 코드를 변경하였다면, `src/fragments/footerTag.js`와 `src/fragments/headerTag.js` 파일은 삭제해 주자.

### html-loader가 아닌 자바스크립트를 사용해야 할 때

-   html-loader는 순수한 html 태그 조각만을 가져올 수 있다. `<%= require('html-loader!../fragments/headerTag.html').default %>`를 사용할 때 다른 값을 전달할 수 없다. 하지만,　자바스크립트를 사용하면 태그 조각을 불러 올 때마다 불러오는 태그 조각의 문자열을 바꾸어 로딩할 수 있는 장점이 있다.
-   `src/fragments` 폴더에 자바스크립트 파일 `transmitMsgTag.js`를 만들어 보자.

src/fragments/transmitMsgTag.js

```js
const writeTag = ({ redMsg = "", blueMsg = "", greenMsg = "" }) => {
  return `
        <div style="border-style: solid; padding: 10px; margin: 10px;">
            <div>코드 조각을 사용할 때 마다 다른 메시지 정의</div>
            <div style="color: red;">
                ${redMsg}
            </div>
            <div style="color: blue;">
                ${blueMsg}
            </div>
            <div style="color: green;">
                ${greenMsg}
            </div>
        </div>
  `;
};

export { writeTag as write };
```

-   html 태그 조각을 출력하는 자바스크립트 모듈을 만든다.
-   위 모듈의 함수는 `{ redMsg = "", blueMsg = "", greenMsg = "" }`를 인자로 받는다. 이는 `{redMsg: 값1, blueMsg: 값2, greenMsg: 값3}` 형식인 리터럴 오브젝트를 인자로 받는 방식으로 사용된다. 만약 리터럴 오브젝트에 키가 누락되어 있다면 `= ""`으로 기본값을 할당 받는다. 예를 들어 `{redMsg: 값1, greenMsg: 값3}` 오브젝트는 `blueMsg` 키가 누락되어 있다. 그러면 모듈 안으로 전달될 때 `blueMsg`의 값은 빈 문자열 `""`으로 할당되는 것이다.
-   `export` 할 때 `writeTag`는 변수명, `as write`는 모듈을 불러와서 변수에 들어 있는 값을 사용할 때 쓰는 코드이다. `export { writeTag as write };` 대신에 `export { writeTag };`를 사용할 수도 있는데 `export { writeTag as writeTag };`와 동일한 코드이다.

src/pages/index.html

```html
<%= require('html-loader!../fragments/headerTag.html').default %>
<h2>index.html</h2>
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
```

src/pages/subpage.html

```html
<%= require('html-loader!../fragments/headerTag.html').default %>
<h2>subpage.html</h2>
<%=
    require('../fragments/transmitMsgTag.js')
    .write({
        redMsg: 'red subpage msg',
        blueMsg: 'blue subpage msg',
        greenMsg: 'green subpage msg'
    })
%>
<%= require('html-loader!../fragments/footerTag.html').default %>
```

-   위와 같이 자바스크립트 모듈을 불러올 때 불러온 값 중에서 함수가 있다면 `.write()` 함수의 인자로 값을 전달 할 수 있다.
-   `src/pages/index.html` 파일에서는 `'red index msg'`, `'blue index msg'`, `'green index msg'`가 담긴 오브젝트를 `write` 함수의 인자로 전달해 주었고, `src/pages/subpage.html` 파일에서는 `'red subpage msg'`, `'blue subpage msg'`, `'green subpage msg'`가 담긴 오브젝트를 `write` 함수의 인자로 전달해 주었다. 서로 다른 값을 전달해 주었기 때문에 로컬 서버의 페이지에서 출력되는 결과나 빌드된 결과에서도 다른 문자열이 찍힌 html이 만들어진다.
-   `<%=`와 `%>`는 표준 html 문법이 아니기 때문에 IDE(비쥬얼 스튜디오 코드)에서 '코드를 색으로 구분'(syntax hilighting)해 주지 않는다는 단점이 있다.

### 템플릿 엔진이 아닌 자바스크립트 모듈을 쓰는 이유

-   코드 조각을 불러올 때 옵션을 주어 다른 문자열을 가져오는 방법으로 자바스크립트 코드 조각 뿐만 아니라, `pug`, `ejs`(`html-webpack-plugin`의 디폴트 ejs와 달리 더 많은 문법을 지원하는 것), `underscore`, `handlebars` 등의 템플릿 엔진을 사용할 수도 있다. 하지만 이들 템플릿엔진은 템플릿 엔진만의 고유한 문법을 가지고 있기 때문에 이들 문법을 활용할 바에야 자바스크립트를 통한 로드 방식을 활용하는 것이 좋다고 본다. 또한 템플릿 엔진의 라이브러리의 메인테인스, 지속가능성, 관리 등의 측면을 생각했을 때 템플릿 엔진 보다는 자바스크립트 모듈을 사용하는 방식을 쓰는 것이 여러모로 나은 선택이라고 판단된다.

### 자바스크립트 코드 조각의 html 하이라이팅

src/fragments/transmitMsgTag.js

```js
const writeTag = ({ redMsg = "", blueMsg = "", greenMsg = "" }) => {
  return /*html*/`
        <div style="border-style: solid; padding: 10px; margin: 10px;">
            <div>코드 조각을 사용할 때 마다 다른 메시지 정의</div>
            <div style="color: red;">
                ${redMsg}
            </div>
            <div style="color: blue;">
                ${blueMsg}
            </div>
            <div style="color: green;">
                ${greenMsg}
            </div>
        </div>
  `;
};

export { writeTag as write };
```

-   위 코드는 자바스크립트 코드이므로 html은 문자열로 적혀 있다. 따라서 코드를 색으로 구분하는 문법 하이라이팅 기능이 작동하지 않는다. 자바스크립트의 문자열로 html을 적었을 때 IDE(비쥬얼 스튜디오 코드와 같은 에디터)에서 위 html 문법 하이라이팅을 적용할 수 있는데, [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)라는 IDE 확장 프로그램을 설치하는 것이다. 이 프로그램을 설치한 후 html 문자열이 시작하는 부분 앞에 `/*html*/`을 붙여주면 html 코드에 하이라이팅이 적용된다.
-   하이라이팅이 적용된다고 해서 자동완성 기능이 지원되는 것은 아니다. 굳이 자동완성 기능을 사용하고 싶다면, 비쥬얼스튜디오 오른쪽 하단에 '언어 모드 선택'이라는 부분이 있다. `src/fragments/transmitMsgTag.js` 파일을 열었을 때는 js로 표기가 되어 있을 것인데 html로 표기를 바꾸어 주면 html 코드 부분에서 자동완성 기능을 활용할 수 있다.
