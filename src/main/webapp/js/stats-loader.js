// Draws stats charts
function buildChart(stats){
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(function() {drawChart(stats)});

  function drawChart(stats){
    const url = '/stats';
    fetch(url).then((response) => {
      return response.json();
    }).then((stats) => {
      let stats_data = new google.visualization.DataTable();

      //define columns for the DataTable instance
      stats_data.addColumn('string', 'Statistic');
      stats_data.addColumn('number', 'Value');
      stats_data.addColumn({type:'number', role:'annotation'});

      //add data to stats_data
      stats_data.addRows([
        ["Total message count", stats.messageCount, stats.messageCount],
        ["Total user count", stats.userCount, stats.userCount],
        ["Average message length", stats.averageMessageLength, stats.averageMessageLength],
      ]);

      let chart = new google.visualization.ColumnChart(document.getElementById('stats-chart'));
      let chart_options = {
        height: document.getElementById('stats-chart').getBoundingClientRect().width/2,
        width: document.getElementById('stats-chart').getBoundingClientRect().width,
        backgroundColor: 'transparent',
        legend: {position:'none'}
      };
      chart.draw(stats_data, chart_options);
    });
  }
}

// Fetch data and populate the UI of the page.
function buildUI(){
  buildChart();
  createMap();
}
