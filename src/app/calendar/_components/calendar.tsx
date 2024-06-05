import { DnDBoard } from "./dnd/board";
import { Month } from "./month";

export const Calendar = () => {
  return (
    <DnDBoard>
      <Month whichMonth={4} />
      <div className="h-[100px]" />
      <Month whichMonth={5} />
    </DnDBoard>
  );
};
