## 여러 페이지 만들기

### HTML 파일 번들링 및 코드 변환

-   웹팩은 기본적으로 자바스크립트 파일을 변환 및 번들링한다. 기본적으로는 CSS나 HTML은 변환 및 번들링 대상이 아니다. 자바스크립트 파일만 웹팩으로 빌드를 한 후 빌드된 파일을 HTML에서 불러와서 사용한다. CSS도 빌드하지 않고 HTML에서 불러오는 방식으로 사용한다.
-   자바스크립트 파일을 번들링하고 자바스크립트 코드를 변환하는 기능을 제공하는 웹팩의 기본적인 기능을 확장한다. 확장 기능을 이용하여 자바스크립트 파일의 처리와 함께 CSS나 HTML도 함께 변환하거나 번들링을 해서 더 편하게 사용할 수 있다.

### 여러 페이지 만들기

-   지금까지는 프로젝트 루트 페이지의 `index.html` 페이지만 사용하였다. 여러 페이지를 설정하기 위한 방법을 알아보자.
-   `src_study/assets` 폴더 내에 `pages`라는 폴더를 만들어 여기에 html 파일을 저장하도록 하자.

### index.html 경로 조정

-   프로젝트 루트 경로의 `index.html`　파일을 `src_study/pages/index.html`으로 옮겨 보자. 이 때 `npx webpack serve`를 입력하면 `Module not found: Error: Can't resolve`라는 에러가 발생할 것이다.

```js
const config = {
  // 다른 설정 옵션들
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    // 다른 플러그인 설정들
  ],
  // 다른 설정 옵션들
};
```

-   `webpack.config.js` 파일에 `HtmlWebpackPlugin`을 사용한 위와 같은 코드가 있을 것이다. `template: "index.html"` 이외에 특별한 옵션을 지정하지 않았다. 이는 `webpack.config.js` 파일의 위치를 기준으로 `index.html` 파일을 메인 페이지로 한다는 의미를 가지고 있다. 특별한 옵션을 지정하지 않으면 메인 페이지 옵션으로 지정이 된다.
-   메인 페이지의 옵션으로 지정이 된다는 말은 `npx webpack serve`으로 dev 서버를 실행했을 때 `http://localhost:8080` 주소 뒤에 추가 PATH를 아무것도 지정하지 않았을 때 기본적으로 실행되는 페이지로 지정된다는 의미이다.
-   `template: "index.html"`로 설정된 템플릿 경로를 `template: 'src_study/pages/index.html'`으로 바꾸어 보자. 그러면 `src_study/pages/index.html` 경로의 html이 메인 페이지에 표시된다.

### 페이지 추가하기

```js
const config = {
  // 다른 설정 옵션들
  plugins: [
    new HtmlWebpackPlugin({
      template: "src_study/pages/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "subpage.html",
      template: "src_study/pages/subpage.html",
    }),
    // 다른 플러그인 설정들
  ],
  // 다른 설정 옵션들
};
```

-   새로운 페이지를 추가하는 방법은 `plugins`에 `new HtmlWebpackPlugin()`와 같이 `HtmlWebpackPlugin` 설정을 추가하는 것이다.
-   `HtmlWebpackPlugin` 설정을 할 때 `filename` 옵션은 dev 서버에서 실행을 할 때의 URL의 PATH에 해당한다. dev 서버에서 `template: "src_study/pages/subpage.html"`으로 생성된 웹 페이지로 접근하려면 `filename` 옵션으로 지정한 PATH를 포함한 `http://localhost:8080/subpage.html`으로 접근할 수 있다.
-   `filename`이 없는 경우 메인 페이지로 설정이되며 추가 PATH 없이 `http://localhost:8080`으로 접근할 수 있다. `index.html`가 현제 메인 페이지로 설정되어 있다.

### 접속 경로에 `.html` 지우기
- 브라우저는 웹 페이지를 표시하기 위해 서버 컴퓨터의 공유 폴더의 html 파일에 접근하여 html 파일을 다운로드 한 후 내부 코드를 해석하여 브라우저의 화면을 만든다.
- html 파일을 다운로드 해야 하므로 URL의 경로에는 공유 폴더의 html 파일 경로를 지정해 줘야 한다. 따라서 브라우저에서 html 파일에 접근하기 위해서는 공유 폴더의 파일을 가리키는 마지막이 .html으로 끝나는 경로를 적어 줘야 한다.
- 하지만 대부분의 웹 사이트에서는 .html으로 끝나지 않는 경로를 사용하는데, 이는 파일 경로를 지정하지 않고 폴더의 경로를 지정하면 지정된 폴더 안의 index.html 파일을 자동으로 접근하는 기능이 제공되기 때문이다.

```js
const config = {
  // 다른 설정 옵션들
  plugins: [
    new HtmlWebpackPlugin({
      template: "src_study/pages/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "subpage/index.html",
      template: "src_study/pages/subpage.html",
    }),
    // 다른 플러그인 설정들
  ],
  // 다른 설정 옵션들
};
```
- URL의 루트 경로의 index.html 파일에 도메인명으로 접근가능한 것도 도메인 뒤에 아무 경로도 적지 않으면 서버 컴퓨터의 공유폴더를 가리키는 것이 되고 공유 폴더 자식 파일들 중에서 index.html으로 자동접근하기 때문이다.
- 위의 예제코드와 같이 `subpage.html`을 `subpage/index.html`으로 써 주면 `subpage` 폴더의 자식 파일로 `index.html` 파일이 생성되고, 브라우저가 URL로 `subpage` 경로의 폴더를 접근하게 되면 해당 폴더의 자식 파일에서 index.html으로 자동으로 접근하기 때문에 `http(s)://도메인/subpage.html`으로 접근하는 주소를 `http(s)://도메인/subpage`으로 접근하게 바꿀 수가 있다.
- 정적 사이트에서 이 원리를 몰라서 `.html` 경로의 주소를 사용하는 경우가 많은데 `.html` 없는 주소를 사용하여 어설프게 만들지 않도록 하자.

