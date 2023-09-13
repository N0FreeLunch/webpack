## 브라우저 캐싱

-   캐싱이란 어떤 작업을 할 때 한 번 수행한 작업은 저장을 하는 것을 뜻한다.
-   캐싱은 저장을 통해 다음에 작업을 수행할 때 작업에 드는 리소스를 줄이기 위한 목적으로 사용된다.
-   다양한 작업에 캐싱이란 개념이 사용되지만 여기서는 브라우저가 서버로 부터 가져오는 파일을 캐싱하여, 다음에 서버에 접속할 때 동일한 이름의 파일은 서버에서 다시 다운로드 받지 않고, 브라우저에 저장되어 있는 파일을 사용하는 캐싱을 다룬다.

### 브라우저에서 캐싱을 사용하는 이유

-   브라우저는 서버의 파일을 화면에 보여주기 위해 서버에서 파일을 다운 받고, 다운 받은 파일에 담긴 코드를 해석하여 브라우저에 띄운다. 서버에서 브라우저로 파일을 다운로드 하는 것은 시간이 걸리는 작업이다.
-   웹 화면은 가능한 빠르게 로딩이 되어 유저의 브라우저 탐색 경험을 향상 시키는 것은 중요한 일이다. 이미 다운로드 받은 파일은 다시 다운로드 하지 않고 바로 보여주는 방식을 사용하면 유저의 브라우저 사용 경험을 향상 시킬 수 있기 때문에 기본적으로 브라우저는 캐싱을 적극 활용하는 방식을 사용한다.
-   또한 네트워크는 불안한 경우가 많다. 열차를 타고 가다가 기지국의 통신 범위를 잠시 벗어날 수도 있고, 서버에 장애가 날 수도 있다. 이럴 때 브라우저가 파일을 캐싱해 놓고 있다면 일부 파일의 다운로드에 장애가 있을 때 캐싱된 데이터를 사용하여 어느 정도는 화면이 움직이는 동작을 할 수 있다.
-   하지만 항상 브라우저가 동일한 파일을 보내는 건 아니다. 같은 url을 가진 파일이라도 내부의 데이터가 바뀐 파일을 보낼 수도 있다. 따라서 이런 데이터의 변경에 의존하지 않는 css, js, img, font 등의 파일에 대해서는 브라우저가 캐싱을 적극적으로 하지만 계속적으로 데이터가 변하는 html 이나 json 등의 결과물에 대해서는 캐싱을 하지 않는 경향이 있다.

### 캐싱을 사용하지 말아야 하는 경우

-   다운로드 할 정적 파일이 변경되는 경우 브라우저의 캐시 정책으로 인해서 변경된 파일을 서버에서 다운받지 않는 경우가 있다.
-   새로 배포를 했는데도 웹 사이트의 화면이나 기능에 변경이 없는 경우가 생길 수 있는데, 브라우저가 서버에서 새롭게 파일을 다운로드 받지 않고, 저장되어 있는 파일을 사용했기 때문이다.
-   브라우저의 캐시를 무효화하는 방법으로는 크롬 브라우저의 경우, 개발자도구(inspect, development tools) -> 네트워크(network) -> Disable Cache의 체크 박스를 체크하고 개발자 도구를 켠 상태로 페이지 리로드를 하는 것이다.
-   하지만, 일반 유저는 크롬 브라우저의 이러한 기능을 잘 활용할 수 없기 때문에, 사용자 측에서 특별한 조작을 하지 않아도 사이트의 변경이 일어난 이후에는 브라우저의 캐싱된 데이터를 이용한 웹 화면이 아니라 갱신된 사이트가 보이도록 해야 한다.

### 브라우저의 캐싱 무효화 방법

-   브라우저는 URL이 동일한 대상에 대해 캐싱을 한다. 따라서 사이트 배포 때마다 동일한 파일에 대해서는 URL을 조금씩 바꾸어주면 URL이 같지 않으므로 캐싱을 하지 않고 새롭게 다운로드를 한다. URL의 변경을 통해서 사이트 유저는 직접 브라우저에서 캐시를 무효화하기 위한 조작을 하지 않아도 갱신된 사이트를 볼 수 있다.
-   URL을 바꾸기 위해서는 서버의 공유폴더에서 파일명이나 파일의 경로를 바꿔야 할까? 이러면 매번 사이트를 갱신할 때마다 코드가 변경된 파일의 저장 위치를 바꿔야 하는 불편함이 생긴다. 파일의 저장 위치를 변경하지 않고 url을 바꾸는 방법이 있는데 쿼리스트링 또는 쿼리파라메터라고 불리는 값을 붙여주는 것이다.
-   동일한 파일명이나 파일경로를 가진 URL이라도 쿼리스트링이 서로 다르면 브라우저는 서로 다른 url로 인식한다.

```
https://github.com/search?q=webpack&type=repositories
```

-   위의 url에서 `?` 뒤에 나오는 코드가 쿼리스트링에 해당한다.
-   쿼리란 질의어란 의미이다. 클라이언트(브라우저에 로딩된 웹 사이트)는 쿼리스트링을 통해서 서버에 다양한 옵션 값을 전달할 수 있고, 서버는 쿼리스트링이 요구하는 대로 결과 값을 보여준다.
-   위의 예에서는 검색어를 지정하는 `q`에 `webpack`이란 값을 넣었고, 어떤 대상들을 검색할지를 지정하는 `type`에 `repositories`을 넣었다. 깃허브에서 리포지토리 중에서 웹팩과 관련되어 있는 대상을 검색하라는 쿼리를 가지고 있는 쿼리 스트링이다.
-   키 `q`에 대응하는 값으로 `webpack`이, 키 `type`에 대응하는 값으로 `repositories`가 들어간 형태이다.
-   `q`라는 변수에 `webpack`라는 값이 들어갔다고 볼 수도 있어서 쿼리 파라메터라고 부르기도 한다.

### 웹팩을 사용하여 캐시 무효화하기

-   웹팩에서는 빌드되는 파일명이나 파일 경로를 매번 변경하는 방법 뿐만 아니라, url 뒤에 쿼리스트링을 붙이는 방법 모두를 사용할 수 있다.