### 이미지 파일 넣기

- HTML에 이미지 파일을 넣어보자.
- 우선 이미지 파일을 넣는 `src/assets/img` 경로에 [`icon-square-big.svg`](https://webpack.js.org/assets/icon-square-big.svg)의 파일을 저장하자.

### 이미지 파일의 주소

- 컴퓨터가 다른 컴퓨터에게 파일 및 폴더를 공유하는 시스템을 갖는 것을 서버라고 한다.
- 한 컴퓨터가 다른 컴퓨터에 접근을 할 때는 IP 주소 또는 도메인(예를 들어 http://github.com)을 사용하여 접근한다. 그러면 접근하려는 컴퓨터가 공개한 폴더 또는 파일에 접근을 하게 된다.
- 웹은 다른 컴퓨터의 공개 폴더 내의 HTML 파일을 다운로드 받아서 브라우저가 HTML 파일의 코드를 해석해서 보여주는 것이다.
- HTML안에서 `img` 태그가 어떤 경로를 가리키고 있다고 하자. 그러면 해당 경로의 이미지 서버에서 다운로드를 받아야 브라우저가 이미지를 보여 줄 수 있다.
- 기본적으로 컴퓨터의 공개폴더의 하위폴더 또한 공개가 되어 있다. 그리고 하위 폴더는 슬레쉬(`/`) 기호를 통해 접근을 할 수 있다.
- `npx webpack serve`로 dev 서버를 실행해 보자. 그럼 도메인은 `http://localhost:8080/`으로 되어 있을 것이다. 이 경로는 로컬 컴퓨터의 어떤 폴더를 공개한 것과 같다고 생각하면 된다. 물론 `npx webpack serve`으로 실행한 서버는 가상의 공개 폴더를 만들기 때문에 실제 폴더가 아니다.
- 만약 `공개폴더/assets/img` 폴더의 하위에 `icon-square-big.svg`라는 이미지 파일이 있다고 하자. 그러면 이 이미지를 도메인에서 접근하려면, 도메인이나 IP가 공개폴더를 가리키므로 `http://localhost:8080/assets/img/icon-square-big.svg`의 주소로 접근하면 이미지 파일에 접근을 할 수 있다.
- 현재 `index.html`이 웹에서 서빙되는 주소는 `http://localhost:8080`이다. 그런데 이것은 로컬 서버의 도메인이며, 실제 서버에서는 다른 도메인(예를 들어 `http://N0FreeLunch.github.io`)을 갖는다. 따라서 이미지 파일의 경로를 `http://localhost:8080/assets/img/icon-square-big.svg`와 같이 로컬 서버의 도메인 주소를 기준으로 이미지 파일의 경로를 설정하게 되면 실제 프로덕션 서버에 올라갔을 때는 도메인이 바뀌게 되므로 사용할 수 없는 주소가 된다. 따라서 이미지 파일의 경로는 공개 폴더 기준의 주소가 되거나 상태 주소가 되어야 한다.

### 공개 폴더 기준의 주소

#### 절대 경로

- 절대 경로는 경로의 시작이 `/`으로 시작한다는 특징이 있다. 경로를 `/`으로 시작한다는 것은 최상단의 경로에서 시작한다는 것을 의미한다.
- 예를 들어 맥북의 CLI에서 `pwd`라고 입력을 하면 `/Users/유저명/dev/프로젝트폴더`와 같은 경로가 나올 것이다. 이 경로는 CLI 명령어를 입력하는 경로에 따라 다르지만 맥 OS에서 폴더 경로는 최상단 `/`를 기준으로 경로를 표시한다. 이 최상단 폴더는 윈도우즈 OS에서 C 드라이브나 D 드라이브와 같은 하드(좀 더 정확히는 파티션) 공간을 의미한다고 보면된다.
- 또 다른 예로 `src/pages/index.html` 파일을 'preview in default browser'로 실행하면 `/Users/유저명/dev/프로젝트폴더/src/pages/index.html` 경로의 파일이 열리게 된다.
- `/`으로 시작하는 경로는 최상단 폴더를 의미하며, 최상단 폴더를 기준으로 파일이나 폴더 경로를 나타내는 것을 '절대 경로'라고 부른다.

#### 웹 서버에서의 최상단 폴더

- 웹 서버는 IP나 도메인을 통해서 컴퓨터에서 제공하는 공개 폴더에 접근한다. 이 때는 공개 폴더가 최상단 폴더가 된다.
- `공개폴더/assets/img/icon-square-big.svg`에 이미지 파일이 있을 경우, 웹 서버 주소로는 `/assets/img/icon-square-big.svg`가 이미지의 주소가 되고, 이는 맨 처음의 경로가 `/`으로 시작했기 때문에 절대경로이다.
- `/Users/유저명/dev/프로젝트폴더/src/assets/img/icon-square-big.svg`와 `/assets/img/icon-square-big.svg`는 똑같은 절대경로이지만 컴퓨터의 파일 및 폴더의 절대 경로와 공개 폴더를 기준으로 한 절대 경로라는 차이가 있다.

### 상대 경로 기준의 주소

#### 상대 경로

- 상대경로란 현재 접근하고 있는 경로를 기준으로 또는 어떤 파일을 기준으로 어떤 경로에 위치하는지를 표시한다. 절대경로가 `/`으로 시작하는 것과 달리 상대 경로는 `./` 또는 `../`으로 시작한다. `.`은 현재 폴더를 의미하며, `..`은 한 단계 상위의 폴더를 의미한다.
- 예를 들어 `src/pages/index.html` 파일을 기준으로 이미지 파일은 상위 폴더의 `assets` 폴더 하단의 `img` 폴더 하단의 `icon-square-big.svg` 파일이므로 상대 경로로 표기하면 `../assets/img/icon-square-big.svg`가 된다.
- `index.html` 파일에 다음과 같은 상대 경로 주소를 넣고 파일 경로로 실행을 하는 'preview in default browser'를 실행해 보자. 그럼 이미지가 브라우저에 표기 될 것이다.

```html
<img src="../assets/img/icon-square-big.svg" />
```

- `/Users/유저명/dev/프로젝트폴더/src/pages/index.html`의 파일이 브라우저에서 실행이 되었기 때문에 `../`는 `/Users/유저명/dev/프로젝트폴더/src/pages/` 경로가 되고, `../assets`는 `/Users/유저명/dev/프로젝트폴더/src/pages/assets` 경로가 되며, `../assets/img/icon-square-big.svg`는 `/Users/유저명/dev/프로젝트폴더/src/pages/assets/img/icon-square-big.svg` 경로에 해당하는 식이다.

#### 웹 서버에서의 상대 경로

- `http://localhost:8080`으로 접속을 하면 `index.html`으로 접근을 한다. 이는 `index.html` 파일이 공개 폴더에 존재한다는 의미와 동일하다. 그러면 `index.html`에서 이미지 파일로 접근하기 위해서는 `index.html`을 표시하는 주소인 `http://localhost:8080`을 기준으로 `./assets/img/icon-square-big.svg`가 상대 경로 기준의 주소가 된다.
- 예를 들어 `http://localhost:8080/test/index.html`이라고 해 보자. 이 때 이미지의 상대 주소는 실행된 경로가 `test` 폴더이므로 `../`으로 `test`` 폴더 상단의 공개 폴더로 가서 경로를 적어 주어야 한다. 따라서 위 주소를 기준으로 보았을 때는 `../assets/img/icon-square-big.svg`가 상대 경로가 된다.

#### 웹팩에서의 경로

- 웹팩에서 주의할 점은 코드를 개발할 때의 경로와 dev 서버를 열거나 빌드를 했을 때의 경로가 다르다는 것이다.
- `webpack.config.js`에서 `HtmlWebpackPlugin`을 이용하여 `html` 파일을 번들링 대상에 포함하였다. 이때 `filename`과 `template`라는 옵션을 설정하는데 `filename`은 dev 서버를 열거나 빌드를 했을 때의 URL 경로를 설정하는 부분이고, `template`는 개발하는 `html` 파일의 파일 경로이다. 개발하는 `html`의 파일 경로와 웹 서버 또는 빌드 했을 때의 URL 경로가 다른 것이다.
- 실제 프로덕션 서버에 반영할 때는 `yarn run build`로 빌드된 파일이 위치하는 `dist` 폴더를 그대로 공개 폴더로 하거나 복사하여 공개폴더로 지정한다. 이때는 빌드된 파일 및 폴더는 개발하는 파일 및 폴더가 아니라 웹팩에서 설정한 경로를 갖게 된다. `html` 파일이라면 `HtmlWebpackPlugin`의 `filename`에 설정한 경로가 된다.
- 따라서 파일 경로를 생각해서 개발하면 안 되고, 빌드된 결과물과 최대한 비슷한 환경을 갖는 로컬 서버에서의 경로를 기준으로 개발해야 한다.
