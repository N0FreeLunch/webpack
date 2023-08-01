## 여러 CSS, JS 파일을 하나로 묶기

### 번들링

- 번들링이란 하드웨어 또는 소프트웨어와 같은 다양한 항목을 패키지로 함께 묶는 것을 의미한다.
- 웹팩은 기본적으로 브라우징을 하는데 필요한 파일(JS, CSS, 옵션에 따라 HTML ...)을 하나로 묶는 기술이므로 번들링 도구라고 부른다.
- 여러 번들링 도구 가운데 웹팩은 속도가 느린 편에 속한다. 하지만 가장 많은 기능을 가지고 있고, 가장 잘 알려진 기술이기 때문에 문제 해결이 상대적으로 쉽다는 장점이 있다. 속도가 빠른 번들링 도구들이 있지만 기능이 제한적이기 때문에 정해진 환경에서 주로 사용한다. 예를 들어 주로 vite('빗' 이라고 읽는다.)는 vueJS와 laravel에서 사용하며, turbopack은 레일즈 프레임워크에서 도입해서 사용하고 있다. 번들링 도구는 유명한 기술들을 대부분 지원하기 때문에 다른 번들링 도구로 대체할 수 있는 경우가 많다.

### 웹팩 옵션 설정 위치

webpack.config.js

```js
const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  // 나머지 설정들
};
```

### entry

#### 하나의 파일만 번들링 하기

- 웹팩으로 번들링할 대상 파일을 지정한다.

```js
entry: "./src/index.js",
```

- 위의 경우에는 `webpack.config.js` 파일을 기준으로 상대경로인 `./src/index.js` 파일을 번들링하겠다는 의미이다.
- `yarn run build` 명령을 CLI에 입력하면, 프로젝트 루트 디렉토리에 `dist` 폴더가 생기고 `main.js`란 파일이 생성되는 것을 확인할 수 있다.
- `dist.main.js` 내부를 보면, `src/index.js`와 동일한 `console.log("Hello World!");`란 코드가 들어 있는 것을 확인할 수 있다.

#### 여러개의 파일을 번들링하기

```js
console.log("CSS를 자바스크립트로 불러와 보자.");
```

- `./src/css.js` 라는 파일을 만들고 위의 코드를 넣어 보자.

```js
entry: [
        "./src/index.js",
        "./src/css.js"
    ],
```

- `entry`에 배열로 파일 경로를 나열하면 나열한 파일을 하나로 합쳐준다.
- `yarn run build`로 빌드된 파일인 `dist/main.js`를 보면 `console.log("Hello World!"),console.log("CSS를 자바스크립트로 불러와 보자.");`으로 `./src/index.js`의 코드와 `./src/css.js`의 코드가 들어 있는 것을 확인할 수 있다.

### 파일 이름을 붙여 번들링하기

```js
entry: {
    'index' : [
        "./src/index.js",
        "./src/css.js"
    ],
}
```

- `entry`에 리터럴 오브젝트를 할당하고, 할당한 리터럴 오브젝트 안에 생성될 파일명을 키로 하고(여기서는 `index`), 번들링 대상 파일을 키에 대응하는 벨류로 할당한다. (여기서는 `["./src/index.js", "./src/css.js"]`) 이때, 벨류를 배열이 아닌 문자열의 경로를 할당하면 여러 파일이 아닌 하나의 파일만 번들링 대상으로 한다.
- `yarn run build`라는 명령어를 사용하면, `dist/index.js`라는 파일이 만들어지며, 배열 안에 나열한 두 파일을 합친 코드를 갖는다.

### 빌드 옵션 추가하기

### entry 문법 살펴 보기

```js
string [string] object = { <key> string | [string] | object = { import string | [string], dependOn string | [string], filename string, layer string }} (function() => string | [string] | object = { <key> string | [string] } | object = { import string | [string], dependOn string | [string], filename string })
```

- `string` : 파일 경로를 문자열로 입력한다. 대상 경로의 파일은 웹팩에 의해 변환된다.
- `[string]` : 배열에 경로 문자열을 나열하여 나열된 경로의 파일을 묶어 하나의 파일로 번들링한다.
- `object = { <key> string | [string] | object = { import string | [string], dependOn string | [string], filename string, layer string }} ` : 오브젝트의 키(`<key>`)로는 `string` 문자열의 파일 경로, `[string]` 파일 경로를 문자열로 나열한 배열, `object = { import string | [string], dependOn string | [string], filename string, layer string }` 오브젝트를 할당가능하다. 내부 오브젝트 안의 `import` 키에는 `string` 문자열의 파일 경로, `[string]` 파일 경로를 문자열로 나열한 배열을 할당할 수 있으며, 내부 오브젝트 안의 `dependOn` 키에는 이 옵션을 가진 대상을 번들링 하기 전에 지정한 이름의 파일이 번들링되어 만들어지는지 확인하며 `string` 문자열로 의존하는 파일 경로 또는 `[string]` 의존하는 파일 경로 리스트를 배열으로 나열할 수 있다.
