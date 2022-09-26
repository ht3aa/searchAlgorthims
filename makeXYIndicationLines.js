function makeXYIndicationLinesAndText(target, e, i, selector) {
  d3.select(target).attr("fill", "blue");
  let lineGenerator = d3.line();
  selector
    .append("text")
    .attr("id", `t-${Math.floor(i.x)}`)
    .attr("x", i.x - 30)
    .attr("y", i.y - 20)
    .attr("class", "italic")
    .text(`(${Math.round(xScaleRev(i.x))},${Math.round(yScaleRev(i.y))})`);
  let lineX = lineGenerator([
    [i.x, i.y],
    [i.x, height - margin.bottom],
  ]);
  selector
    .append("path")
    .attr("d", lineX)
    .attr("id", `x-${Math.floor(i.x)}`)
    .attr("fill", "none")
    .attr("stroke", "blue");
  let lineY = lineGenerator([
    [i.x, i.y],
    [margin.left, i.y],
  ]);
  selector
    .append("path")
    .attr("d", lineY)
    .attr("id", `y-${Math.floor(i.x)}`)
    .attr("fill", "none")
    .attr("stroke", "blue");
}

function removeXYIndicationLines(target, e, i, selector) {
  d3.select(target).attr("fill", "black");
  selector.select(`#x-${Math.floor(i.x)}`).remove();
  selector.select(`#y-${Math.floor(i.x)}`).remove();
  selector.select(`#t-${Math.floor(i.x)}`).remove();
}
