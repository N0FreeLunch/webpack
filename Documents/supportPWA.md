## PWA

- 오프라인일 때 앱이 동작할 수 있도록 하는 기능이다.
- 오프라인일 때 앱이 동작하게 한다는 것은 HTML, JS, CSS를 별도로 다운로드 받지 않고, 로컬에 저장한 HTML, JS, CSS 파일을 사용해 앱을 동작시킨다는 의미이다.
- 따라서 data를 가져오기 위한 fetch 작업에 의존하는 애플리케이션일 경우, 오프라인일 때 데이터를 가져오지 못한다거나 데이터의 부족으로 화면이 제대로 랜더링되지 않을 수 있다.
- 기본적인 설정과 레이아웃이 미리 저장된 HTML, CSS, JS에 의해 충분히 동작되도록 만들었다면 데이터의 fetch 실패로 인해 화면의 디자인이 이상하게 변하지는 않을 것이다.
- 갑자기 인터넷의 연결이 끊어졌을 경우 새로고침을 하면 인터넷에 연결할 수 없다는 메시지가 뜨겠지만 PWA 설정이 되어 있다면 연결이 끊어져 있어도 미리 다운 받아 둔 HTML, JS, CSS 및 각종 캐쉬된 정보를 이용해서 페이지를 동작하게 만든다. 물론 실제 서버에서 직접 받아와야 하는 데이터에 의존하는 동작은 실행되지 않는다.

## 서비스 워커

- 브라우저에 로드된 자바스크립트로 서버를 여는 기술이다.
- 오프라인에서도 브라우저만 있다면 localhost와 같은 로컬 서버를 브라우저에서 열어 주기 때문에 실제 서버에 접속하지 않고도 서버에 접속하는 것과 유사한 환경을 오프라인에서 만드는 기능을 제공한다.

### PWA를 동작하기 위해 추가하는 스크립트

- PWA를 활성화하지 않았을 때의 HTML

  ```html
  <!DOCTYPE html>
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

- PWA를 활성화 했을 때의 HTML

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Webpack App</title>
    </head>
    <body>
      <h1>Hello world!</h1>
      <h2>Tip: Check your console</h2>
    </body>

    <script>
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register("service-worker.js")
            .then((registration) => {
              console.log("Service Worker registered: ", registration);
            })
            .catch((registrationError) => {
              console.error(
                "Service Worker registration failed: ",
                registrationError
              );
            });
        });
      }
    </script>
  </html>
  ```

- PWA 기능을 활성화하지 않았다면 `serviceWorker`에 관한 스크립트를 삭제해 주어도 무방하다.

---

## refer to the following

- https://webpack.kr/guides/progressive-web-application
- https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API
