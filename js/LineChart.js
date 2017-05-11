// Create a line chart
var LineChart = function() {
    // Set default values
    var height = 500,
        width = 800,
        xScale = d3.scaleLinear(),
        yScale = d3.scaleLinear(),
        xTitle = 'X Axis Title',
        yTitle = 'Y Axis Title',
        title = 'Chart title',
        color = 'green',
        margin = {
            left: 70,
            bottom: 50,
            top: 30,
            right: 10,
        };

    // Function returned by LineChart
    var chart = function(selection) {
        // Height/width of the drawing area itself
        var chartHeight = height - margin.bottom - margin.top;
        var chartWidth = width - margin.left - margin.right;

        // Iterate through selections, in case there are multiple
        selection.each(function(data) {
            // Use the data-join to create the svg (if necessary)
            var ele = d3.select(this);
            var svg = ele.selectAll("svg").data([data]);

            // Append static elements (i.e., only added once)
            var svgEnter = svg.enter()
                .append("svg")
                .attr('width', width)
                .attr("height", height);

            // Title G
            svgEnter.append('text')
                .attr('transform', 'translate(' + (margin.left + chartWidth / 2) + ',' + 20 + ')')
                .text(title)
                .attr('class', 'chart-title')

            // g element for markers
            svgEnter.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr("class", 'chartG');

            // Append axes to the svgEnter element
            svgEnter.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + (chartHeight + margin.top) + ')')
                .attr('class', 'axis x');

            svgEnter.append('g')
                .attr('class', 'axis y')
                .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')

            // Add a title g for the x axis
            svgEnter.append('text')
                .attr('transform', 'translate(' + (margin.left + chartWidth / 2) + ',' + (chartHeight + margin.top + 40) + ')')
                .attr('class', 'title x');

            // Add a title g for the y axis
            svgEnter.append('text')
                .attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + chartHeight / 2) + ') rotate(-90)')
                .attr('class', 'title y');

            // Define xAxis and yAxis functions
            var xAxis = d3.axisBottom().tickFormat(d3.format('.2s'));
            var yAxis = d3.axisLeft().tickFormat(d3.format('.2s'));

            // Calculate x and y scales
            var xMax = d3.max(data, (d) => +d.x);
            var xMin = d3.min(data, (d) => +d.x);
            xScale.range([0, chartWidth]).domain([xMin, xMax]);

            var yMin = d3.min(data, (d) => +d.y) * .95;
            var yMax = d3.max(data, (d) => +d.y) * 1.05;
            yScale.range([chartHeight, 0]).domain([yMin, yMax]);

            // Update axes
            xAxis.scale(xScale);
            yAxis.scale(yScale);
            ele.select('.axis.x').transition().duration(1000).call(xAxis);
            ele.select('.axis.y').transition().duration(1000).call(yAxis);

            // Update titles
            ele.select('.title.x').text(xTitle)
            ele.select('.title.y').text(yTitle)

            //Nest data by id
            var nestData = d3.nest()
                .key(function(d) {
                    return d.id;
                })
                .entries(data);

            //Define a line function that will return a `path` element based on data
            var line = d3.line()
                    .x(function(d) { return xScale(+d.x); })
                    .y(function(d) { return yScale(+d.y); });

            //Do a datajoin between your path elements and the nested data
            var paths = ele.select('.chartG').selectAll('path').data(nestData, (d) => d.id);

            //Handle entering elements
            paths.enter().append("path")
                .attr('class', 'nestData')
                .attr("fill", "none")
                .attr("d", function(d) {
                    return line(d.values)
                })
                .style("stroke-width", 1.5)
                .style("stroke", color)
                .attr("stroke-dasharray", function(d) {
                    var totalLength = d3.select(this).node().getTotalLength();
                    return (totalLength + " " + totalLength); 
                })
                .attr("stroke-dashoffset", function(d) {
                    return -d3.select(this).node().getTotalLength();
                })
                .transition()
                .duration(2500)
                .attr("stroke-dashoffset", function(d) {
                    return 0;
                });

            //Handle exiting elements
            paths.exit()
                .remove();
        });
    };

    // Getter/setter methods to change locally scoped options
    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.fill = function(value) {
        if (!arguments.length) return fill;
        fill = value;
        return chart;
    };

    chart.xTitle = function(value) {
        if (!arguments.length) return xTitle;
        xTitle = value;
        return chart;
    };

    chart.yTitle = function(value) {
        if (!arguments.length) return yTitle;
        yTitle = value;
        return chart;
    };

    return chart;
};

