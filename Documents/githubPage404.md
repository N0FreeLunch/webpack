## 깃허브페이지의 404 페이지 만들기

### http status

#### 공유 폴더의 파일의 존재여부

-   브라우저는 서버 컴퓨터에서 공유한 폴더의 특정 파일에 접근할 수 있다. 공유 폴더의 특정 파일에 리퀘스트를 보내고 파일을 받는다.
-   서버 컴퓨터의 공유 폴더에는 도메인 또는 아이피로 접근할 수 있으며, 공유 폴더의 파일에는 PATH로 접근할 수 있다.
-   예를 들어 `https://github.com/N0FreeLunch/webpack`이란 홈페이지가 있다면, github.com는 도메인에 해당하며 N0FreeLunch/webpack는 PATH에 해당한다.
-   서버는 브라우저의 요청에 대해 파일 뿐만 아니라 http status라는 것을 함께 보낸다. 브라우저가 파일에 엑세스해서 파일을 다운로드 할 수 있으면 http status 200을 함께 보내며, 브라우저가 파일에 엑세스 할 수 없으면 http status 404를 보낸다.
-   이 때 브라우저는 아무런 파일을 받지 않기 때문에 브라우저에 저장되어 있는 404 페이지의 html을 보여준다.

#### 서버 프로그래밍의 등장

-   초기에 컴퓨터와 컴퓨터가 네트워크를 통해서 파일을 공유할 때는 한 컴퓨터가 다른 컴퓨터의 공유 폴더에 접근하여 파일을 다운로드 하는 방식이었지만, 서버는 미리 저장된 파일을 보내주는 역할 뿐만 아니라 프로그램을 통해서 다른 컴퓨터에서 접근하려는 주소에 담긴 정보를 이용하여 정보에 맞는 다양한 코드를 html, css, js 담아서 보내게 된다.
-   미리 저장된 고정된 html, css, js 등의 파일을 보내는 방식을 정적인(static) 방식이라고 부르며 서버의 프로그램으로 매번 다른 코드를 html, css, js 등에 담아 보내는 방식을 동적인(dynamic) 방식이라고 부른다.
-   깃허브 페이지는 코드가 고정된 html, css, js 파일 및 고정된 image, font 등의 파일을 보내는 방식이므로 정적 웹 사이트(static website)라고 부른다.
-   동적인 웹 사이트는 정적인 웹 사이트가 200 및 404를 보내는 것과 달리 다양한 스테이터스를 보낼 수 있다. [http status list](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)를 참고 하자.

### 깃허브 페이지에서의 404

-   정적 웹 사이트에서는 기본적으로 접속한 경로에 파일이 없다면 서버에서 파일을 가져오지 못하고 브라우저에 디폴트로 세팅된 404 페이지를 보여준다.
-   동적 웹 사이트의 경우에는 http status만 404로 보내고 파일을 함께 보내는 경우가 있는데 브라우저는 http status는 404를 받았지만, html 파일을 받아서 브라우저에 디폴트로 보여주는 404 페이지가 아닌 웹 사이트에서 받은 html을 보여줄 때가 있다.
-   깃 허브 페이지는 기본적으로 깃 허브에서 제공하는 서버이다. 사용자는 코드가 고정된 파일을 올려 이 파일을 접속자에게 전송하지만, 404 페이지의 경우 사용자가 올려놓은 파일이 접속한 경로에 존재하지 않는 경우 공유폴더 최상단 경로의 404.html을 404 http status와 함께 깃허브 페이지 서버에서 전송해 준다.

### 깃허브 페이지의 404 페이지를 만들 때 주의할 점

