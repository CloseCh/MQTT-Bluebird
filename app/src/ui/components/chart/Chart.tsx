import { useMemo } from 'react';
import { BaseChart } from './BaseChart.js';

export type ChartProps = {
  data: number[];
  maxDataPoints: number;
};

export function Chart(props: ChartProps) {
  const preparedData = useMemo(() => {
    const points = props.data.map((point, index) => ({
      value: point,
      index: index  // ← Añade una clave única
    }));
    return [
      ...points, 
      ...Array.from({length: props.maxDataPoints - points.length}, (_, i) => ({ 
        value: undefined,
        index: points.length + i  // ← Continúa la secuencia
      }))
    ];
  }, [props.data, props.maxDataPoints]);

  return <BaseChart data={preparedData} fill={"#0A4D5C"} stroke={"#5DD4EE"} />;
}