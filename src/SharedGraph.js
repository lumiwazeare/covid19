import Plotly from "plotly.js-basic-dist-min";
import { useEffect } from "react";
import createPlotlyComponent from "react-plotly.js/factory";

const SharedGraph = ({sideBarOpen, graph}) => {
    const Plot = createPlotlyComponent(Plotly);

    useEffect(() => {
        Plotly.Plots.resize("plotlyChart");
         }, [sideBarOpen]);
       
           return (
             <Plot
               divId="plotlyChart"
               data={[
                 {
                   x: graph.x,
                   y: graph.y,
                   type: 'scatter',
                   marker: {color: 'red'},
                 },
               ]}
               layout={{autosize: true, title: ''}}
               useResizeHandler={sideBarOpen}
               className="me-auto h-full"
               style={{width:"92%",}}
             />
           );
}

export default SharedGraph;