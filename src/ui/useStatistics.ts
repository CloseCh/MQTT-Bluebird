import { useEffect, useState } from 'react';

// export function useStatistics(dataPointCount: number){
//   const [value, setValue] = useState<Statistics[]>([]);

//   useEffect(() => {
//     const unsub = window.electron.subscribeStatistics((stats) =>
//       setValue( prev => {
//         const newData = [...prev, stats];
        
//         if (newData.length > dataPointCount) {
//           newData.shift();
//         }

//         return newData;
//       })
//     );
//     return unsub;
//   }, []);

//   return value;
// } 

export function useMQTT(dataPointCount: number){
  const [value, setValue] = useState<MQTTmessage[]>([]);

  useEffect(() => {
    const unsub = window.electron.subscribeMQTT((stats) =>
      setValue( prev => {
        const newData = [...prev, stats];
        
        if (newData.length > dataPointCount) {
          newData.shift();
        }

        return newData;
      })
    );
    return unsub;
  }, []);

  return value;
} 