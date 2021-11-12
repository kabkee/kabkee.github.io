---
layout: single
title:  "Bootstrap-vue : CSS scoped로 로드하는 방법"
toc: true
toc_label: "목차"
toc_icon: "list-alt"
toc_sticky: true
date:   2021-02-03 23:26:00 +0900
categories: VUE
tags: ['scoped-boostrap-css', 'bootstrap-vue', 'scss', 'scoped-css']
<!-- classes: wide -->

---

## Scoped Style을 사용하는 이유
개발하는 사이트 내에 여러 라이브러리에 포함된 CSS를 규칙없이 로드시켜 사용하였을 경우, 충돌 내지는 CSS 설정이 중첩되어 원하는 설정 결과 값을 얻을 수가 없다. 따라서, 각 프로젝트별 또는 component 별 Scoped Style 을 사용함으로서 이런 문제를 해결할 수 있다.


## Look360 Bootstrap CSS 사용 현황
LOOK360은 기존적으로 bootstrap 3을 기반으로 제작되었다.
Admin 의 경우, 일부 bootstrap4를 사용하고 있으나 아주 일부만 사용한다.

<em>kimsq 1.2의 경우, bootstrap3를 그냥 로딩하는 경우에 충돌이 일어나 layout 이 심하게 깨지는 현상이 발생되기에 bootstrap css에 prefix 를 붙인 버전을 제작하여 사용한다.</em> 


## Vue 프로젝트에서의 Bootstrap CSS 사용 필요성
위에 '[Scoped Style을 사용하는 이유][why-should-use-scoped-style]'에서 설명한 것과 같이 Scoped Style 처리 되지 않은 Vue 제작 소스를 기존에 사용하던 레거시 코드를 대처하거나 CMS(그누보드, kimsq와 같은...)에서 사용하는 경우 CSS 충돌 및 중첩 문제가 발생된다.


## Vue 프로젝트에서의 Bootstrap CSS 사용 방법
1. [Vue 프로젝트에 vue-loader SCSS pre-processor 설치][pre-processors-scss]
	<br>vue cli 를 사용할 경우, 프로젝트 제작 초기 단계에서 함께 설치할 수 있다.
2. [Vue Deep Selectors 사용][deep-selectors]
	<br>프로젝트 빌드 단계에서 웹 `<element>`가 hashing 처리가 되면서 Scoped style 이 적용되는 것을 이용하여 Bootstrap CSS 전체를 Scoped Style 적용을 시킬 수 있다.
3. [Vue Bootstrap CSS Deep Selectors 처리 방법][scoped-bootstrap-css-blogger]
	<br>위 블로그의 요지는 scss형의 스타일로 Deep Select 처리된 CSS Selector 내에 Boostrap CSS를 import 시키는 방식이다.


```
<style scoped lang="scss"> 
  .main-wrapper ::v-deep {
    @import "~bootstrap/dist/css/bootstrap.min";
  }
</style>

```

## 주의사항
scss와 같은 pre-processor에서는 일반 css에서 사용하는 Deep Selector인 '`>>>`'를 제대로 파싱하지 못한다.
따라서, pre-processor 사용시에는 '`>>>`' 대신 '`/deep/`' 또는 '`::v-deep`' 를 사용해야한다.

<em>필자의 경우 위의 예제와 같이 scss에서 '`::v-deep`'를 사용하니 정상작동하였다.</em>


## 결론
Bootstrap CSS, Bootstrap-vue CSS를 사용하는 경우, 전역사용 목적으로 로딩하는 경우 기존에 작업한 CMS의 layout 또는 레거시 코드의 일부가 오작동하거나 뭉개질 수 있다. 따라서, 새로운 Vue 프로젝트를 진행하는 경우, Scoped style 을 사용하여 이를 방지한다.

Pre-processor되는 scss형의 style을 사용하여 위의 예제와 같이 scss형 style 내에 deep Selector처리로 사용하는 경우 Bootstrap css에 사전 정의된 모든 css가 scoped 처리가 될 수 있고, 문제의 원인이 제거된다.



## 참고자료
* [What is Vue Single file components][vue-single-file-components]
* [Vue 프로젝트에 vue-loader SCSS pre-processor 설치][pre-processors-scss]
* [Vue Deep Selectors 사용][deep-selectors]
* [Vue Bootstrap CSS Deep Selectors 처리 방법][scoped-bootstrap-css-blogger]

[vue-single-file-components]: https://kr.vuejs.org/v2/guide/single-file-components.html
[why-should-use-scoped-style]: #scoped-style을-사용하는-이유
[pre-processors-scss]: https://vue-loader.vuejs.org/guide/pre-processors.html#sass
[deep-selectors]: https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors
[scoped-bootstrap-css-blogger]: https://nashorn.tistory.com/entry/Bootstrap%EC%9D%98-Scoped-CSS-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95