### 페이지에 자바스크립트 추가하기

-   HTML 파일에 자바스크립트를 로드하는 `script` 태그가 없어도 dev 서버를 실행할 때나, `yarn run watch` 또는 `yarn run build`를 사용하여 빌드된 HTML에는 웹팩에 지정된 자바스크립트 파일을 연결하는 `script` 태그가 자동적으로 생성이 된다.
-   그런데 `webpack.config.js` 파일의 `entry`에 지정된 모든 자바스크립트 파일이 자동적으로 HTML에 연결이 되기 때문에 `HtmlWebpackPlugin`으로 함께 생성되는 HTML 모두에 똑같은 자바스크립트 파일이 로드된다. HTML 파일에 따라 사용하는 자바스크립트를 다르게 불러오도록 세팅하기 위해서는 모두 똑같은 자바스크립트 파일을 불러오는 문제를 해결할 필요가 있다.
-   먼저 `src_study/js`라는 폴더를 만들자. `index.js` 파일과 `sub.js`란 파일을 만들고 각각의 파일에 `console.log('run index.js javascript')`, `console.log('run sub.js javascript')`이란 코드를 적어 두자.
-   `webpack.config.js` 파일의 entry 설정에 위에서 생성한 자바스크립트 파일을 대상으로 지정하자.

```js
const config = {
  entry: {
    index: ["./src_study/js/index.js"],
    sub: ["./src_study/js/sub.js"],
  },
  // 나머지 설정들
};
```

-   먼저 위의 상태로 dev 서버로 연 웹 페이지로 접근 해서 브라우저의 console 창을 확인 해 보자.
-   메인 페이지에서 확인을 했을 때도 `index.js`의 코드와 `sub.js`의 코드가 실행되는 것을 확인할 수 있다. (console 창에 `run index.js javascript` 와 `run sub.js javascript`가 뜨는 것을 확인할 수 있다.) 또한 웹 주소에 PATH를 추가하여 `/subpage.html` 경로의 페이지에서도 확인을 해도 `index.js`의 코드와 `sub.js`의 코드가 실행되는 것을 확인할 수 있다.
-   웹팩에서 `entry`에 대상으로 지정한 모든 자바스크립트 파일들이 모든 템플릿에 주입된 것을 확인할 수 있다.
-   페이지를 실행하는데 있어서 불필요한 자바스크립트 코드를 실행하는 것은 기대하지 않은 동작을 유발할 가능성이 있기 때문에 가능한 페이지에 맞춤으로 된 자바스크립트 코드를 실행하는 것이 좋다.
-   따라서 각각의 HTML 파일에는 서로 다른 자바스크립트 파일이 실행되도록 만드는 것이 필요하다.

```js
const config = {
  // 다른 설정 옵션들
  plugins: [
    new HtmlWebpackPlugin({
      template: "src_study/pages/index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "subpage.html",
      template: "src_study/pages/subpage.html",
      chunks: ["sub"],
    }),
    // 다른 플러그인 설정들
  ],
  // 다른 설정 옵션들
};
```

-   각각의 웹 페이지에 서로 다른 자바스크립트 파일을 로드하기 위해서는 `chunks`라는 옵션을 사용한다.
-   만약 `chunks`라는 옵션을 사용하지 않으면 해당 `html` 파일은 `entry`에 지정된 모든 자바스크립트 파일을 로드하게 된다. `chunks` 옵션을 지정하면 지정된 자바스크립트 파일만 로드하게 된다.
-   `chunks` 옵션은 보통 반드시 배열 값을 사용해 주어야 하며, 배열 안에는 `entry`에서 지정된 산출물의 이름을 문자열로 나열하여 적어 준다. 예를 들어 `./src_study/js/index.js`란 자바스크립트 파일은 `entry`에서 `index`로 이름 붙여졌기 때문에 `chunks`의 배열에 `'index'`란 명칭으로 나열해 줘야 하며, `./src_study/js/sub.js`는 entry`에서 `sub`로 이름 붙여졌기 때문에 `chunks`의 배열에 `'sub'`란 명칭으로 나열해 주어야 한다.
-   dev 서버에서 메인 페이지를 실행하면 `index.js`의 코드만 실행이 되고 `sub.js`의 코드가 실행되지 않는 것을 확인할 수 있다. (브라우저 콘솔창에 `run index.js javascript`만 나온다.) 또한 `/subpage.html` 페이지를 접속하면 `sub.js`의 코드만 실행이 되고 `index.js`의 코드는 실행되지 않는 것을 확인할 수 있다. (브라우저 콘솔창에 `run sub.js javascript`만 나온다.)
-   만약 `entry`에 지정된 모든 자바스크립트 파일을 로드하되 지정한 몇몇 자바스크립트 파일만을 제외하고 싶다면 `excludeChunks` 옵션을 사용하면 된다.

```js
new HtmlWebpackPlugin({
    filename: "subpage.html",
    template: "src_study/pages/subpage.html",
    // chunks: ["sub"],
    excludeChunks: ["index"],
}),
```

-   현재 entry에 지정된 자바스크립트는 `index`와 `sub` 뿐이므로 `chunks: ["sub"]` 부분을 `excludeChunks: ["index"]`로 바꾸어도 `index.js`는 실행되지 않고 `sub.js`만 실행되는 것을 확인할 수 있다.
