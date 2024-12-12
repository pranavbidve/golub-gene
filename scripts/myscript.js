// add your JavaScript/D3 to this file


const margin = { top: 50, right: 30, bottom: 10, left: 50 };
const width = 900 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const excludedFeatures = ["BM.PB", "Source", "tissue.mf", "cancer"];

const svg = d3.select("#parallel-coordinates")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

let features = []; // Selected features
let allFeatures = []; // All available features
let dimensions = {}; // Scales for dimensions
let colorScale;
let colorByGender = false; // Track whether to color lines by Gender

d3.csv("https://raw.githubusercontent.com/pranavbidve/golub-gene/refs/heads/main/data/top_50.csv").then(data => {
  allFeatures = Object.keys(data[0])
    .slice(1) // Skip the first column (e.g., 'Samples')
    .filter(feature => !excludedFeatures.includes(feature)); // Exclude specified features

  // Add feature selection buttons
  d3.select("#controls")
    .selectAll("button")
    .data(allFeatures)
    .enter()
    .append("button")
    .text(d => d)
    .on("click", function(event, feature) {
      const button = d3.select(this);
      if (feature === "Gender") {
        colorByGender = !colorByGender; // Toggle coloring by Gender
        button.classed("selected", colorByGender);
      } else {
        if (features.includes(feature)) {
          features = features.filter(f => f !== feature); // Remove feature
          button.classed("selected", false);
        } else {
          features.push(feature); // Add feature
          button.classed("selected", true);
        }
      }
      updatePlot(data);
    });

  // Set up color scale for Gender
  const genders = Array.from(new Set(data.map(d => d.Gender)));
  colorScale = d3.scaleOrdinal()
    .domain(genders)
    .range(["steelblue", "orange"]);

  // Initial empty plot
  updatePlot(data);
});

function updatePlot(data) {
  svg.selectAll("*").remove(); // Clear previous plot

  if (features.length === 0) return; // Exit if no features are selected

  // Set scales for each feature
  features.forEach(feature => {
    dimensions[feature] = d3.scaleLinear()
      .domain(d3.extent(data, d => +d[feature])) // Convert to number
      .range([height, 0]);
  });

  // Set x-scale for feature positions
  const x = d3.scalePoint()
    .domain(features)
    .range([0, width]);

  // Draw lines
  svg.selectAll(".line")
    .data(data.filter(d => features.every(feature => !isNaN(+d[feature])))) // Filter invalid rows
    .join("path")
    .attr("class", "line")
    .attr("d", d => d3.line()
      .x((_, i) => x(features[i]))
      .y((_, i) => dimensions[features[i]](+d[features[i]]))(features))
    .attr("stroke", d => colorByGender ? colorScale(d.Gender) : "steelblue")
    .transition() // Add animation
    .duration(2000)
    .attrTween("stroke-dasharray", function() {
      const length = this.getTotalLength();
      return d3.interpolateString(`0,${length}`, `${length},${length}`);
    });

  // Draw axes
  features.forEach(feature => {
    const axis = d3.axisLeft(dimensions[feature]);
    svg.append("g")
      .attr("transform", `translate(${x(feature)},0)`)
      .call(axis)
      .append("text")
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr("y", -10)
      .attr("x", 0)
      .text(feature); // Use feature name as axis label
  });
}
