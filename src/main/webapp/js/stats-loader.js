// Fetch stats and display them in the page.
function fetchStats(){
  const url = '/stats';
  fetch(url).then((response) => {
    return response.json();
  }).then((stats) => {
    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = '';

    const messageCountElement = buildStatElement('Total message count: ' + stats.messageCount);
    statsContainer.appendChild(messageCountElement);

    const userCountElement = buildStatElement('Total user count: ' + stats.userCount);
    statsContainer.appendChild(userCountElement);

    const averageMessageLengthElement = buildStatElement('Average message length: ' + stats.averageMessageLength);
    statsContainer.appendChild(averageMessageLengthElement);
  });
}

// Build html p element from string
function buildStatElement(statString){
  const statElement = document.createElement('p');
  statElement.appendChild(document.createTextNode(statString));
  return statElement;
}

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

      let chart = new google.visualization.BarChart(document.getElementById('stats-chart'));
      let chart_options = {
        width: 600,
        height: 300,
        chartArea: {left:'25%'},
        legend: {position:'none'}
      };
      chart.draw(stats_data, chart_options);
    });
  }
}

// Fetch data and populate the UI of the page.
function buildUI(){
  fetchStats();
  buildChart();
}
