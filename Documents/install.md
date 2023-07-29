## 설치하기

```
npm install @webpack-cli/generators --save-dev
```

- 웹펙만을 설치하는 방법도 있지만, 위의 명령어를 사용해서 웹팩을 설치하면 웹팩에서 잘 쓰이는 플러그인을 함께 설치하는 방법을 제공한다.

```
npx webpack-cli init
```

- 웹펙의 초기 설정을 하면서 기본 플러그인을 자동으로 설치해 보자.
- 위 명령어로 웹팩을 설치할 때 몇 가지 웹팩에서 사용되는 유명한 플러그인 또는 설정을 사용할지를 묻는다.

> ? Which of the following JS solutions do you want to use? ES6

- none, ES6, typescript 중에서 무엇을 사용할지를 묻는다. 익스플로러의 종말을 맞은 시기에 ES6 이전의 자바스크립트를 사용할 필요는 없기 때문에 ES6를 선택하면 된다. 타입스크립트의 기본 설정을 하고 싶은 경우에는 타입스크립트를 선택하면 된다.

> ? Do you want to use webpack-dev-server? Yes

- 웹팩 개발 환경을 서버로 만들어 실행한다는 의미이다. 리액트와 비슷하게 로컬에서 서버로 개발을 할 수 있다. 자바스크립트 변경과 동시에 브라우저에 반영이 되는 핫 모듈 리로딩과 같은 기술을 사용할 수 있다.

> ? Do you want to simplify the creation of HTML files for your bundle? Yes

- HTMLWebpackPlugin라는 웹팩 플러그인을 사용하여 HTML 파일도 함께 번들링하는 기능을 제공한다.
- 웹팩을 사용할 때 JS, CSS, IMG 파일등이 해시화 되는 옵션을 사용할 때가 있는데 HTML 파일이 번들링 되면 해시화 파일명을 연결하는 링크를 자동 생성한 HTML 파일을 만들어 준다.
- 일반적으로는 HTML 파일도 함께 번들링하는 방식으로 사용하므로 yes를 체크한다.

> ? Do you want to add PWA support? No

- 기본적으로 브라우저는 HTML을 서버에서 받아 온 후, HTML 안에 있는 CSS와 JS 파일을 서버에서 받아와서 웹 페이지를 실행한다.
- PWA 기능은 HTML과 CSS, JS 등의 파일을 미리 다운 받아 놓고 다음 실행에는 서버에서 CSS와 JS를 받아오지 않는 방식을 활용하여, 초기 로딩에 페이지를 실행하기 위해 파일을 다운로드하지 않고 바로 실행할 수 있기 때문에 속도가 빠르며, 서버 접속 없이도 웹 페이지를 실행하도록 한다. 물론 서버에서 전달될 때마다 변화되는 데이터는 별도로 받아야 하기 때문에 데이터를 받지 않는 방식으로 만든 사이트가 아니라면 페이지의 HTML, CSS, JS가 미리 로컬에 다운로드 된 파일이 실행이 되더라도 서버 데이터 의존성으로 인해 화면이 제대로 실행되지 않을 수 있다.
- 예를 들어 유튜브나 유튜브 뮤직을 사용하면 브라우저에서 실행하지 않고 어떤 파일 아이콘으로 웹을 실행하는 기능을 제공한다. 주소창의 주소 변경이나 탭열기 브라우저의 각종 메뉴에 접근할 수 있는 기능이 차단된 브라우저를 실행하는데 이것이 PWA 기술을 활용하여 만들어진다.
- 일반적인 웹 사이트를 만들 때는 사용하지 않는 기능이기 때문에 No으로 세팅을 한다.

> ? Which of the following CSS solutions do you want to use? SASS

- CSS와 관련된 기술 중에서 무엇을 사용할지를 선택한다.
- 옵션으로는 none, CSS only, SASS, LESS, Stylus가 있다. none은 CSS 관련 세팅을 자동으로 하지 않는 것이고, CSS only는 CSS 파일만을 사용할 수 있도록 한다. SASS와 LESS, Stylus가는 CSS에 좀 더 편리한 문법을 입히는 기술인데, 보통은 SASS를 많이 사용한다.

> ? Will you be using PostCSS in your project? No
