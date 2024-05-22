export const Navbar = () => {
  return (
    <div className="sticky top-0 flex flex-col bg-white p-3 shadow-md">
      <Toggle />
      <DaysInWeek />
    </div>
  );
};

const Toggle = () => {
  return (
    <div className="flex justify-between px-3 pb-2 text-lg font-semibold">
      <p>2</p>
      <div className="flex gap-3">
        <button>&lt;</button>
        <button>Today</button>
        <button>&gt;</button>
      </div>
    </div>
  );
};

const DaysInWeek = () => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div className="grid flex-1 grid-cols-7">
      {days.map((day) => (
        <p className="grow text-center text-sm">{day}</p>
      ))}
    </div>
  );
};
