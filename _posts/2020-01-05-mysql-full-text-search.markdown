---
layout: single
title:  "MySql Full-text Search 설정"
toc: true
toc_label: "목차"
toc_icon: "list-alt"
toc_sticky: true
date:   2020-01-05 23:59:43 +0900
categories: MySQL
tags: ['mysql', 'full-text-search']
<!-- classes: wide -->

---


MySQL Text 검색에 대한 여러 글을 보았으나, 형태소 분석을 하지 않은 경우에는 정확한 검색결과를 내기 어렵다는 결론에 다다르는 것으로 보인다.
본문은 검색엔진 최적화가 아닌 게시판의 제목과 내용을 좀 더 빠르게 검색하고자 하는 목적으로 시작 단어 또는 띄어쓰기 다음에 오는 단어 검색을 타겟으로 LIKE 문을 대처하는 대안으로 사용하여 검색의 한계를 동반하고 있다.


검색어 입력에 따른 결과 추출 방식과 SQL 쿼리 생성 규칙, 인덱싱의 설정 등에 따라 결과가 달라지거나 속도차이가 발생되기 때문에 적용하고자하는 사이트, 커뮤니티 등의 적용 목적에 따라 MySql Full-text Search의 장단점을 따져 결정하길 바란다.



## 문제사항
* 커뮤니티 게시판 테이블의 검색이 느린 문제 발생.
* 500Mb가 약간 안되는 20만 rows
* 키워드로 게시판 검색 시, 5분이 걸릴때도 있음.
* 기존 검색기능이 MySQL 'LIKE %%' 문을 활용하는 것을 확인. MySQL 튜닝 또는 LIKE문 대체 필요.


## 해결방법
1. ~~MySQL 외부 검색엔진 라이브러리 설치~~
2. MySQL Select 방식을 like 에서 Full-text Search 사용으로 대체


>Full-text indexes can be used only with InnoDB or MyISAM tables, and can be created only for CHAR, VARCHAR, or TEXT columns.



## Full-text Search 도입 결정
1. 현재 서버에 쉽고 빠르게 그리고 **가볍게!!** 게시판 검색 속도를 올리고 싶음. ~~도둑놈 심보~~
1. Full-text Search를 알게되었지만 왠지 어려워 보임. ~~이해 안 되~~
1. Sphinx설치까지 고려했으나, Full-text Search보다 더 복잡한 것 같애. [탁트인블로그 - 오픈소스 검색엔진 뭐 사용할까? 가벼운 스핑크스(Sphinx) 사용해보자 (인트로)][taktin-sphinx]
1. 다시 Full-text Search 조사 및 공부
	1. [MySQL Doc : 12.9 Full-Text Search Functions][mysql-doc-fts]
	1. [w3resource : MySQL Full text search][w3resource-fts]
