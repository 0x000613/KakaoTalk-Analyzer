import React from 'react';
import { ResponsivePie } from '@nivo/pie'
import styled from 'styled-components';

// 컨테이너 타이틀
const ContainerTitle = styled.h1`
  color: orange;
  margin-left: 10px;
  margin-top: 50px;
  margin-bottom: 10px;
  display: inline-block;
`

// 차트 컨테이너
const ChartContainer = styled.div`
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    background-color: #FFFFFF;
    box-sizing: border-box;
    height: 400px;
`

// 차트 래퍼
const ChartWrapper = styled.div`
    width: 500px;    
    height: 400px;
`

const TopUser = styled.p`
    margin-top: 40px;
    margin-left: 3px;
`

const ChatCountChart = ({ data }) => {
    return (
        <>
        <ContainerTitle>🔥 Number of message</ContainerTitle>
            <ChartContainer>
                <div style={{marginTop: '18px', marginLeft: '10px', width: '50%'}}>
                    <h2>Top 5 Best Talker</h2>
                    {data.slice(0, 5).map((sender, index) => (
                        <TopUser key={index}>{ index + 1 }. { sender.id }</TopUser>   
                    ))}
                </div>
                <ChartWrapper>
                    <ResponsivePie
                        style={{marginTop: '30px', zIndex: '1000'}}
                        data={data}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: "color" }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
                    />
                </ChartWrapper>
            </ChartContainer>
        </>
    );
};

export default ChatCountChart;