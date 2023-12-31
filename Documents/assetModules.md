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

### 인라인 에셋

-   컴퓨터의 모든 파일은 이진수의 코드를 가지고 있다. 에디터로 파일을 열어서 볼 때는 인간이 인식할 수 있는 문자열로 글자가 나열되어 있지만, 컴퓨터는 이 정보를 0과 1의 이진수로 저장을 하고 있다. 파일을 열었을 때 나오는 각각의 문자열은 여러개의 0과 1의 조합으로 구성되어 있다. 0과 1이 몇 개인지에 따라 어떤 문자를 나타낼지를 컴퓨터는 판단하고 사람이 알 수 있는 문자열로 바꾸어 출력하는 것이다.
-   텍스트 파일의 경우에는 파일을 열었을 때 문자열로 이뤄져 있어서 인간이 어떤 내용인지 문자에 대한 지식을 알고 있다면 이해할 수 있다. 하지만, 이미지 파일과 같은 여러 다른 파일은 이진수의 코드들이 문자열로 변환되지 않으며 이 이진수를 해석하는 프로그램을 통해서 열 수 있다. 브라우저에서 svg, png, jpg 등등의 다양한 이미지를 열 수 있는 것도 브라우저에 이미지를 해석해 보여줄 수 있는 기능이 내장되어 있기 때문이다.
-   파일에 들어 있는 이진수의 코드를 Base64라는 64진수의 문자열로 나타낸 것이 인라인 에셋이다. 파일에 담긴 코드를 0과 1로 나열하면 굉장히 긴 문자열이 되지만 Base64 문자열로 변환하면 상당히 짧은 문자열로 만들 수 있다. 자바스크립트에 파일의 코드를 불러올 때 Base64를 쓰는 이유는 최대한 길이를 짧게 하기 위한 방법중 한 가지를 사용한 것이다.
-   하지만 자바스크립트나 html에 있는 문자열이 길어지면 파일을 읽는데 많은 컴퓨팅 리소스가 필요하다. 컴퓨터는 0과 1으로 된 이진수의 파일은 바로 처리하지만, Base64는 문자열의 코드를 이진수로 만들어서 다시 읽기 때문에 속도가 많이 저하된다. 파일의 용량이 크다면 파일 내용을 Base64로 만들어도 문자열이 길어지기 컴퓨터가 해석하는 리소스가 많이필요하므로 용량이 작은 파일에 대해서만 Base64로 변환하는 방식을 사용한다.
-   Base64는 여러가지 형식이 있지만 자바스크립트의 Base64에서는 영어 대소문자 및 숫자 기호(+ /)를 사용해서 64개의 문자를 표현한다.
-   인라인 에셋은 자바스크립트로 불러온 파일의 코드를 Base64의 문자열로 만들어주는 역할을 한다.

#### 인라인 에셋의 설정

```js
// other webpack settings...
const config = {
    // other configulations...
    module: {
        // other module options...
        {
            test: /\.svg/,
            type: 'asset/inline'

        }
        // other module options...
    },
    // other configulations...
}
// other webpack settings...
```

-   위의 예제는 확장자가 svg인 파일을 자바스크립트 모듈로 로드할 때, 인라인 에셋을 적용하여 파일의 내용을 Base64의 문자열 값으로 가져온다는 설정이다.
-   예를 들어 `import metroMap from './images/metro.svg';`라는 코드로 svg 파일을 로드했다고 해 보자. 그러면 `metroMap` 변수 안에는 `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo...vc3ZnPgo=`와 같은 형식의 Base64로 된 코드가 담기게 된다. 브라우저가 html, css, js를 해석할 때 Base64의 코드도 해석하는 기능이 있으므로 ``block.style.background = `url(${metroMap})`;``와 같이 이 코드를 파일 경로 대신 사용하면 파일을 로드하지 않고 Base64로 된 코드의 이미지를 사용한다.
-   Base64의 코드를 사용할 때 주의할 점으로는 Base64 코드를 나열하기 전에 파일 포멧이 무엇인지 알려주는 `data:image/svg+xml;base64,`와 같은 코드가 있어야 한다는 것이다. 해당 코드가 어떤 해석 기능으로 읽어야하는지 svg 해석 기능으로 읽어야 하는지 png 해석 기능으로 읽어야 하는지 jpg 해석 기능으로 읽어야 하는지 정해줘야 코드를 적절한 해석 기능으로 이미지화 할 수 있다. 이미지 파일 뿐만 아니라 다른 파일도 마찬가지이다.