-   서버에는 다양한 경로로 접근할 수 있다. `도메인/path_1/path_2`으로 접근을 했는데 파일이 존재하지 않을 수도 있고, `도메인/path_3`으로 접근 했을 때 파일이 존재하지 않을 수도 있고, `도메인/path_4/path_5/path_6`으로 접근했을 때 파일이 존재하지 않을 수도 있다.
-   깃허브 페이지는 위의 예제 경로 `도메인/path_1/path_2`, `도메인/path_3`, `도메인/path_4/path_5/path_6`에 대해 동일한 공유폴더의 최상단의 404.html 파일을 제공한다.
-   공유 폴더 최상단에 존재한다는 것은 `도메인/404.html`의 경로를 가지고 있는데 여러 경로에서도 동일한 html 파일을 전송하기 때문에 상대경로가 달라지는 문제점이 생긴다. `도메인/path_1/path_2`, `도메인/path_3`, `도메인/path_4/path_5/path_6` 각각의 경로에서 다운로드된 html 파일의 코드는 모두 같다. 모든 코드가 같기 때문에 상대 경로를 사용했을 때 문제가 발생한다.
-   예를 들어 404.html에는 `<link href="404.css" rel="stylesheet">`란 코드가 있다고 하자. 여기서 `404.css`는 `./404.css`와 동일한 파일이다. 그러면 `도메인/path_1/path_2`에서는 `도메인/path_1/404.css`에 접근하고, `도메인/path_3`에서는 `도메인/404.css`에 접근하고, `도메인/path_4/path_5/path_6`에서는 `도메인/path_4/path_5/404.html`에 접근하게 된다.
-   따라서 깃허브 페이지의 404 파일을 만들 때는 어느 경로에서 접근하더라도 경로에 위치하는 파일에 접근할 수 있도록 상대 경로가 아닌 절대 경로를 사용해야 한다. `<link href="404.css" rel="stylesheet">`라는 코드가 아닌 `<link href="/404.css" rel="stylesheet">`와 같이 경로의 맨 처음에 `/`로 시작하는 절대 경로여야 한다. 절대 경로의 경우 `도메인/path_1/path_2`, `도메인/path_3`, `도메인/path_4/path_5/path_6` 어느 경로에서 접근한 html인지에 관계 없이 항상 `도메인/404.css`에 접근하게 된다.

### 웹팩을 사용할 때 문제점

-   웹팩은 기본적으로 자바스크립트 파일을 빌드하는 도구이다. 자바스크립트를 빌드하는 도구에 html-webpack-plugin을 추가하여 html 파일도 함께 번들링 할 수 있도록 한다. 이때 자바스크립트 파일은 `webpack.config.js`의 `plugins` 설정의 `new HtmlWebpackPlugin()`의 `chunks` 옵션에 지정한 자바스크립트 청크명(`entry`에서 설정한 빌드된 자바스크립트 파일명)에 따라 빌드된 html에 자동으로 주입된다.
-   그런데 자바스크립트가 html에 자동 주입될 때 상대경로로 주입된다는 문제점이 있다. 따라서 이를 절대 경로로 만들어 주어야 깃허브 페이지의 `404.html` 파일에서 자바스크립트 파일을 불러올 수가 있다.
-   웹팩은 자바스크립트에서 CSS 또는 SASS 파일을 로드하여 스타일을 적용하는 방식을 사용한다. mini-css-extract-plugin을 사용하면 자바스크립트에서 로드된 CSS 파일을 자바스크립트 코드로 존재하는 것이 아닌 별도의 CSS 파일로 분리되도록 빌드하며 html-webpack-plugin과 함께 사용할 경우 빌드시 `<link>` 태그를 자동 주입하여 분리된 CSS 파일을 불러오는 코드로 만든다.
-   그런데 이 때 생성되는 link 태그의 herf 속성은 자바스크립트 청크명이 생성되는 경로와 동일한 경로가 지정된다. 이 경로는 기본적으로 상대 경로로 만들어지므로 다양한 경로에서 로드되는 `404.html`에 적절한 경로가 될 수 없다.

### 청크 경로를 절대 경로로 만들기

