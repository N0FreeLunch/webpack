## 에셋 모듈

-   에셋 모듈은 웹팩5에서 도입되었다. 이전(웹팩4)에는 에셋 모듈을 대신하는 용도로 raw-loader, url-loader, file-loader를 사용하였다. 에셋 모듈은 이 세 기능 모두를 통합하는 기능을 제공한다.

### 각 로더들의 역할

-   더 이상 사용되지는 않지만 이전에 사용한 로더들의 기능을 안다면 에셋 모듈이 담당하는 기능 또한 쉽게 파악할 수 있다.
-   raw-loader : 자바스크립트 모듈로 외부 파일을 불러서 파일의 내용을 문자열로 가져오는 기능이다. txt 파일이라면 내부 글을 그대로 자바스크립트 문자열로 가져올 수 있는 기능을 제공한다.
-   url-loader : 자바스크립트 모듈로 불러오는 외부 파일을 Base64 문자열의 포멧으로 변환하여 가져온다. (참고 : Base64란 영어 대소문자 및 숫자 기호(+ /)를 사용하여 값을 나타내는 것이다. 컴퓨터는 모든 데이터를 0과 1로 처리한다. 2진법의 데이터를 64개의 알파벳+기호를 통해서 나타내는 방식으로 2진법의 값을 64진법으로 바꾸는 방식을 의미한다.)
-   file-loader : 자바스크립트 모듈로 불러오는 외부 파일을 output으로 지정한 디렉토리에 생성한다.

### 에셋 모듈의 기능

-   에셋 모듈은 이전에 raw-loader, url-loader, file-loader의 기능을 대신하는 기능을 갖고 있다. 따라서 에셋 모듈도 3가지 방식의 기능을 제공한다.
-   `asset/resource` : 자바스크립트 모듈로 불러온 파일을 지정한 외부 폴더에 생성하고 생성된 대상의 주소(url)을 추출한다. (이전의 url-loader의 기능을 대신한다. 리소스 에셋은 url-loader와 달리 생성되는 파일의 이름을 해시값으로 변경하고 해시값으로 변경된 경로를 모듈로 대상을 불러올 때 반환값으로 갖는다.)
-   `asset/inline` : 자바스크립트 모듈로 불러온 파일을 자바스크립트에서 외부 파일을 로드하지 않고 실행중인 코드로 바로 사용할 수 있는 문자열로 변환하는 기능이다. (이전의 file-loader의 기능을 대신한다.)
-   `asset/source` : 자바스크립트 모듈로 불러온 파일의 내부 소스를 자바스크립트의 문자열로 가져오는 기능이다. (이전의 raw-loader의 기능을 대신한다.)

### 리소스 에셋

-   리소스 모듈은 자바스크립트 모듈로 불러온 파일을 output으로 지정한 폴더에 생성한다. 우선은 불러온 파일과 똑같은 파일을 생성하지만 해시값의 파일명으로 생성한다. 해시명을 갖는 파일으로 복사하는 것과 동일하다.
-   기본적으로 생성되는 파일명은 `[hash][ext]`의 파일명으로 생성된다. 빌드가 되었을 때 파일을 불러오는 부분의 경로는 대상 파일의 경로가 생성된 파일 경로로 바뀌게 되며 경로에는 쿼리스트링을 포함하는 경우가 있으므로 `[hash][ext][query]`의 파일명으로 생성되는 파일 경로가 추출된다.
-   webpack.config.js에서는 생성되는 파일명 및 파일 경로를 다음과 같은 방식으로 바꿀 수 있다.

```js
// other webpack settings...
const config = {
    // other configulations...
    output: {
        // other output options...
        assetModuleFilename: 'images/[hash][ext][query]'
        // other output options...
    },
    // other configulations...
}
// other webpack settings...
```

-   `output` 옵션에 `[hash][ext][query]`을 적는 것으로 사용가능하다.
-   위 옵션의 내용은 자바스크립트 모듈로 불러온 대상 파일(여기서는 이미지)을 images 폴더에 해시화된 이름으로 생성하겠다는 의미이다.
-   `[query]`옵션은 리소스 모듈을 사용해서 자바스크립트 모듈로 파일을 로드할 경우 빌드된 파일의 해시화된 이름을 포함하는 경로값 최종 빌드에서 얻게 되는데 이 경로값에 쿼리스트링을 추가하는 것을 의미한다. 쿼리스트링이란 url 끝에 `?`으로 시작하여 `&`로 여러 파라메터가 `키=벨류` 형식으로 연결되어 있는 URL의 추가 정보를 의미한다. 이에 관한 자세한 설명은 [링크](https://github.com/webpack-contrib/file-loader/issues/364)를 참고하자.

#### 리소스 에셋의 설정

-   다음은 webpack.config.js에 리소스 에셋을 설정한 예이다.

```js
// other webpack settings...
const config = {
    // other configulations...
    module: {
        // other module options...
        {
            test: /\.png/,
            type: 'asset/resource'
        },
        {
            test: /\.html/,
            type: 'asset/resource',
            generator: {
                filename: 'static/[hash][ext][query]'
            }
        }
        // other module options...
    },
    // other configulations...
}
// other webpack settings...
```

-   리소스 에셋으로 두 가지 확장자에 대한 규칙을 설정한 예제이다.
-   첫 번째 예제는 `png` 확장자를 지닌 파일을 `'asset/resource'` 모듈로 디폴트 output 경로에 디폴트 파일명 규칙 ``[hash][ext][query]`에 따라 생성한다는 의미이다. 이 때, `output` 옵션에 `assetModuleFilename`이 지정되어 있는 경우 예를 들어 `assetModuleFilename: 'images/[hash][ext][query]'`가 지정되어 있다면 생성되는 파일의 경로는 빌드 폴더(기본적으로는 `dist`) 하위의 `images` 폴더에 이미지 파일이 생성된다.
-   두 번째 예제는 디폴트 output이 아닌 지정된 경로에 파일을 생성한다는 의미이다. 자바스크립트 모듈로 html 파일을 불러 사용할 때, html 파일은 빌드 폴더(기본적으로는 `dist`)의 `static` 폴더에 생성하겠다는 의미를 갖고 있다.
-   모듈에서 `test` 옵션으로 대상 파일의 유형(여기서는 파일의 확장자 규칙을 통해서 지정했다.)과 리소스 에셋을 적용하겠다는 `type: 'asset/resource'`을 지정하는 것을 통해서 웹팩에서 자바스크립트 모듈로 대상 파일을 불어올 때 리소스 에셋이 적용된다.
