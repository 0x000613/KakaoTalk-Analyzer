import { React, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar'
import styled from 'styled-components';

const OptionsContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 50px;
    align-items: center;
`

const OptionButtonsContainer = styled.div`
    display: flex;
    margin-left: 170px;
`

const OptionButton = styled.button`
    cursor: pointer;
    border: orange 2px solid;
    border-radius: 20px;
    padding: 5px 20px;
    background-color: ${props => props.showingAmount === props.amount ? 'orange' : '#FFFFFF'};
    margin-right: 10px;
    outline: none;
`

// 컨테이너 타이틀
const ContainerTitle = styled.h1`
  color: orange;
  margin-left: 10px;
  margin-bottom: 10px;
  display: inline-block;
`

// 차트 래퍼
const ChartWrapper = styled.div`
    width: 100%;    
    height: 400px;
    background-color: #FFFFFF;
    border-radius: 20px;
`

const WordCountChart = ({ data }) => {
    // 현재 선택된 표시개수 옵션 State
    const [showingAmount, setShowingAmount] = useState('10');
    // 표시개수 옵션 버튼 클릭 핸들러 함수
    const optionBtnClicked = (e) => { 
        setShowingAmount(e.currentTarget.innerHTML);
    }

    return (
        <>
            <OptionsContainer>
                <ContainerTitle>✨ Top {showingAmount} Most used words</ContainerTitle>
                <OptionButtonsContainer>
                    <OptionButton amount='10' showingAmount={ showingAmount } onClick={ optionBtnClicked }>10</OptionButton>
                    <OptionButton amount='20' showingAmount={ showingAmount } onClick={ optionBtnClicked }>20</OptionButton>
                    <OptionButton amount='30' showingAmount={ showingAmount } onClick={ optionBtnClicked }>30</OptionButton>
                </OptionButtonsContainer>
            </OptionsContainer>
            <ChartWrapper>
                <ResponsiveBar
                    data={data.slice(0, Number(showingAmount) - 1)}
                    keys={["value"]}
                    indexBy={["text"]}
                    margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                    padding={0.4}
                    valueScale={{ type: "linear" }}
                    colors="orange"
                    animate={true}
                    enableLabel={false}
                    axisTop={null}
                    axisRight={null}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: null,
                        legendPosition: "middle",
                        legendOffset: -40
                    }}
                />
        </ChartWrapper>
        </>
    );
};

export default WordCountChart;