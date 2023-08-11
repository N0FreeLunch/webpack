### 이미지 파일 넣기

- HTML에 이미지 파일을 넣어보자.
- 우선 이미지 파일을 넣는 `src/assets/img` 경로에 [`icon-square-big.svg`](https://webpack.js.org/assets/icon-square-big.svg)의 파일을 저장하자.

### 이미지 파일의 주소

- 컴퓨터가 다른 컴퓨터에게 파일 및 폴더를 공유하는 시스템을 갖는 것을 서버라고 한다.
- 한 컴퓨터가 다른 컴퓨터에 접근을 할 때는 IP 주소 또는 도메인(예를 들어 [http://github.com](http://github.com))을 사용하여 접근한다. 그러면 접근하려는 컴퓨터가 공개한 폴더 또는 파일에 접근을 하게 된다.
- 웹은 다른 컴퓨터의 공개 폴더 내의 HTML 파일을 다운로드 받아서 브라우저가 HTML 파일의 코드를 해석해서 보여주는 것이다.
- HTML안에서 `img` 태그가 어떤 경로를 가리키고 있다고 하자. 그러면 해당 경로의 이미지 서버에서 다운로드를 받아야 브라우저가 이미지를 보여 줄 수 있다. `<img src="https://webpack.js.org/assets/icon-square-big.svg" />`의 태그라면 `https://webpack.js.org/assets/icon-square-big.svg` 경로에서 이미지 파일을 다운로드 받아서 화면에 표시한다. (물론 브라우저에 표시하는 이미지는 다운로드 폴더에 다운로드되는 방식은 아니다. 브라우저 내부에서 임시로 파일을 저장하는 폴더에 저장된다.)
- 기본적으로 컴퓨터의 공개폴더의 하위폴더 또한 공개가 되어 있다. 그리고 하위 폴더는 슬레쉬(`/`) 기호를 통해 접근을 할 수 있다. 예를 들어 `https://webpack.js.org/`는 웹팩 서버의 공개 폴더에 연결되어 있다. 이 폴더의 `assets` 폴더로 접근하는 주소는 `https://webpack.js.org/assets`이며, `https://webpack.js.org/assets/icon-square-big.svg` 주소로 접근하는 것은 웹팩 서버의 공개 폴더 `assets` 내부의 `icon-square-big.svg` 파일을 브라우저가 다운로드하는 것을 의미한다.
- `npx webpack serve`로 dev 서버를 실행해 보자. 그럼 도메인은 `http://localhost:8080/`으로 되어 있을 것이다. 이 경로는 로컬 컴퓨터의 어떤 폴더를 공개한 것과 같다고 생각하면 된다. 물론 `npx webpack serve`으로 실행한 서버는 가상의 공개 폴더를 만들기 때문에 실제 폴더가 아니다. `yarn run build` 나 `yarn run watch`으로 빌드한 결과물이 있는 `dist` 폴더는 공개 폴더에 해당하므로 `dist` 폴더 경로에서 `python -m SimpleHTTPServer 9000` (python2의 경우) 또는 `python3 -m http.server 9000` (python3의 경우)로 서버를 열면 `dist` 폴더를 공개 폴더로 한 로컬 서버를 열 수 있다.
- 만약 `공개폴더/assets/img` 폴더의 하위에 `icon-square-big.svg`라는 이미지 파일이 있다고 하자. 그러면 이 이미지를 도메인에서 접근하려면, 도메인이나 IP는 서버 컴퓨터가 외부 컴퓨터에 공개한 공개 폴더를 가리키므로 `http://localhost:8080/assets/img/icon-square-big.svg`의 주소로 접근하면 `공개폴더/assets/img/icon-square-big.svg`의 파일 경로의 이미지 파일에 접근을 할 수 있다.
- 현재 `index.html`이 웹에서 서빙되는 주소는 `http://localhost:8080`이다. 그런데 이것은 로컬 서버의 도메인이며, 실제 서버에서는 다른 도메인(예를 들어 `https://webpack.js.org`)을 갖는다. 따라서 이미지 파일의 경로를 `http://localhost:8080/assets/img/icon-square-big.svg`와 같이 로컬 서버의 도메인 주소를 기준으로 이미지 파일의 경로를 설정하게 되면 실제 프로덕션 서버에 올라갔을 때는 도메인이 바뀌게 되므로 사용할 수 없는 주소가 된다. 따라서 이미지 파일의 경로는 공개 폴더 기준의 절대 경로의 주소(`/assets/img/icon-square-big.svg`)가 되거나 상대 경로의 주소(`./assets/img/icon-square-big.svg`)가 되어야 한다.

### 공개 폴더 기준의 주소

#### 절대 경로

- 절대 경로는 경로의 시작이 `/`으로 시작한다는 특징이 있다. 경로를 `/`으로 시작한다는 것은 최상단의 경로에서 시작한다는 것을 의미한다.
- 예를 들어 맥북의 CLI에서 `pwd`라고 입력을 하면 `/Users/유저명/dev/프로젝트폴더`와 같은 경로가 나올 것이다. 이 경로는 CLI 명령어를 입력하는 경로에 따라 다르지만 맥 OS에서 폴더 경로는 최상단 `/`를 기준으로 경로를 표시한다. 이 최상단 폴더는 윈도우즈 OS에서 C 드라이브나 D 드라이브와 같은 하드(좀 더 정확히는 파티션) 공간을 의미한다고 보면된다.
- 또 다른 예로 `src/pages/index.html` 파일을 'preview in default browser'로 실행하면 `/Users/유저명/dev/프로젝트폴더/src/pages/index.html` 경로의 파일이 열리게 된다.
- `/`으로 시작하는 경로는 최상단 폴더를 의미하며, 최상단 폴더를 기준으로 파일이나 폴더 경로를 나타내는 것을 '절대 경로'라고 부른다.

#### 웹 서버에서의 최상단 폴더

- 웹 서버는 IP나 도메인을 통해서 컴퓨터에서 제공하는 공개 폴더에 접근한다. 이 때는 공개 폴더가 최상단 폴더가 된다.
- `공개폴더/assets/img/icon-square-big.svg`에 이미지 파일이 있을 경우, 웹 서버 주소로는 `/assets/img/icon-square-big.svg`가 이미지의 주소가 되고, 이는 맨 처음의 경로가 `/`으로 시작했기 때문에 절대경로이다.
- `/Users/유저명/dev/프로젝트폴더/src/assets/img/icon-square-big.svg`와 `/assets/img/icon-square-big.svg`는 똑같이 `/`으로 시작하는 절대경로지만 컴퓨터의 파일 및 폴더의 절대 경로와 공개 폴더를 기준으로하는 웹 주소의 경로라는 차이가 있다.

### 상대 경로 기준의 주소

#### 상대 경로

- 상대 경로란 현재 접근하고 있는 경로를 기준으로 또는 어떤 파일을 기준으로 어떤 경로에 위치하는지를 표시한다. 절대경로가 `/`으로 시작하는 것과 달리 상대 경로는 `./` 또는 `../`으로 시작한다. `.`은 현재 폴더를 의미하며, `..`은 한 단계 상위의 폴더를 의미한다.
- 예를 들어 `src/pages/index.html` 파일을 기준으로 이미지 파일은 상위 폴더의 `assets` 폴더 하단의 `img` 폴더 하단의 `icon-square-big.svg` 파일이므로 상대 경로로 표기하면 `../assets/img/icon-square-big.svg`가 된다.
- `index.html` 파일에 다음과 같은 상대 경로 주소를 넣고 *파일 경로로 실행을 하는*(IP 또는 도메인으로에 `/` 경로가 붙은 웹 주소가 아니다.) 'preview in default browser'를 실행해 보자. 그럼 이미지가 브라우저에 표기 될 것이다.

```html
<img src="../assets/img/icon-square-big.svg" />
```

- `/Users/유저명/dev/프로젝트폴더/src/pages/index.html`의 파일이 브라우저에서 실행이 되었기 때문에 `../`는 `/Users/유저명/dev/프로젝트폴더/src/pages/` 경로가 되고, `../assets`는 `/Users/유저명/dev/프로젝트폴더/src/pages/assets` 경로가 되며, `../assets/img/icon-square-big.svg`는 `/Users/유저명/dev/프로젝트폴더/src/pages/assets/img/icon-square-big.svg` 경로에 해당하는 식이다.

#### 웹 서버에서의 상대 경로

- `http://localhost:8080`으로 접속을 하면 `index.html`으로 접근을 한다. 이는 `index.html` 파일이 공개 폴더에 존재한다는 의미와 동일하다. 그러면 `index.html`에서 이미지 파일로 접근하기 위해서는 `index.html`을 표시하는 주소인 `http://localhost:8080`을 기준으로 `./assets/img/icon-square-big.svg`가 상대 경로 기준의 주소가 된다.
- 예를 들어 `http://localhost:8080/test/index.html`이라고 해 보자. 이 때 이미지의 상대 주소는 실행된 경로가 `test` 폴더이므로 `../`으로 `test`` 폴더 상단의 공개 폴더로 가서 경로를 적어 주어야 한다. 따라서 위 주소를 기준으로 보았을 때는 `../assets/img/icon-square-big.svg`가 상대 경로가 된다.

#### 웹팩에서의 경로

- 웹팩에서 주의할 점은 코드를 개발할 때의 경로와 dev 서버를 열거나 빌드를 했을 때의 경로가 다르다는 것이다. 보통은 개발하는 파일은 `src` 폴더에서 이뤄지고 빌드한 파일은 `dist` 폴더에 배치된다. 그런데 `src` 폴더 안의 파일 및 폴더 배치는 `dist` 폴더 안의 파일 및 폴더 배치와 다를 수 있다.
- `webpack.config.js`에서 `HtmlWebpackPlugin`을 이용하여 `html` 파일을 번들링 대상에 포함하였다. 이때 `filename`과 `template`라는 옵션을 설정하는데 `filename`은 dev 서버를 열거나 빌드를 했을 때의 URL 경로를 지정하는 부분이고, `template`는 개발하는 `html` 파일의 파일 경로를 지정한다. 개발하는 `src` 폴더 내에서의 `html`의 파일 경로와 웹 서버 또는 빌드 했을 때의 `dist` 폴더 내에서의 URL 경로가 다른 것이다.
- 실제 프로덕션 서버에 반영할 때는 `yarn run build`로 빌드된 파일이 위치하는 `dist` 폴더를 그대로 공개 폴더로 하거나 복사하여 공개폴더로 지정한다. 이때는 빌드된 파일 및 폴더는 개발하는 파일 및 폴더가 아니라 웹팩에서 설정한 경로를 갖게 된다. `html` 파일이라면 `HtmlWebpackPlugin`의 `filename`에 설정한 경로가 된다. 예를 들어 `filename` 옵션에 `contact_us/contact_by_email.html`으로 설정했다면, `dist` 폴더에서 `contact_by_email.html` 파일은 `contact_us` 폴더 안에 있어야 한다.
- 따라서 개발할 때의 파일 경로를 생각해서 asset 파일을 불러와서는 안 되고, 빌드된 결과물과 최대한 비슷한 환경을 갖는 로컬 서버에서의 경로를 기준으로 개발해야 해야 빌드 후의 경로와 일치하게 된다.

### 빌드 결과물에 assets 복제의 필요성

- 웹팩에서는 개발하는 파일의 파일 경로와 달리 웹팩의 설정에 따라 웹 서버의 경로가 개발 환경의 파일 경로와는 다를 수 있다.
- 보통 `src` 폴더는 개발하는 파일이 위치하는 곳이며, `dist`는 빌드한 파일이 위치하는 곳이다. `src` 폴더의 하위 폴더는 파일 경로의 PATH 세그먼트 (슬레시(/)와 슬레시(/) 사이의 PATH 조각 이름)가 되지만, `dist` 폴더의 하위 폴더는 파일 경로뿐만 아니라 웹 서버 경로의 PATH 세그먼트 (슬레시(/)와 슬레시(/) 사이의 PATH 조각 이름)가 된다.
- 예를 들어 `src/pages/index.html`의 파일 경로는 빌드 후 (`HtmlWebpackPlugin`의 `filename` 설정에 따라 다르겠지만) `dist/index.html`의 위치에 빌드된다. 이는 `HtmlWebpackPlugin`에서 `src/pages/index.html` 파일의 웹 경로를 `/` 최상단으로 설정했기 때문에 (`filename` 옵션의 설정을 하지 않았을 때 디폴트로 최상단 폴더의 경로인 `/`로 지정된다.) 공개 폴더인 `dist`를 웹 주소로 접근을 할 때 `dist` 폴더 하단에 `index.html`이 위치해야 `http://localhost:8080/`으로 접근할 수 있기 때문이다. 만약 `dist/pages/index.html`으로 빌드 되었다면 `http://localhost:8080/pages` 또는 `http://localhost:8080/pages/index.html`으로 접근을 해야하게 되므로 `HtmlWebpackPlugin`의 웹 경로를 지정하는 `filename`를 무시하게 된다.
- `yarn run watch` 또는 `yarn run build` 명령어를 실행하면, `dist` 폴더에 빌드된 결과물이 생성된다. 파일 경로가 `dist/index.html`이면 웹 주소는 `http://localhost:8080/` 또는 `http://localhost:8080/index.html`이며, 파일 경로가 `dist/assets/img/icon-square-big.svg`이면 웹 주소는 `http://localhost:8080/assets/img/icon-square-big.svg`가 된다.
- `src/assets/img/icon-square-big.svg`에 위치시킨 이미지를 웹 서버에서 접근하기 위해서는 `dist/assets/img/icon-square-big.svg`에 위치해야 `http://localhost:8080/assets/img/icon-square-big.svg`으로 접근을 할 수 있다.
- css나 js에서 사용되는 이미지 파일은 웹팩으로 빌드 되면서 자동으로 `dist` 폴더에 이미지가 추가된다. 하지만, html 내에서 호출하는 이미지나 폰트와 같은 파일은 자동으로 빌드되어 `dist` 폴더에 추가되지 않는다. 따라서 웹팩으로 빌드할 때 `src/assets`의 폴더는 `dist/assets` 폴더로 복제 되어야 한다.
- 특별한 설정을 하지 않는 한 웹팩은 assets 폴더를 빌드된 결과물 쪽에 복제하지 않으므로 빌드시 복제가 되도록 설정 해 주어야 한다.

### 빌드 결과물에 assets 폴더 포함시키기

- 빌드 결과물에 `src/assets`의 assets 폴더를 복제하기 위해서는 [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin)라는 플러그인을 설치해야한다.
- 먼저 웹팩 플러그인 라이브러리를 추가 해 주어야 한다.

```
yarn add -D copy-webpack-plugin
```

webpack.config.js

```js
// 다른 라이브러리를 불러오는 코드
const CopyPlugin = require("copy-webpack-plugin");
// 다른 설정들
const config = {
  // 다른 설정들
  plugins: [
    // 다른 플러그인들,

    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
  ],
  // 다른 설정들
};
// 나머지 웹팩 코드
```

- 위와 같이 라이브러리를 불러와서 `CopyPlugin`이란 플러그인을 추가한다.
- 이때, `patterns` 옵션의 `from`은 복제할 대상 폴더, `to`는 빌드 폴더(여기서는 `dist`) 내의 폴더명을 입력한다.
- `{ from: "src/assets", to: "assets" }`의 의미는 `src/assets` 경로의 폴더를 `dist/assets` 폴더로 복제하겠다는 설정이다.
- `yarn run watch` 또는 `yarn run build` 명령어를 실행하면 `dist` 폴더 하단에 `src/assets` 폴더의 내용물과 동일한 `assets` 폴더가 생성되는 것을 확인할 수 있다.

### html에서 이미지 파일 불러오기

- `src/pages/index.html` 파일에 `<img src="/assets/img/icon-square-big.svg" />`라는 코드를 body 태그 안에 추가해 보자.
- 로컬 서버 또는 빌드한 결과를 확인하면 `copy-webpack-plugin`에 의해서 `dist` 폴더 내에 assets 파일이 복제되었기 때문에 정상적으로 이미지가 로드되는 것을 확인할 수 있다.

