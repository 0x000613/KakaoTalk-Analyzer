// Core modules
import { React, useState } from 'react';

// Function modules
import styled from 'styled-components';
import ReactWordcloud from 'react-wordcloud';

// Images
import LogoImg from './Images/KCALogo.png';

// Styles
import './Style/common.css';

// Components
import Button from './Components/Button'
import ChatCountCart from './Components/ChatCountChart';

// Styled components define (Common)
const ContainerTitle = styled.h1`
  color: orange;
  margin-left: 10px;
  margin-bottom: 10px;
  display: inline-block;
`

// Styled components define (Element)
// 헤더 컨테이너
const Header = styled.div`
  width: 100%;
  height: 80px;
  background-color: #FFFFFF;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  justify-content: left;
  align-items: center;
  overflow: hidden;
`

// 로고 이미지
const HeaderLogoImg = styled.img`
  position: relative;
  height: 70%;
  margin-left: 30px;
`

// 로고 타이틀
const HeaderLogoTitle = styled.h1`
  color: orange;
  margin-left: 10px;
  display: inline-block;
`

// 전체 요소 컨테이너
const MainContainer = styled.div`
  margin: 0 auto;
  margin-top: 30px;
  width: 800px;
  max-width: 800px;
`

// 채팅내용 입력 텍스트박스
const ChatTextInputBox = styled.textarea`
  width: 100%;
  height: 70vh;
  padding: 15px;
  box-sizing: border-box;
  border: none;
  border-radius: 20px;
  resize: none;
  outline: none;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  &: focus {
    outline: none;
    box-shadow: 0px 0px 5px orange;
  }
`

const App = () => {
  // 채팅 내용 Input State
  const [chatText, setChatText] = useState('');
  // 채팅 내용 Input State 변경 감지 함수
  const onChangeChatText = e => setChatText(e.target.value);

  // 분석 결과 데이터 State
  const [analyzeResult, setAnalyzeResult] = useState({});

  // Analyze 버튼이 클릭되었을 경우
  const AnalyzeBtnClicked = () => {
    // 입력된 값이 정상적이지 않을경우 처리 종료
    if (!chatText || chatText.trim().length <= 0 || chatText.trim() === '') { 
      setChatText('');
      return alert('입력 값이 올바르지 않습니다.');
    }

    // 워드클라우드 데이터를 보관할 오브젝트 초기화
    let tempWordCloudData = {};
    let wordCloudData = [];
    // 채팅 횟수를 기록할 오브젝트 초기화
    let tempChatCountData = {};
    let chatCountData = [];
    // 채팅 내용을 상세히 기록할 배열 초기화
    let chatTextDetailArr = [];
    // 개행 라인별로 배열에 저장
    let chatTextArr = JSON.stringify(chatText).slice(1, -1).split('\\n')
    // 불필요한 문자열 제거
    chatTextArr = chatTextArr.filter(i => i.trim() !== '')

    // 채팅 분석
    chatTextArr.forEach((chat, index) => {
      if (chat.startsWith('[')) {
        try {
          let userName = chat.split('] [')[0].slice(1, chat.split('] [')[0].length);
          let chatTime = chat.split('] [')[1].split('] ')[0];
          let message = chat.split('] [')[1].split('] ')[1];

          // 채팅 횟수 기록 (chatCountObj에 유저가 존재하면 +1 존재하지 않으면 0으로 초기화)
          if (!tempChatCountData[userName]) tempChatCountData[userName] = 0;
          tempChatCountData[userName] += 1;

          // 채팅 내용을 자세히 기록
          // chatTextDetailArr에 삽입될 오브젝트 형태의 채팅상세내용을 담을 오브젝트 초기화
          let tempObj = {};
          tempObj['userName'] = userName;
          tempObj['chatTime'] = chatTime;
          tempObj['message'] = message;
          chatTextDetailArr.push(tempObj);

          // 채팅 워드클라우드 분석
          message.split(' ').forEach(word => {
            let regexWord = word.replaceAll('ㅋ', '').replaceAll('ㅎ', '');
            if (!tempWordCloudData[regexWord]) tempWordCloudData[regexWord] = 0;
            tempWordCloudData[regexWord] += 1;
          });
        }
        catch(e) {}
      }
    });

    console.log(tempChatCountData);
    
    // 생성된 워드클라우드 데이터를 가공해 배열화
    Object.keys(tempWordCloudData).forEach(word => {
      let tempObj = {};
      tempObj['text'] = word
      tempObj['value'] = tempWordCloudData[word];
      wordCloudData.push(tempObj);
    })

    // 생성된 채팅 횟수 데이터를 가공해 배열화
    Object.keys(tempChatCountData).forEach(person => {
      let tempObj = {};
      tempObj['id'] = person;
      tempObj['label'] = person;
      tempObj['value'] = tempChatCountData[person];
      tempObj['color'] = "#" + Math.floor(Math.random() * 16777215).toString(16);
      chatCountData.push(tempObj);
    })
    
    // 분석 결과를 저장할 변수
    const analyzeResult = {
      // 대화상대명(대화방명)
      chatRoomName: chatTextArr[0].split(' ')[0],
      wordCloudData: wordCloudData,
      chatCountData: chatCountData
    }

    setAnalyzeResult(analyzeResult);
  }

  return (
    <>
      <Header>
        <HeaderLogoImg src={ LogoImg } alt='KCA Logo' />
        <HeaderLogoTitle>KakaoTalk Chat Analyzer</HeaderLogoTitle>
      </Header>
      <MainContainer>
        {!analyzeResult.wordCloudData ? <ContainerTitle>Chat here</ContainerTitle> : <ContainerTitle>✨ Top 50 Most used words </ContainerTitle>}
        {!analyzeResult.wordCloudData &&
          <>
            <ChatTextInputBox onChange={onChangeChatText} value={chatText} />
            <Button height='40px' fontSize='15px' margin='10px 0 0 0' text='Analyze' onClick={AnalyzeBtnClicked} />
          </>
        }
        {analyzeResult.wordCloudData &&
          <>
          <ReactWordcloud style={{backgroundColor: '#ffffff', borderRadius: '20px', height: '400px'}} maxWords='50' words={analyzeResult.wordCloudData} />
            <ChatCountCart data={ analyzeResult.chatCountData }/>
          </>
        }

        {/* 확인 버튼 */}
        {analyzeResult.wordCloudData &&
          <Button height='40px' fontSize='15px' margin='25px 0' text='Go to Main' onClick={AnalyzeBtnClicked} />
        }
      </MainContainer>
    </>
  );
}

export default App;
