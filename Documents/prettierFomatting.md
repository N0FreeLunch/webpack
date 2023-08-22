## prettier를 사용한 코드 포메팅

-   HTML, CSS, JS를 사용할 경우 문법에만 맞다면 코드 스타일을 자유롭게 사용할 수 있다. 그리고 초보자들의 코드는 들여쓰기 개행 위치 등이 잘못되어 있는 경우가 많다. 이런 문제점을 해결하기 위해서 코드의 문법에 맞는 코드라면 코드 스타일을 일관되고 잘 정리해 주는 기능을 사용할 수 있다. 이런 도구를 코드 포메팅 툴이라 부른다.
-   prettier는 코드 포메팅 도구로 가장 많이 쓰는 툴이며, 비쥬얼 스튜디오 코드에서는 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 라는 확장 프로그램을 설치하여 사용할 수 있다.

### prettier 실행해 보기

-   키보드에서 `cmd/ctrl` + `shift` + `p` 키를 동시에 누르면 `>` 표시가 있는 창이 뜨면서 검색을 할 수 있다. '문서 서식 (Format Document)' 항목을 검색한 후 해당 항목을 클릭하면 코드 포메팅이 적용된다. 간단하게는 `cmd/ctrl` + `shift` + `f` 키를 눌러서 바로 포매팅을 할 수도 있다.
-   문서를 저장할 때 자동으로 prettier를 적용하도록 할 수도 있지만, prettier 설정을 충분히 다룰 수 없다면 필요할 때만 prettier를 사용하는 것을 추천한다.

### .prettierrc