#### 다른 인코딩 방식 사용하기

-   기본적으로 인라인 에셋으로 자바스크립트 모듈로 불러온 파일은 Base64 포멧으로 변경이 된다. 단순히 파일의 데이터를 Base64 형태로 변경하는 것 뿐만 아니라, 이미지 파일의 경우 이미지의 압축 및 해상도 조정 등의 작업을 먼저 거치고 그 후에 Base64 포멧으로 변경하는 등의 방식을 사용하고 싶을 때도 있다.
-   웹팩은 이런 경우를 위해 사용자 지정 인코딩을 사용할 수 있는 옵션을 제공한다.

```js
// other webpack settings...
const svgToMiniDataURI = require('mini-svg-data-uri');
// other webpack settings...
const config = {
    // other configulations...
    module: {
        rules: [
            // other module options...
            {
                test: /\.svg/,
                type: 'asset/inline',
                generator: {
                    dataUrl: content => {
                        content = content.toString();
                        return svgToMiniDataURI(content);
                    }
                }
            }
        // other module options...
        ]
    },
  // other configulations...
};
// other webpack settings...
```

-   위의 코드의 경우 `svgToMiniDataURI`라는 라이브러리가 제공하는 함수를 사용해서 파일 내부의 값을 인코딩하는 예제이다.
-   브라우저의 이미지 해석 기능에는 특정 유형의 압축된 이미지를 압축을 풀고 보여주는 기능이 있으므로 브라우저에서 해석될 수 있는 최대한의 압축을 하는 편이 좋다. svg 파일에 대해 최대한의 압축을 해 주는 패키지가 `mini-svg-data-uri` 패키지이다. 라이브러리에 대한 상세는 [링크](https://github.com/tigt/mini-svg-data-uri)를 통해서 확인하자.

### 소스 에셋

-   소스 에셋은 자바스크립트 모듈로 불러온 파일의 문자를 어떠한 변환 없이 그대로 보여주는 역할을 한다. 이때 파일의 문자는 utf-8 형태의 문자열을 포함해야 파일 내부의 문자열을 가져올 수 있다. utf-8 형식의 문자열이 아닌 경우 문자열이 다르게 표기 될 수 있으며 문자열로 가져온 값의 일부 데이터가 소실될 수 있다. 물론 파일의 내용이 변경되는 것은 아니며 불러온 값이 파일 내용과 다르게 표시될 수 있다는 의미이다. utf-8에 대한 처리에 관한 자세한 사항은 [링크](https://github.com/webpack-contrib/raw-loader/pull/93)를 참고하자.
-   컴퓨터는 문자를 이진수로 저장을 한다. 우리가 파일을 열 때 어떤 문자가 있는지 알 수 있는 것은 이진수의 배열을 우리가 알 수 있는 문자로 변환하였기 때문이다. 똑같은 이진수의 나열이라도 어떤 변환을 하느냐에 따라 표시되는 문자열이 달라진다. 이진수를 문자열로 변환하는 기능을 문자 디코더라고 하며 텍스트 파일을 읽을 때는 프로그램에서 적절한 문자열로 변환을 해 준다. 예를 들어 utf-8으로 디코딩되어야 하는 문자가 EUC-KR으로 디코딩되었다면 어떤 이진수에 대응하는 문자가 utf-8으로 만들어진 것인데 EUC-KR으로 해석되므로 이상한 문자 또는 글의 의미를 알수 없는 괴상한 문자의 나열이 되어 버린다. IDE에서도 인코딩 디코딩 방식을 정할 수 있는데 보통 기본적으로 utf-8을 사용한다. utf-8을 사용하는 이유는 영어, 한국어, 일본어, 중국어, 히르리어, 아랍어 등 대부분의 문자열을 해석할 수 있는 인코딩 디코딩 방식이기 때문이다.

```js
// other webpack settings...
const svgToMiniDataURI = require('mini-svg-data-uri');
// other webpack settings...
const config = {
    // other configulations...
    module: {
        rules: [
            // other module options...
            {
                test: /\.txt/,
                type: 'asset/source',
            }
        // other module options...
        ]
    },
  // other configulations...
};
// other webpack settings...
```

-   위의 예제는 자바스크립트 모듈을 통해서 txt 확장자의 파일을 불러올 때, 소스 에셋을 적용한다는 의미를 가지고 있다. 해당 모듈로 파일을 불러올 때 반환 되는 값은 파일에 들어있는 문자열을 자바스크립트 문자열로 반환된 값이다.
-   예를 들어 텍스트 파일에 들어 있는 문자열이 다음과 같다고 하자.

```txt
Hello world
```

-   위 파일을 모듈로 불러오는 코드 `import exampleText from './example.txt';`는 파일에 있는 문자열을 `exampleText`라는 자바스크립트 변수 안에 담는다. 이 변수를 출력해 보면 `'Hello world'`가 반환되는 것을 확인할 수 있다.

### URL 에셋

-   https://webpack.kr/guides/asset-modules/#url-assets

### 에셋 타입 (General asset type)

-   webpack.config.js에서 모듈을 정의할 때 리소스(`asset/resource`), 인라인(`asset/inline`), 소스(`asset/source`) 에셋 등의 타입을 사용하지 않고, `asset`이란 타입을 사용할 때 적용되는 기능이다.
-   이 기능은 조건을 설정하고 조건에 따라 리소스, 인라인, 소스 중 어느 에셋 중 하나를 적용하는 방식이다.
-   기본적으로 에셋 타입은 8kb 이상의 파일을 불러올 때는 외부 파일로 분리하는 리소스 에셋을 적용하고, 8kb 미만의 파일을 불러올 때는 Base64 코드로 변환하는 인라인 에셋으로 처리한다. 이는 옵션을 부여하여 조건을 조정할 수 있다.

#### 설정하기

```js
// other webpack settings...
const config = {
    // other configulations...
    module: {
        // other module options...
        {
            test: /\.svg/,
            type: 'asset'

        }
        // other module options...
    },
    // other configulations...
}
// other webpack settings...
```

#### 조건 변경하기

```js
// other webpack settings...
const config = {
    // other configulations...
    module: {
        // other module options...
        {
            test: /\.svg/,
            type: 'asset'
            parser: {
                dataUrlCondition: {
                    maxSize: 4 * 1024 // 4kb
                }
            }
        }
        // other module options...
    },
    // other configulations...
}
// other webpack settings...
```

> 모듈 소스 크기가 maxSize보다 작으면 모듈이 Base64 인코딩 문자열로 번들에 삽입되고, 그렇지 않으면 모듈 파일이 출력 디렉터리로 내보내집니다. <sup>[link](https://webpack.kr/configuration/module/#ruleparserdataurlcondition)</sup>

-   기본적으로는 8kb를 기준으로 외부 파일로 분리할지 내장할지를 정하는 조건인데 `maxSize: 4 * 1024`의 옵션을 통해서 4kb를 기준으로 4kb 이상은 리소스 에셋으로 4kb 미만은 인라인 에셋으로 처리하는 조건으로 변경하였다.
