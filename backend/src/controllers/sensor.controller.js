export function formatSensorData(data) {
  return {
    machineId: data.machineId,
    temperature: data.temperature,
    vibration: data.vibration,
    spindleSpeed: data.spindleSpeed,
    timestamp: new Date().toISOString()
  };
}