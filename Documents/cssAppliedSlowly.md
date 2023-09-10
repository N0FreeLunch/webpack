## CSS가 약간 느리게 적용되는 문제 해결하기

-   웹 페이지를 로드할 때 잠시 동안 태그는 로딩되지만, 화면에 표시된 태그에 CSS가 적용되지 않는 짧은 순간이 존재할 수 있다. 이런 현상이 발생하는 이유는 CSS가 빠르게 로딩되지 않았기 때문에 발생하는 문제이다.
-   link 태그를 사용해서 CSS를 다운로드 하느 경우 링크 태그의 파일을 다운로드 하는 동시에 HTML 구문을 위에서 아래로 브라우저는 계속 해석한다. link 태그의 CSS가 병렬로 실행이 되기 때문에 CSS의 사이즈가 커서 다운로드 속도가 늦어진다면, 브라우저에 태그가 표시된 이후에 CSS가 적용되는 일이 발생한다.
-   HTML 파일 및 CSS 파일 등은 대체로 매우 가볍다. 브라우저에서 순식간에 다운로드가 되고 이를 브라우저가 적용을 하기 때문에 많은 경우 사람이 충분히 인지하기 전에 랜더링된 태그에 CSS가 적용되어 나오는 경우가 많다. CSS 파일을 한 번 다운로드 받으면 동일한 CSS 파일을 브라우저에 캐싱되어 동일한 CSS 파일을 이용하는 페이지의 경우 이미 CSS 파일을 다운로드 받았기 때문에 다운로드 없이 CSS가 바로 적용되므로 많은 경우 CSS가 태그가 표시되는 것 보다 좀 더 느리게 다운로드 되는 것을 알아차리지 못할 정도로 빠르게 이뤄지는 경우가 많다.
-   하지만, CSS 파일을 초기 다운로드 하는 경우 약간씩 CSS가 지연되어 적용이 되는 경우가 있는데, 웹을 보는 사람들에게 CSS가 적용되지 않은 화면을 순간 노출하는 것도 웹에 대한 부정적 이미지를 만들 수 있다.

### Style 태그를 이용하여 CSS 로드하기

-   css를 불러올 때 link 태그를 사용하면 브라우저의 html 파싱과 별개로 병렬로 다운로드가 일어나므로 link 태그를 사용하지 않고 HTML에 직접 CSS 구문을 적는 방법이 있다. 브라우저는 태그를 위에서 아래로 순차적으로 읽어 나간다. `<style></style>` 태그 사이에 CSS를 적어주면 브라우저는 태그 안의 CSS도 해석한 후 아래에 있는 다른 태그를 읽는다. link 태그의 경우 `<link href="외부_파일_URL" rel="stylesheet" />`으로 되어 있으므로 이 태그를 읽고 파일 불러오기는 HTML 해석기에 의존하지 않고 외부 파일을 불러오는 기능에 맡겨 버리고 HTML 해석기는 다음 태그를 바로 읽는다. 따라서 style 태그를 head 태그에 넣어, 다음 html 코드를 읽기 전에 CSS를 미리 다 읽어서 적용할 준비를 하도록 하여 CSS가 body의 태그가 화면에 노출되는 즉시 입혀지도록 하는 것이다.

### style-loader 사용하기

-   한 페이지에 로딩되는 CSS라도 일정한 단위로 코드를 짜는 것이 좋기 때문에 여러 CSS 파일을 만드는 방식을 사용한다. 하지만 style 태그를 사용하게 되면 html에 직접 CSS 코드를 적어야 하기 때문에 CSS를 구조화하기 어렵고, 하나의 HTML 파일의 코드가 너무 늘어난다는 단점이 있다.
-   웹팩에서는 `style-loader`라는 기술을 제공하는데, CSS 파일을 여러 파일로 짜더라도 최종적으로는 한 덩어리의 CSS 코드를 html의 style 태그로 만들어주는 기술이다.
-   하지만 이 설정은 css 파일을 link 태그로 불러오는 mini-css-extract-plugin의 기능과 충돌하는 기능이므로 html에 style 태그로 CSS를 적을 것인지 아니면, link 태그로 외부의 CSS 파일을 불러올 것인지를 양자택일 해야 한다.
-   웹팩의 기본 구성은 css 코드를 자바스크립트에 담아서 자바스크립트 파일을 로드하면, css가 적용되는 방식이다. 하지만 이는 자바스크립트를 로드할 때까지 css가 적용되지 않는다는 문제점이 있어서 초기 로딩에서 css가 잠시 적용되는 문제를 해결하지 못한다. 따라서 style-loader를 사용해서 html의 body 요소가 실행되기 이전에 css 코드가 브라우저에 의해 해석이 되어 css를 즉시 적용할 준비를 해야 한다.

#### 설치

```sh
yarn add -D style-loader
```

#### 설정

webpack.config.js

```js
// other configulation...
const config = {
    // other configulation...
    module: {
        rules: [
            // other rules...
            {
                test: /\.(c|sa|sc)ss/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            // other rules...
        ]
    }
}
// other configulation...
```

-   위와 같이 설정해 주면 css나 sass 파일을 적용할 때, html 파일에 style 태그가 생성된다.
-   만약 css 파일에는 sass의 구문해석이 되지 않도록 설정하고 싶다면 대상 파일의 종류를 분류해서 적어주기 위해 확장자 규칙을 구분해서 적용되는 로더를 바꾸어준다.

```js
// other configulation...
const config = {
    // other configulation...
    module: {
        rules: [
            // other rules...
            {
                test: /\.css/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader"
                ],
            },
            {
                test: /\.(sa|sc)ss/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            // other rules...
        ]
    }
}
// other configulation...
```

-   위 코드는 CSS 파일과 SASS 파일이 서로 구분되어 `style` 태그로 로딩된다는 단점이 있다.
