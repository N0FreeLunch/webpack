## 웹 서버

### entry 다시 설정하기

webpack.config.js

```js
const config = {
  entry: {
    index: ["./src/index.js", "./src/css.js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  // 나머지 설정들
};
```

- entry에 복잡한 설정이 필요없기 때문에 일단은 위와 같이 설정을 하자.

### dev 서버 실행하기

- 프로젝트 루트 위치의 CLI에서 다음 명령을 실행하자.

```
npx webpack serve
```

- 그럼 다음과 같은 메시지가 나온다.

```
<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:8080/, http://127.0.0.1:8080/
```

- 서버가 실행된 로컬 주소 `http://localhost:8080/` 또는 `http://127.0.0.1:8080/`으로 접속을 하면 프로젝트 루트 폴더의 `index.html` 파일 안의 코드가 실행되는 것을 알 수 있다.

### dev 서버는 빌드된 파일이 아니다.

- `yarn run watch` 또는 `yarn run build` 명령어를 실행하면, `webpack.config.js` 파일의 `config` 설정의 `output` 옵션에 설정한 `dist` 폴더에 `index.html` 파일과 `index.js` 파일이 생긴다.
- `dist` 폴더를 삭제한 후에 `npx webpack serve`로 서버를 실행해 보자. 삭제된 `dist` 폴더는 다시 생성되지 않으며 폴더 내에 빌드된 파일이 존재하지 않는다. 이는 dev 서버를 실행하는 것은 파일을 빌드하는 것과 다름을 알려 준다. 또한 dev 서버는 정상적으로 실행된다. 이는 빌드된 파일이 필요하지 않음을 알려 준다.

### html에 자바스크립트 연결하기

- `index.html` 파일을 보자. 자바스크립트를 불러오는 스크립트 태그가 존재하지 않는다.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Webpack App</title>
  </head>
  <body>
    <h1>Hello world!</h1>
    <h2>Tip: Check your console</h2>
  </body>
</html>
```

- `html`에서 자바스크립트를 실행하려면 `html` 안에 `<scipt> /* 실행하고자하는 자바스크립트 코드*/ </script>`를 넣어 주어야 한다. 또는 외부의 자바스크립트 파일을 `<script src="자바스크립트/파일/경로/파일명.js"></script>`으로 외부의 자바스크립트 파일을 불어올 수 있도록 태그를 세팅해 주어야 브라우저에서 html 파일을 로드할 때 `script` 태그가 실행이 되면서 자바스크립트가 실행된다.
- `index.html` 파일을 보면 `script` 태그가 없으므로 자바스크립트 코드가 실행이 되지 않을 것이다. 실제로 브라우저에서 파일 경로로 실행을 하면 (비주얼 스튜디오 코드를 사용한다면 더블 탭 또는 오른쪽 클릭으로 `preview default browser`를 클릭해서 브라우저에서 파일 경로로 열 수 있다.) 자바스크립트가 실행되지 않는 것을 확인할 수 있다.
- 하지만 dev 서버로 열게 되면, `script` 태그가 없더라도 `webpack.config.js`에서 지정한 자바스크립트 파일이 자동으로 `html`에 주입되어 자바스크립트가 실행된다.

```js
const config = {
  entry: {
    index: [
      "./src/index.js",
      // "./src/css.js"
    ],
  },
  // 나머지 설정들
};
```

- 위의 코드에서 자바스크립트 파일을 하나 빼 보자. (`"./src/css.js"` 파일을 주석처리 했다.)
- CLI에서 서버를 종료하고(Ctrl + C) `npx webpack serve`으로 서버를 다시 실행하고 브라우저에서 확인을 하면 뺀 자바스크립트 파일의 코드가 빠진 것을 알 수 있다.
- `yarn run watch` 또는 `yarn run build`로 빌드를 할 때도 `index.html`에 `script` 태그가 없어도 자동으로 추가되는 것을 알 수 있는데, 빌드를 하면 `dist/index.html`, `dist/index.js` 파일이 생성되는데 `dist/index.html`를 보면 아래와 같이 `<script defer src="index.js"></script>`라는 태그가 주입되어 만들어진 것을 확인할 수 있다.

```js
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Webpack App</title>
    <script defer src="index.js"></script></head>
    <body>
        <h1>Hello world!</h1>
        <h2>Tip: Check your console</h2>
    </body>

</html>
```
