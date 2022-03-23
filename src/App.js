// Core modules
import { React, useState } from 'react';

// Function modules
import styled from 'styled-components';
import ReactWordcloud from 'react-wordcloud';
import { isMobile } from 'react-device-detect';

// Images
import LogoImg from './Images/KCALogo.png';
import ErrorImg from './Images/Error.png';

// Styles
import './Style/common.css';

// Components
import Button from './Components/Button'
import ChatCountChart from './Components/ChatCountChart';
import WordCountChart from './Components/WordCountChart';
import TimeCountChart from './Components/TimeCountChart';

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
  cursor: pointer;
`

// 로고 타이틀
const HeaderLogoTitle = styled.h1`
  color: orange;
  margin-left: 10px;
  display: inline-block;
  cursor: pointer;
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

// 모바일 컨테이너
const MobileViewContainer = styled.div`
  position: absolute;
  width: 80vw;
  height: 50vh;
  background-color: #FFFFFF;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const App = () => {
  // Sample Text
  const sampleText = `[라이언] [오후 5:57] 안녕하세요 이 사이트는 어떻게 사용하는건가요?
[콘] [오후 5:57] 여기에 분석하고싶은 채팅방 기록을 붙여넣으면 채팅방 내용을 분석해서 시각화해주는 도구입니다~~
[라이언]] [오후 5:58] 아하! 그런데 대화내용은 어디서 가져오는거죠??
[튜브] [오후 5:59] 카카오톡 대화방에서 대화기록 내보내기로 내보낸 본문 내용 전체를 여기 붙여넣으면 되요~
[라이언] [오후 5:59] 넵넵!
[제이지] [오후 6:00] 근데 제 개인정보는 안전한건가요?
[무지] [오후 6:00] 서버와의 통신 기능이 없어서 데이터를 수집할 수 없는 구조에요!`
  
  // 채팅 내용 Input State
  const [chatText, setChatText] = useState('');
  // 채팅 내용 Input State 변경 감지 함수
  const onChangeChatText = e => setChatText(e.target.value);

  // 분석 결과 데이터 State
  const [analyzeResult, setAnalyzeResult] = useState({});

  // goToMain 버튼이 클릭되었을 경우
  const goToMainBtnClicked = () => {
    setAnalyzeResult({});
  }

  // Analyze 버튼이 클릭되었을 경우
  const AnalyzeBtnClicked = () => {
    // 입력된 값이 정상적이지 않을경우 처리 종료
    if (!chatText || chatText.trim().length <= 0 || chatText.trim() === '') { 
      setChatText('');
      return alert('[ERR] 입력 값이 존재하지 않습니다.');
    }

    // 워드클라우드 데이터를 보관할 오브젝트 초기화
    let tempWordCloudData = {};
    let wordCloudData = [];
    // 채팅 횟수를 기록할 오브젝트 초기화
    let tempChatCountData = {};
    let chatCountData = [];
    // 채팅 시간을 기록할 오브젝트 초기화
    let tempChatTimeData = {};
    let chatTimeData = [];
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
          
          // 채팅 시간을 chatTimeData에 저장
          if (!tempChatTimeData[chatTime.split(' ')[0] === '오후' ? String(Number(chatTime.split(':')[0].replace(/[^0-9]/g, '')) + 12) : String(Number(chatTime.split(':')[0].replace(/[^0-9]/g, '')))]) tempChatTimeData[chatTime.split(' ')[0] === '오후' ? String(Number(chatTime.split(':')[0].replace(/[^0-9]/g, '')) + 12) : String(Number(chatTime.split(':')[0].replace(/[^0-9]/g, '')))] = 0;
          tempChatTimeData[chatTime.split(' ')[0] === '오후' ? String(Number(chatTime.split(':')[0].replace(/[^0-9]/g, '')) + 12) : String(Number(chatTime.split(':')[0].replace(/[^0-9]/g, '')))] += 1;

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

    // 생성된 채팅시간 데이터를 가공해 배열화
    Object.keys(tempChatTimeData).forEach(time => {
      let tempObj = {};
      tempObj['time'] = time
      tempObj['value'] = tempChatTimeData[time];
      chatTimeData.push(tempObj);
    })
    chatTimeData.sort((a, b) => a.time - b.time);
    Object.keys(chatTimeData).forEach(time => {
      if (chatTimeData[time].time.length < 2) chatTimeData[time].time = '0' + chatTimeData[time].time
      chatTimeData[time].time += '시'
    })
    
    // 분석 결과를 저장할 변수
    const analyzeResult = {
      // 대화상대명(대화방명)
      chatRoomName: chatTextArr[0].split(' ')[0],
      wordCloudData: wordCloudData.sort((a, b) => a.value - b.value).reverse(),
      chatCountData: chatCountData.sort((a, b) => a.value - b.value).reverse(),
      chatTimeData: chatTimeData.sort((a, b) => a.time - b.time),
    }

    // 분석 결과가 존재하지 않을 경우 에러 처리
    if (analyzeResult.chatCountData <= 0 || analyzeResult.wordCloudData.length <= 0) {
      alert('[ERR] 카카오톡 채팅 데이터를 찾을 수 없습니다.\n올바른 데이터를 입력해주세요.');
      setChatText('');
      return
    }
    // 분석 결과를 anayzeResult State에 할당
    setAnalyzeResult(analyzeResult);
    console.log(analyzeResult.chatTimeData);
  }

  // PC 환경일 경우에만 렌더링
  if (!isMobile) return (
    <>
      <Header>
        <HeaderLogoImg src={LogoImg} alt='KCA Logo' onClick={goToMainBtnClicked} />
        <HeaderLogoTitle onClick={goToMainBtnClicked}>KakaoTalk Chat Analyzer</HeaderLogoTitle>
      </Header>
      <MainContainer>
        {!analyzeResult.wordCloudData ? <ContainerTitle>Chat paste here</ContainerTitle> : <ContainerTitle>✨ Top 50 Most used words </ContainerTitle>}
        {/* 워드클라우드 */}
        {!analyzeResult.wordCloudData &&
          <>
            <ChatTextInputBox onChange={onChangeChatText} value={chatText} placeholder={sampleText} />
            <Button height='40px' fontSize='15px' margin='10px 0 0 0' text='Analyze' onClick={AnalyzeBtnClicked} />
          </>
        }
        {analyzeResult.wordCloudData &&
          <>
            <ReactWordcloud style={{ backgroundColor: '#ffffff', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '20px', height: '400px' }} maxWords='100' words={analyzeResult.wordCloudData} options={{
              fontSizes: [30, 40]
            }} />
            <WordCountChart data={analyzeResult.wordCloudData} />
            <TimeCountChart data={analyzeResult.chatTimeData} />
            <ChatCountChart data={analyzeResult.chatCountData} />
          </>
        }

        {/* 확인 버튼 */}
        {analyzeResult.wordCloudData &&
          <Button height='40px' fontSize='15px' margin='25px 0' text='Go to Main' onClick={goToMainBtnClicked} />
        }
      </MainContainer>
    </>
  );
  
  // 모바일 환경에서 접속했을 경우
  else if (isMobile) return (
    <MobileViewContainer>
      <h1>Sorry</h1>
      <img src={ ErrorImg } alt='Error' />
      <p>아직 모바일 환경을 지원하지 않습니다.</p>
      <p>이용에 불편을 드려 죄송합니다.</p>
    </MobileViewContainer>
  )
}

export default App;
