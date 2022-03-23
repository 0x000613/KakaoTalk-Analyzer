import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
import styled from 'styled-components';


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
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const TimeCountChart = ({ data }) => {
    return (
        <div style={{marginTop: '50px'}}>
            <ContainerTitle>🕐 Most active chatting time</ContainerTitle>
            <ChartWrapper>
                <ResponsiveBar
                    data={data}
                    keys={["value"]}
                    indexBy={["time"]}
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
        </div>
    );
};

export default TimeCountChart;