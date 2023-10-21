import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  ReferenceArea,
  Tooltip,
} from "recharts";

import { format, fromUnixTime } from "date-fns";
import { Container } from "@mui/material";

type PetWeightGraphProps = {
  minimumWeight: number;
  maximumWeight: number;
  weighIns: {
    date: number;
    weight: number;
  }[];
};

const formatXAxis = (tickItem: number): string => {
  return format(fromUnixTime(tickItem), "y-MM-dd");
};

function PetWeightGraph(props: PetWeightGraphProps) {
  return (
    <Container>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={props.weighIns}>
          <Line
            isAnimationActive={false}
            name="Weight (kg)"
            type="monotone"
            dataKey="weight"
            strokeWidth={3}
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            tickMargin={10}
            type="number"
            domain={["auto", "auto"]}
          />
          <YAxis />
          <Legend
            wrapperStyle={{
              paddingTop: "10px",
            }}
          />
          <ReferenceArea
            y1={props.minimumWeight}
            y2={props.maximumWeight}
            fill="green"
            fillOpacity={0.3}
            stroke="darkgreen"
            strokeOpacity={0.4}
          />
          <Tooltip labelFormatter={formatXAxis} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default PetWeightGraph;
