## handlebars

### 설치하기

```
yarn add handlebars
```

```
yarn add handlebars-loader
```

-   위 두개의 라이브러리를 설치한다.

### 템플릿 파일 만들기

-   `src/fragments` 폴더에 `colorInfo.hbs`라는 파일을 만들어 보자.

```hbs
<div>
    <div>색상별 컬러코드</div>
    <div>색상명: {{colorName}}</div>
    <div>16진수 표기 : {{hexadecimal}}</div>
    <div>RGB 표기 : {{rgb}}</div>
    <div style="display: flex;">색상&nbsp;:&nbsp;
        <div style="background-color: {{hexadecimal}}; width: 2em; height: 2em;" ></div>
    </div>
</div>
```

-   `{{}}` 부분은 handlebars 파일을 불러올 때 전달되는 값을 받아 올 수 있는 부분이다.

### 사용하기

src/pages/index.html

```
<!-- other code... -->
<%=
    require('!!handlebars-loader!../fragments/colorInfo.hbs')({
        colorName : 'red',
        hexadecimal : '#FF0000',
        rgb: '255,0,0'
    })
%>
<!-- other code... -->
```

-   HtmlWebpackPlugin의 텝플릿 html의 `<%=` `%>` 태그 안에서 handlebars 템플릿 파일을 불러올 때는 `require('handlebars-loader!파일경로')()`와 같은 방법으로 사용한다.
-   html-loader를 사용했을 때는 `require('html-loader!파일경로').default`로 `.default`를 붙여 주었지만 handlebars-loader를 사용할 때는 `.default`가 아닌 `()`를 뒤에 붙여준다는 차이점이 있으니 주의하자.
-   `require()` 함수 다음에는 `()`를 붙여 주는데 이 곳에 자바스크립트 리터럴 오브젝트를 할당하여 값을 hbs 템플릿에 전달할 수 있다.

```js
{
    colorName : 'red',
    hexadecimal : '#FF0000',
    rgb: '255,0,0'
}
```

-   이렇게 전달된 리터럴 오브젝트의 키는 템플릿의 `{{오브젝트의_키_이름}}` 부분에 키에 해당하는 값이 들어간 형태로 템플릿이 로드된다. 위 리터럴 오브젝트를 전달하면 템플릿의 `{{colorName}}`에는 `red`란 값이 들어가고, `{{hexadecimal}}`에는 `#FF0000`이 들어가고, `{{rgb}}`에는 `255,0,0`란 값이 들어간다.

### 서브모듈 사용하기

src/fragments/colorDetail.hbs

```html
<div style="border: solid 1px; padding: 10px;">
    <span>more info : </span>
    <a
        href="https://www.w3schools.com/colors/color_tryit.asp?color={{colorName}}"
        target="_blank"
    ><span>link</span></a>
    <div>{{message}}</div>
</div>
```

src/fragments/colorInfo.hbs

```html
<div style="border: solid 1px; padding: 10px;">
    <div>색상별 컬러코드</div>
    <div>색상명: {{colorName}}</div>
    <div>16진수 표기 : {{hexadecimal}}</div>
    <div>RGB 표기 : {{rgb}}</div>
    <div style="display: flex;">
        색상&nbsp;:&nbsp;
        <div
            style="background-color: {{hexadecimal}}; width: 2em; height: 2em;"
        ></div>
    </div>
    {{> colorDetail link='{{colorName}}' message='Red has symbolized wealth and power'}}
</div>
```

-   handlebars 템플릿에서 partial 문법 `{{> handlebars_파일명 }}`의 방식으로 다른 handlebars 파일을 불러올 수 있다. 이렇게 다른 handlebars 파일을 불러오는 기능을 handlebars에서는 patial이라고 부른다.
-   `colorDetail.hbs`란 파일을 만들고 이 파일을 `{{> colorDetail }}`의 문법으로 불러왔다. 이 때 `키="벨류"`를 띄워쓰기로 나열하여 patial에 값을 전달할 수 있다.
-   partial에 값을 전달할 때 `link='{{colorName}}'` 부분은 `colorInfo.hbs`에서 색상명에 해당하는 `colorName` 값이 전달 되었다. 이 값을 `red`인데 이 값을 다시 patial에 전달한다는 의미이다.
-   `colorDetail.hbs`는 값을 전달 받아 `?color={{colorName}}`의 `{{colorName}}`에 red를 표기하고, `<div>{{message}}</div>` 부분에 `Red has symbolized wealth and power` 값을 표기한다.
