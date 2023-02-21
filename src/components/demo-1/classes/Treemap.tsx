import * as d3 from "d3";
import "../scss/Treemap.scss";

const sum = array => array.reduce((sum, e) => (sum += e), 0);

export class Treemap {
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.dimensions = {
      width: parseInt(d3.select(container).style("width"), 10),
      height: parseInt(d3.select(container).style("height"), 10)
    };
    this.nestingOrder = ["YEAR", "DESCRIPTION", "WEIGHT"];
    this.setSubcontainers();
  }

  hierarchy = null;
  layout = null;
  categoricalScale = d3.scaleOrdinal().unknown("gray");

  createScale(hierarchy) {
    const set = d3.set(hierarchy.leaves(), d => d.data.key);
    return this.categoricalScale
      .domain(set.values())
      .range(d3.schemeCategory10);
  }

  nestData(data) {
    return this.nestingOrder
      .reduce((nest, e) => nest.key(d => d[e]), d3.nest())
      .rollup(g =>
        sum(
          g.map(e =>
            sum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => e[m]))
          )
        )
      )
      .entries(data);
  }

  createHierarchyAndLayout(data) {
    const { width, height } = this.dimensions;
    const nest = this.nestData(data);
    const rootNode = { root: "root", values: nest };
    const hierarchy = d3
      .hierarchy(rootNode, d => d.values)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    const layout = this.createLayout(width, height)(hierarchy);
    return { hierarchy, layout };
  }

  createLayout(width, height) {
    return d3
      .treemap()
      .size([width, height])
      .paddingInner(1)
      .paddingOuter(2)
      .round(true);
  }

  setSubcontainers() {
    d3.select(this.container)
      .append("div")
      .attr("class", "treemap-wrapper")
      .append("div")
      .attr("class", "treemap-container");
  }

  render() {
    const { hierarchy, layout } = this.createHierarchyAndLayout(this.data);
    this.hierarchy = hierarchy;
    this.layout = layout;
    this.categoricalScale = this.createScale(hierarchy);

    d3.select(this.container)
      .select(".treemap-container")
      .selectAll(".leaf")
      .data(layout.leaves())
      .enter()
      .call(this.renderNewLeaves);
  }

  renderNewLeaves = selection => {
    const leaves = selection
      .append("div")
      .attr("class", "leaf")
      .style("background-color", d => this.categoricalScale(d.data.key));
    leaves
      .call(this.relocateLeaves)
      .call(this.resizeLeaves)
      .call(this.createLabel);
    leaves.attr("title", this.setLeafTitle);
  };

  relocateLeaves = sel => {
    sel.style("left", d => d.x0 + "px").style("top", d => d.y0 + "px");
  };

  resizeLeaves = sel => {
    sel
      .style("width", d => d.x1 - d.x0 + "px")
      .style("height", d => d.y1 - d.y0 + "px");
  };

  setLeafTitle = ({ data, value }) => {
    return `${value}, (${((value / this.layout.value) * 100).toFixed(1)}%) - ${
      data.key
    }`;
  };

  createLabel = sel => {
    sel
      .append("div")
      .attr("class", "leaf-label")
      .call(this.setLabelContent);
  };

  setLabelContent = sel => {
    sel
      .append("h1")
      .attr("class", "leaf-total")
      .text(d => d.value.toLocaleString());
    sel
      .append("span")
      .attr("class", "leaf-pct")
      .text(d => `${((d.value / this.layout.value) * 100).toFixed(1)}%`);
    sel
      .append("span")
      .attr("class", "leaf-name")
      .text(d => d.data.key);
  };
}