-   `.prettierrc`는 prettier의 옵션을 사용할 수 있다. [옵션 리스트 확인](https://prettier.io/docs/en/options)
-   `.prettierrc` 파일은 프로젝트의 루트 경로에 위치한다. prettier를 실행할 때 `.prettierrc` 파일의 옵션을 읽고 옵션에 지정한 대로 코드 스타일을 변경해 준다.
-   웹팩에서의 `.prettierrc`의 옵션 설정은 현재 프로젝트의 [`.prettierrc`](../.prettierrc) 파일을 참고 하도록 하자.

### 코드 스타일의 차이

-   웹팩을 활용한 프로젝트에서 주로 사용하는 파일 포멧은 html, css, js, md 파일을 주로 사용한다. 일반적으로는 html을 비롯한 많은 코드는 4칸의 들여쓰기를 하고, css와 js는 2칸의 들여쓰기를 한다.
-   prettier를 기본 세팅하면 이러한 차이점을 무시하고 동일한 코드 스타일로 변경한다. 따라서 기본 설정이 아닌 옵션을 `.prettierrc`를 사용하여 커스텀 해 줄 필요가 있다.

```json
"overrides": [
        {
            "files": "*.js",
            "options": {
                "tabWidth": 2
            }
        },
        {
            "files": "*.css",
            "options": {
                "tabWidth": 2
            }
        },
        {
            "files": "*.md",
            "options": {
                "embeddedLanguageFormatting": "off"
            }
        }
    ]
```

-   `.prettierrc` 파일에 위 옵션이 추가되어 있는데, 파일의 확장자 명에 따라서 prettier의 옵션을 다르게 적용하겠다는 의미이다.

### ejs 포멧을 다룰 때 주의할 점

-   웹팩의 html-webpack-plugin을 사용하면 템플릿 html에서 `<%=` `%>` 사이에 자바스크립트를 넣을 수 있는 문법을 지원한다.
-   하지만 표준 html 문법이 아니기 때문에 prettier로 코드 스타일을 변경하면 `<%=` `%>`와 그 사이의 코드가 적절히 조정되지 않는 문제가 생긴다.
-   따라서 `<%=` `%>` 사이의 코드가 여러 줄이 되는 경우에는 prettier의 포멧팅이 적용되지 않도록 해 주어야 한다. html에서는 `<!-- prettier-ignore -->` 라는 코드를 태그 바로 위에 적어 주면 `<!-- prettier-ignore -->`에 바로 이러진 태그는 prettier의 포메팅 대상에서 제외한다.

src/pages/index.html

```html
    <!-- prettier-ignore -->
    <%=
        require('../fragments/transmitMsgTag.js')
        .write({
            redMsg: 'red index msg',
            blueMsg: 'blue index msg',
            greenMsg: 'green index msg'
        })
    %>
```

-   더 많은 옵션은 [다음](https://prettier.io/docs/en/ignore)을 참고하도록 하자.

### .prettierignore 사용하기

-   만약 ejs 문법이 포함된 html 파일을 prettier로 포매팅을 하지 않도록 배제하고 싶다면 프로젝트 루트 경로에 `.prettierignore` 파일을 만들어 주면 된다.

.prettierignore

```
src/pages/*.html
```

-   위와 같이 설정하면 `src/pages` 폴더 안의 모든 html 파일에 prettier 포매팅이 적용되지 않는다.

### ejs 플러그인을 prettier에 적용하기

-   html 파일에서 ejs 문법을 적을 때 마다 `<%=` `%>` 코드 위에 `<!-- prettier-ignore -->`를 적어주는 것이 불편할 수 있다. prettier에 ejs 포맷에 대한 문법을 적절히 포맷팅 해 주는 플러그인을 설치하여 이를 해결할 수 있다.
-   아쉬운 점은 아직 유명하지 않은 라이브러리를 설치해야 한다는 점이다. [prettier-plugin-ejs](https://github.com/ecmel/prettier-plugin-ejs) 라이브러리를 사용하도록 하자.
-   잘 알려진 라이브러리를 설치하는 것이 좋지 않은 이유는 내부에서 어떤 코드가 동작할지 위험성에 대한 보고가 검증이 이뤄지지 않았기 때문에 라이브러리의 내부 코드에 위험성이 있지 않은지를 직접 확인해야 한다. [prettier-plugin-ejs](https://github.com/ecmel/prettier-plugin-ejs) 라이브러리는 동작이 아주 단순해서 확인하기 쉽고 특별히 위험성 있는 동작을 하지 않는다는 것을 확인할 수 있다. 물론 잘 알려진 라이브러리가 아니라서 버그가 있을 가능성이 있지만 코드가 단순한 만큼 특별히 문제가 있을 것 같지는 않다.

#### 플러그인 설치하기

```sh
yarn add --dev prettier-plugin-ejs
```

#### 플러그인 적용하기

.prettierrc

```json
    // other configurations...
    "overrides": [
        {
            "files": "*.html",
            "options": {
                "tabWidth": 4,
                "plugins": ["prettier-plugin-ejs"]
            }
        },
        // other configurations...
    ]
```

-   html 파일에서 `<!-- prettier-ignore -->` 코드를 제거한 뒤 prettier를 적용해도 `<%=` `%>` 코드가 잘 정렬되어 있는 것을 확인할 수 있다.

### `<%` `%>` 사이에는 html 태그를 적을 때

-   html에서 prettier는 태그 형식의 포맷팅을 우선시한다. `src/pages/index.html` 파일 안에 `<% const tag = `<h2>index.html</h2>` %>`라는 코드를 적어 보자. prettier를 적용하면 태그를 들여쓰기 다음에 위치시키기 위해 prettier는 태그의 전후를 강제로 개행한다.

```html
    <% const tag = `
    <h2>index.html</h2>
    ` %>
```

-   그런데 이런 개행이 문제가 되는 경우가 생기는데, `<%` `%>` 사이에 태그를 나열한 코드를 연속으로 사용하는 경우이다.

```html
    <%= `<div>apply pretttier to tag string in &lt;%= %&gt;</div>` %>
    <%= `<div>apply pretttier to tag string in &lt;%- %&gt;</div>` %>
    <%_ `
    <div>apply pretttier to tag string in &lt;%_ and %&gt;</div>
    ` %>
```

-   위와 같이 태그를 적고 prettier를 적용하면 다음과 같이 포매팅이 된다.

```
    <%= `
    <div>apply pretttier to tag string in &lt;%= and %&gt;</div>
    ` %> <%= `
    <div>apply pretttier to tag string in &lt;%- and %&gt;</div>
    ` %> <%_ `
    <div>apply pretttier to tag string in &lt;%_ and %&gt;</div>
    ` %>
```

-   html 문서 내에서 prettier는 html 태그를 한 줄에 배치하려고 한다. 그래서 ``<%= ` ``와 `` ` %>``가 위 아래 행으로 밀리고, ``<%= ` ``와 `` ` %>``가 위 아래 행으로 밀려 버린다. 또 ``<%_ ` `` 와 ``<%_ ` ``가 위 아래 행으로 밀린다.
-   특히 연속으로 태그를 적으면 닫는 ejs 태그와 여는 ejs가 한 줄에 위치하는 문제가 발생한다.
-   따라서 `<%` `%>` 사이에 가능한 태그를 그냥 적는 것을 지양하고 외부 파일을 불러오는 방식으로 사용하거나 prettier의 적용될 때 닫는 ejs 태그와 여는 ejs를 구분하기 위해 빈 html 주석 문자를 적어주는 방법을 사용하도록 한다.

```html
    <%= `<div>apply pretttier to tag string in &lt;%= %&gt;</div>` %><!-- -->
    <%= `<div>apply pretttier to tag string in &lt;%- %&gt;</div>` %><!-- -->
    <%_ `<div>apply pretttier to tag string in &lt;%_ and %&gt;</div>` %><!-- -->
```

-   위 코드를 prettier를 적용하면 다음 코드가 된다.

```
    <%= `
    <div>apply pretttier to tag string in &lt;%= %&gt;</div>
    ` %><!-- -->
    <%= `
    <div>apply pretttier to tag string in &lt;%- %&gt;</div>
    ` %><!-- -->
    <%_ `
    <div>apply pretttier to tag string in &lt;%_ and %&gt;</div>
    ` %><!-- -->
```

-   `<%` `%>` 연속으로 태그가 위치할 때 prettier-plugin-ejs 라이브러리가 자동적으로 적절한 개행을 해 주면 좋지만 연속으로 태그가 위치할 때의 처리가 충분하지 않은 단점이 있어서 수동으로 코드를 적어 적절한 개행이 일어날 수 있도록 빈 주석을 추가해 주는 것이 좋아 보인다.

### handlebars prettier 플러그인 설치하기

-   기본적으로 prettier는 handlebars 포맷을 완벽하게 지원하지 않는다. 따라서 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)과는 별개로 [handlebars-formatter](https://marketplace.visualstudio.com/items?itemName=mfeckies.handlebars-formatter)라는 확장 프로그램을 추가로 사용하여 코드 포맷팅을 한다.
-   확장 프로그램을 설치한 이후, `.hbs` 파일로 가서 `cmd/ctrl` + `shift` + `p` 키를 누른 후 `문서 서식 프로그램`(`Format Document...`)(`문서 서식`(`Format Document`)과는 다르다. `...`가 뒤에 추가 되었는지의 차이)을 선택한다. 그러면 `Prettier - Code formatter` 와 `handlebars-formatter`를 선택할 수 있는데 `handlebars-formatter`를 선택하여 사용하도록 한다. 한번 선택이 되면 기본적으로 `handlebars-formatter`를 사용하게 된다.
-   `handlebars-formatter`를 사용하더라도 prettier 옵션을 적용받는데 옵션을 조정하고 싶다면 `.prettierrc`에 오버라이드 설정을 추가하여 포매팅 옵션을 조정할 수 있다.

.prettierrc

```json
// other configurations...
"overrides": [
    // other configurations...
    {
      "files": "*.hbs",
      "options": {
        "singleQuote": false
      }
    }
  ]
  // other configurations...
```

-   위의 설정은 반드시 설정하는 것이 아닌 **예시 설정**이다. 기본적으로는 위 옵션을 추가할 필요는 없다.
