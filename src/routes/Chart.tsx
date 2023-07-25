import React from 'react';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

interface ChartPrpos {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartPrpos) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    // { refetchInterval: 5000 },
    // {
    //   onError: err => {
    //     console.log(err);
    //   },
    // },
  );
  // if (isError) {
  //   return <div>error</div>;
  // }
  return (
    <div>
      {isLoading ? (
        'loading...'
      ) : (
        <ApexChart
          type='line'
          options={{
            chart: { background: 'transparent', height: 500, width: 500, toolbar: { show: false } },
            theme: { mode: 'dark' },
            stroke: { curve: 'smooth', width: 4 },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: 'datetime',
              categories: data?.map(price => {
                let date = new Date(price.time_close * 1000).toUTCString();
                return date;
              }),
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
            },
            colors: ['#0fbcf9'],
            tooltip: {
              y: {
                formatter: value => `${value.toFixed(3)}`,
              },
            },
          }}
          series={[{ name: 'Price', data: data?.map(price => parseFloat(price.close)) ?? [] }]}
        />
      )}
    </div>
  );
}

export default Chart;
