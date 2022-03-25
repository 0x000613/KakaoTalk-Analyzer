# KakaoTalk-Analyzer

카카오톡 채팅 분석/시각화 웹애플리케이션입니다.

[Demo](kakaotalk-analyzer.vercel.app)

## Stacks

해당 프로젝트에 사용된 기술 스택을 정리합니다.

#### Saas

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

#### Library

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Refference
[React Nivo](https://nivo.rocks): 막대그래프, 파이그래프등 데이터 시각화에 사용되었습니다.  
[React Wordcloud](https://www.npmjs.com/package/react-wordcloud): 채팅 데이터 워드클라우드 시각화에 사용되었습니다.  

## Overview

![2022-03-24 08 07 54](https://user-images.githubusercontent.com/77450463/159844085-eec139bb-5dc1-49fb-bbd3-fbba7fe693f2.gif)

### 상위 100개 단어 워드클라우드 시각화 기능

채팅방에서 가장 많이 사용/언급된 상위 100개의 단어를 추출하여 워드클라우드 이미지를 생성합니다.

![2022-03-24 08 08 31](https://user-images.githubusercontent.com/77450463/159850554-fc5850c1-83e6-43ed-bc2b-e237cca3a07f.gif)

### 상위 10, 20, 30 단어 그래프 시각화 기능

채팅방에서 가장 많이 사용/언급된 상위 10, 20, 30개의 단어를 추출하여 그래프를 생성합니다.  
상단 버튼을 클릭하여 총 몇개의 단어를 그래프에 표시할것인지 선택이 가능합니다.

![2022-03-24 08 08 50](https://user-images.githubusercontent.com/77450463/159850733-f8482626-357e-43cf-99e0-abdd9b1b7d2b.gif)

### 가장 채팅이 활발한 시간대 그래프 시각화 기능

오전 -> 오후 순으로 시간대가 정렬되는 그래프를 생성합니다.  
시각화 데이터로는 매 정각에 발생된 채팅 횟수를 표기합니다.

![2022-03-24 08 09 19](https://user-images.githubusercontent.com/77450463/159850967-7d32e91a-49a7-4684-b997-3d7cb37ac6b4.gif)

### 가장 채팅을 많이 보낸 사용자 추적 시각화 기능

가장 채팅을 많이 보낸 유저를 추적하여 파이 그래프로 시각화, 가장 채팅을 많이 보낸 유저 상위 5명을 표기합니다.

![2022-03-24 08 09 37](https://user-images.githubusercontent.com/77450463/159851067-23599da3-5217-47e8-ba61-c621d8b38dbf.gif)
