import { Shift } from '@/db/schema';

export const ShiftsGrid = ({ shifts }: { shifts: Shift[] }) => {
  return (
    <div className="mt-6 space-y-2">
      {shifts
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map((shift) => (
          <div
            key={shift.id}
            className="grid grid-cols-3 justify-items-center rounded p-2"
          >
            <span>{new Date(shift.date).toLocaleDateString()}</span>
            <span>{shift.hours}h</span>
            <span>${shift.tips}</span>
          </div>
        ))}
    </div>
  );
};
