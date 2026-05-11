export function tsToMs(timeStamp: string): number {
  const [hms, ms] = timeStamp.split('.') as [string, string]
  const [h, m, s] = hms.split(':').map(Number) as [number, number, number]
  return (h * 3600 + m * 60 + s) * 1000 + Number(ms)
}


export function nowMs(): number {
  const now = new Date();
  return (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();
}