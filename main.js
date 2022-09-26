const linearSearchForm = document.getElementById("linearSearchForm");
let width, height, margin;
if (window.innerWidth < 480) {
  width = window.innerWidth;
  height = window.innerHeight;
  margin = { top: 50, right: 50, bottom: 50, left: 50 };
} else {
  width = 600;
  height = 600;
  margin = { top: 100, right: 100, bottom: 100, left: 100 };
}

let xValues = d3.range(101);

let xScale = d3
  .scaleLinear()
  .domain([d3.min(xValues), d3.max(xValues)])
  .range([margin.left, width - margin.right]);

let xScaleRev = d3
  .scaleLinear()
  .domain([margin.left, width - margin.right])
  .range([d3.min(xValues), d3.max(xValues)]);

let yValues = d3.range(101);

let yScale = d3
  .scaleLinear()
  .domain([d3.min(yValues), d3.max(yValues)])
  .range([height - margin.bottom, margin.top]);

let yScaleRev = d3
  .scaleLinear()
  .domain([height - margin.bottom, margin.top])
  .range([d3.min(yValues), d3.max(yValues)]);

function createScatterPlotGraph(id) {
  let div = d3.select("#linearSearchGraph").append("div");
  let svg = div
    .append("svg")
    .attr("id", id)
    .attr("width", width)
    .attr("height", height);

  svg
    .append("g")
    .call(d3.axisLeft(yScale))
    .attr("transform", `translate(${margin.left},0)`);

  svg
    .append("g")
    .call(d3.axisBottom(xScale))
    .attr("transform", `translate(0,${height - margin.bottom})`);
  div.append("p").attr("class", "label").text(id);
  return svg;
}

function linearSearch(values, ...searchValues) {
  let tries = [];

  for (let i = 0; i < searchValues.length; i++) {
    let try_ = 0;

    for (let j = 0; j < values.length; j++) {
      if (parseInt(searchValues[i]) === parseInt(values[j])) {
        break;
      }
      try_++;
    }

    tries.push([searchValues[i], try_]);
  }
  return tries;
}

function binarySearch(values, searchValues) {
  let tries = [];

  for (let i = 0; i < searchValues.length; i++) {
    let try_ = 0;
    let lowerNumber = 0;
    let upperNumber = values.length - 1;

    while (lowerNumber <= upperNumber) {
      try_++;
      let midIndex = Math.floor((lowerNumber + upperNumber) / 2);
      if (parseInt(values[midIndex]) === parseInt(searchValues[i])) {
        break;
      } else if (parseInt(values[midIndex]) < parseInt(searchValues[i])) {
        lowerNumber = parseInt(values[midIndex]) + 1;
      } else {
        upperNumber = parseInt(values[midIndex]) - 1;
      }
    }

    tries.push([searchValues[i], try_]);
  }
  return tries;
}

let linearSvg = createScatterPlotGraph("linearSearch");
let binarySvg = createScatterPlotGraph("binarySearch");

linearSearchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let searchValues = e.target.elements[0].value.split(",");

  let linearData = linearSearch(xValues, ...searchValues).map(
    ([value, try_]) => {
      return {
        x: xScale(value),
        y: yScale(try_),
      };
    }
  );

  let binaryData = binarySearch(xValues, searchValues).map(([value, try_]) => {
    return {
      x: xScale(value),
      y: yScale(try_),
    };
  });

  linearSvg
    .append("g")
    .selectAll("circle")
    .data(linearData)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 8)
    .on("mouseover", function (e, i) {
      makeXYIndicationLinesAndText(this, e, i, linearSvg);
    })
    .on("mouseleave", function (e, i) {
      removeXYIndicationLines(this, e, i, linearSvg);
    });

  binarySvg
    .append("g")
    .selectAll("circle")
    .data(binaryData)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 8)
    .on("mouseover", function (e, i) {
      makeXYIndicationLinesAndText(this, e, i, binarySvg);
    })
    .on("mouseleave", function (e, i) {
      removeXYIndicationLines(this, e, i, binarySvg);
    });
});