-   절대 경로로 만드는 방법은 두 가지 방법이 있다. 모든 경로를 상대 경로로 하되, `404.js`, `404.css`만 상대 경로로 만드는 방법이 있고, 모든 청크 파일을 불러오는 코드를 절대경로로 만드는 방법이 있다.

#### 404.js, 404.css만 절대경로로 만들기

webpack.config.js

```js
// other settings...
const config = {
    entry: {
        // other chunks settings...
        '/404': [
            "/src_study/css/404.scss"
        ]
    },
    // other options...
}
// other settings...
```

-   청크명에 `/404`라고 쓴다. 깃허브 페이지의 `404.html`은 공개 폴더의 최상단에 위치해 있다. 따라서 상대경로 `404.js`는 `/404.js`과 동일하다는 점에 착안하여 청크명을 `/404`로 한 것이다. 그러면 CSS 파일도 자바스크립트 청크명에 따라서 `/404.css`으로 빌드가 된다.
-   물론 이 방법은 하위 경로를 가지는 경우에는 적용되지 않는다. `도메인/path_1/path_2`의 경우에는 `path_1//404.js`, `path_1//404.css`로 빌드되며, `도메인/path_4/path_5/path_6`의 경우에는 `path_4/path_5//404.js`, `path_4/path_5//404.css`로 빌드된다. `도메인/404.js`의 경로에 있기 때문에 `/404.js`, `/404.css`로 빌드된다.
-   참고로, entry에서 chunk를 만들 때 css나 scss 파일을 지정하면, css를 불러오는 기능을 가진 js 파일의 청크가 만들어진다.

```js
// other settings...
const config = {
    entry: {
        // other chunks settings...
            import: [
                "/src_study/css/404.scss",
            ],
            filename: "/404.scss",
    },
    // other options...
}
// other settings...
```

-   위와 같이 entry에 빌드되는 파일명을 지정하는 방법을 절대경로로 하는 방법을 생각해 볼 수 있는데, `filename` 옵션에는 상대경로만 지정 가능하다는 제약이 있어서 사용할 수 없는 방법이다.

#### 모든 경로를 절대 경로로 만들기

webpack.config.js

```js
// other settings...
const config = {
     output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    // other options...
}
// other settings...
```

-   위와 같이 `output` 속성에 `publicPath` 옵션을 '/'으로 설정해 주면 모든 청크 파일에 대해 절대경로로 로드하는 경로 설정이 된다.

### 예제 코드로 알아보기

webpack.config.js

```js
// other settings...
const config = {
    entry: {
        // other chunks settings...
        '/404': [
            "/src_study/css/404.scss"
        ]
    },
    // other options...
}
// other settings...
```

-   위의 코드는 output에 publicPath를 '/'을 주는 방식을 사용해도 된다. 청크명을 `/404`로 만드는 방식을 선택했을 뿐이다.

src_study/pages/404.html

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <div id="page_not_found_wrapper">
            <div id="page_not_found_contents">
                <div id="http_status">404</div>
                <div id="page_not_found_message">
                    The page you’re looking for can’t be found.
                </div>
            </div>
        </div>
    </body>
</html>
```

src_study/css/404.scss

```css
#page_not_found_wrapper {
    height: 98vh;
    display: flex;
    justify-content: center;
    align-items: center;

    #page_not_found_contents {
        text-align: center;

        #http_status {
            font-size: 50px;
        }

        #page_not_found_message {
            font-size: 30px;
        }
    }
}
```

webpack.config.js

```js
// other settings...
const config = {
    // other settings...
    plugins: [
        // other plugins...
        new HtmlWebpackPlugin({
            filename: '404.html',
            template: 'src_study/pages/404.html',
            chunks: ['/404'],
        }),
        // other plugins...
    ]
    // other settings...
}
// other settings...
```

-   entry에서 만든 청크명이 `/404`이므로 HtmlWebpackPlugin의 chunks 옵션에도 `'/404'`를 지정해 준다.
