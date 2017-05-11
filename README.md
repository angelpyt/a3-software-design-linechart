# a3-software-design-linechart
The purpose of this software package is visualize any data by creating a line chart that contains multiple lines. 

## Instructions: Line Chart
### Steps:
##### 1. Create index.html and main.js
In order to get started, you will need to create a html file which include the LineChart.js file and a main.js file which would use line chart js file for your chosen data. 

Note: The line chart software intends to show multiple lines of the given dataset. Therefore, the data you choose should contain three variables, which the third variable should be an id that maps to multiple values. For example, country names or different categories that map to multiple x and y values. 

##### 2. Include data
Put your chosen dataset in a new data folder.

##### 3. Update main.js and index.html
Load data in main.js, define function to draw the line chart and call it.

### Methods:
#### chart
Function returned by LineChart. It creates the x and y axis for any given dataset. 

#### nestData
Nest your data by id, which is one variable in csv and defined in html file. Return data that is recombined through the id. 

#### line & paths
Define a line function that will return a `paths` element based on data. Path elements will be datajoined with the nested data. Then path elements will be used to handle entering and exiting elements.