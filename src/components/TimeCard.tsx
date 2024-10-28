import React from 'react';

interface Record {
  id: number;
  name: string;
  pin: string;
  action: string;
  time: string;
  ip: string;
}

interface TimeCardProps {
  records: Record[];
}

const TimeCard: React.FC<TimeCardProps> = ({ records }) => {
  const groupedRecords: { [pin: string]: { name: string; records: Record[] } } = {};
  const uniqueIps: { [pin: string]: Set<string> } = {};

  records.forEach((record) => {
    if (!groupedRecords[record.pin]) {
      groupedRecords[record.pin] = { name: record.name, records: [] };
      uniqueIps[record.pin] = new Set();
    }
    groupedRecords[record.pin].records.push(record);
    uniqueIps[record.pin].add(record.ip);
  });

  if (records.length === 0) {
    return (
      <div className="time-card">
        <p>No one has clocked in yet.</p>
      </div>
    );
  }

  return (
    <div className="time-card">
      <h2 style={{ font: 'bold 1.5rem' }}>Today's Time Cards</h2>
      {Object.entries(groupedRecords).map(([pin, data], index) => (
        <div key={index}>
          <h3>{data.name} - {pin}</h3>
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>Time</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              {data.records.map((record, idx) => (
                <tr key={idx}>
                  <td>{record.action}</td>
                  <td>{record.time}</td>
                  <td style={{ backgroundColor: uniqueIps[pin].size > 1 ? 'yellow' : 'transparent' }}>
                    {record.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TimeCard;
