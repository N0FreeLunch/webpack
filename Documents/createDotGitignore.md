## .gitignore이 필요한 이유

- 기본적으로 nodeJS를 설치하는 프로젝트의 경우 `node_modules` 폴더를 설치한다. `node_modules`에는 자바스크립트 라이브러리들이 들어가 있으므로 무척 용량이 크다.
- package.json, package-lock.json 파일이 있다면 `node_modules`에 설치된 라이브러리를 동일하게 설치할 수 있기 때문에 `node_modules` 폴더를 git에 업로드하지 않는다.
- github와 같은 원격 저장소에 업로드하지 않기 위해서는 `.gitignore`를 만들어 지정한 폴더 또는 파일이 git에 의해 커밋되지 않도록 만들어 주어야 한다.

## .gitignore 만들기

- 프로젝트 폴더 최상단에 `.gitignore`이름의 파일을 만든다.
- 파일 내부 코드에 `node_modules`를 적어 준다. 만약 비주얼 스튜디오 코드에서 실행하고 있다면, `.gitignore` 파일을 저장하는 순간 폴더 및 파일 리스트를 보여주는 탐색기란에 `node_modules` 폴더의 색에 투명도가 들어간 연한 색이 되는 것을 확인할 수 있다.

## .gitignore을 추적하기

- `.gitignore` 파일 안에 나열된 파일 또는 폴더는 git에 의해 추적이 되면 안 되지만, 추적에서 제외할 리스트를 설정한 `.gitignore` 파일은 git에 의해 추적이 되어야 원격 저장소에서 이 코드를 받아 사용하는 사람들도 동일한 `.gitignore`의 설정을 통해 git에 추적하지 말아야 할 파일 및 폴더를 추가하지 않을 수 있다.

```js
git add .gitignore
git commit -m ".gitignore 설정으로 node_modules 폴더를 추적하지 않도록 설정"
```