1. Full-text Search 도입 결정
	1. 필수조건 만족
		1. MySQL 5.5 버전이상 사용.
		1. MyISAM table 사용.
		1. 게시판의 subject(제목), tag(태그), content(글 내용)은 midtext, varchar 사용.
	1. indexing 과정이 필요하지만, 시간 문제일 뿐 도입 가능 확인.
	1. **로컬서버에서 테스트 결과 성능 개선 확인!!**
		* 진짜 빨라졌음!
		* 6초 걸리는 쿼리가, 5ms으로 줄었음.
		* 600ms 걸리는 쿼리가, 60ms으로 줄었음.
		* 10~100배 차이가 나는 것으로 확인. (어떤 블로그에서는 1,000~100,000배 차이가 난다는데 용량차이에 따라 달라지겠죠?)
	1. 잘 정리된 한글 블로그를 만남.
		* [gu's stroy - [mysql] full-text 텍스트 검색 (like 대체)적용하기][gusstroy-fts]


## MySQL 설정
my.cnf 설정에 아래 내용을 추가 또는 변경한다.

### 최소 인덱싱 글자수 설정
```sql
[mysqld]
ft_min_word_len = 2
innodb_ft_min_token_size = 2
```

> 최소 '인덱싱 글자수'는 '검색 글자수'라고 하는 글도 어렵지 않게 찾아볼 수 있으나, 검색어 글자수 제한을 하는데 사용하는 것이 아니라 **인덱싱 글자수 단위**를 의미한다.
설정된 값보다 작은 숫자의 글자수로 검색할 경우 해당 글자수보다 작은 글자는 인덱싱대상이 아니기 때문에 결과값이 없는 것으로 나온다.

> 검색결과에 해당하는 row가 존재함에도 없다고 나오는 것을 방지하고자 최소 단위 2 (두글자)로 설정함.


#### MacOS MAMP 설정법
1. 서버 정지.
1. /Applications/MAMP/conf/ 에 my.cnf 생성.
1. Add your content in to my.cnf
1. Save my.cnf
1. Start servers
[참고링크](https://stackoverflow.com/a/2869707/2043471)



### 최소 인덱싱 글자수 확인
변경한 설정이 잘 되었는지 확인하고 인덱스 생성 하기!
```sql
show variables like 'ft_min%'
```


### full-text index 생성
400mb, 20만 rows의 경우 1개의 인덱스 생성 시, MacBook Pro late 2013 기준 평균 6분 내외가 걸렸음.
```sql
ALTER TABLE `기존 테이블명` 
ADD FULLTEXT INDEX `인덱스명` (`컬럼명`) VISIBLE;

-- 예1.
ALTER TABLE `bbs` 
ADD FULLTEXT INDEX `subject` (`subject`) VISIBLE;

-- 예2.
ALTER TABLE `기존 테이블명` 
ADD FULLTEXT INDEX `subject_tag` (`subject, tag`) VISIBLE;
```


### full-text 검색
실제 검색을 진행해볼 차례다.
놀라운 변화를 기대했으나, 처음에 10배 이상 느려지는 현상을 경험했고 이는 아래 트러블슈팅에서 다루었다. 오랜 삽질을 요구되었다.
```sql
SELECT * FROM bbs WHERE MATCH(subject) AGAINST("쯔위*" in boolean mode)
-- 또는
SELECT * FROM bbs WHERE MATCH(subject,tag) AGAINST("+쯔위* +언니*" in boolean mode)
```

#### AGAINST 값 설정 관련
어떤 정규식으로 매칭 시킬지는 각자의 상황에 최적화를 해야겠지만, 이번 작업에서는 첫 단어 또는 띄어쓰기 이후 오는 단어를 중심으로 검색을 할 것을 고려하여 적용하였다.

간단한 사용설명은 [w3resource][w3resource-fts]를 추천한다.
자세한 MATCH - AGAINST 설정 관련 정보는 [참고자료][advanced-text-searching]를 참고하자.




### 트러블슈팅
1. 인덱싱을 했는데도 속도가 느린 경우,<br>
인덱싱 컬럼에 인덱싱이 안된 컬럼이 포함된 경우 LIKE 문을 사용할 때보다 더 많이 느려질 수 있음.
	1. 예)
```sql
ALTER TABLE `bbs` 
ADD FULLTEXT INDEX `subject` (`subject`) VISIBLE;
```
subject만 인덱싱을 했는데 tag도 함께 match를 진행하는 경우, 더 느려짐.
```sql
SELECT * FROM bbs WHERE MATCH(subject, tag) AGAINST('사자*' in boolean mode)
```


	1. 예)
```sql
ALTER TABLE `bbs` 
ADD FULLTEXT INDEX `subject_tag` (`subject,tag`) VISIBLE;
```
subject와 tag를 함께 인덱싱을 했는데 subject만 match를 진행하는 경우, 더 느려짐.
```sql
SELECT * FROM bbs WHERE MATCH(subject) AGAINST('사자*' in boolean mode)
```

1. 검색 결과가 안나오는 경우,<br>
인덱싱을 하고 나서 최소 인덱싱 글자수를 변경하면 자동으로 적용되는 것이 아니라 새롭게 repair를 통해서 인덱싱을 해야 반영이 된다.
이와 같은 경우 Repair를 해줘서 indexing을 다시 셋팅하도록 해야 함.
```sql
REPAIR TABLE <TableName> QUICK;
```


## 참고자료
* [Advanced text searching using full-text indexes][advanced-text-searching]
* [Why full-text-search returns less rows than LIKE][why-full-text-search-returns-less]
* [Don’t Waste Your Time With MySQL Full-Text Search][dont-waste-you-time-with-fts]
* [[DBMS] MySQL FULLTEXT을 이용한 형태소 분석없는 한글검색 방법][phpschool-fts]
* [[SW기술] Mysql Fulltext Index 의 활용][phpschool-fts-practice]

[taktin-sphinx]: https://cipleme.tistory.com/14
[mysql-doc-fts]: https://dev.mysql.com/doc/refman/5.6/en/fulltext-search.html
[w3resource-fts]: https://www.w3resource.com/mysql/mysql-full-text-search-functions.php
[gusstroy-fts]: http://lemon421.cafe24.com/blog/textyle/21512
[advanced-text-searching]: http://www.hackingwithphp.com/9/3/18/advanced-text-searching-using-full-text-indexes
[why-full-text-search-returns-less]: https://dba.stackexchange.com/questions/21118/why-full-text-search-returns-less-rows-than-like
[dont-waste-you-time-with-fts]: https://hackernoon.com/dont-waste-your-time-with-mysql-full-text-search-61f644a54dfa
[phpschool-fts]: https://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=tipntech&wr_id=55543&sca=&sfl=wr_subject%7C%7Cwr_content&stx=%C7%D1%B1%DB%B0%CB%BB%F6&sop=
[phpschool-fts-practice]: https://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=forum&wr_id=93666&sca=&sfl=wr_subject%7C%7Cwr_content&stx=%BF%AA%C0%CE%B5%A6%BD%BA&sop=and




