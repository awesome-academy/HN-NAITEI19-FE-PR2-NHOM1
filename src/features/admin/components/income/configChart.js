const lineChart = {
  // series: [
  //   {
  //     name: 'Doanh thu',
  //     data: [350, 40, 300, 220, 500, 250, 400, 230, 500],
  //     offsetY: 0,
  //   },
  // ],

  options: {
    chart: {
      width: '100%',
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },

    yaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: ['#8c8c8c'],
        },
      },
    },

    xaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: [
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
          ],
        },
      },
      categories: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  },
};

export default lineChart;
