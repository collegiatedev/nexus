"use client";

import { Filter, Search } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useMyStore } from "~/lib/store/provider";

export const CalendarNav = () => {
  // manually sync up with calendar.tsx
  // NAVBAR_HEIGHT = "150px";
  return (
    <nav className={`fixed top-0 z-50 h-[150px] w-full border-b bg-background`}>
      <div className="flex h-full flex-col items-center justify-end">
        <NavControls />
        <DaysOfWeek />
      </div>
    </nav>
  );
};

const DaysOfWeek = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="flex w-full flex-wrap items-center justify-around opacity-85">
      {daysOfWeek.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
};

const NavControls = () => {
  const navMonth = useMyStore((state) => state.getNavMonthString());
  return (
    <div className="flex w-full flex-wrap items-center justify-between px-8 pb-4">
      <span className="text-6xl font-medium tracking-tight">{navMonth}</span>
      <TooltipProvider>
        <div className="flex flex-col items-end gap-2.5">
          <MonthToggle />
          <TaskToggle />
        </div>
      </TooltipProvider>
    </div>
  );
};
const CONTROL_STYLING =
  "rounded-md p-1 transition-colors duration-200 hover:bg-primary/10 hover:bg-opacity-85";

const TaskToggle = () => {
  return (
    <div className="flex items-center gap-3 font-medium tracking-tight opacity-85">
      <Tooltip>
        <TooltipTrigger>
          <Filter className={`h-6 w-6 ${CONTROL_STYLING}`} />
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <span>Filter</span>
        </TooltipContent>
      </Tooltip>
      <SearchControl />
      <Select>
        <SelectTrigger className="h-8 min-w-[180px] font-normal transition-colors duration-200 hover:bg-primary/10">
          <SelectValue placeholder="Jesse's Team" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dark">Jesse's Team</SelectItem>
          <SelectItem value="light">Bob's Team</SelectItem>
          <SelectItem value="system">Jim's Team</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

const SearchControl = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Tooltip>
      <div className="flex items-center gap-1">
        <TooltipTrigger
          onClick={() => {
            // toggles search open/closed
            setIsSearchOpen(!isSearchOpen);
            // if search is open focus on input, else clear input
            if (!isSearchOpen)
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            else setSearchValue("");
          }}
        >
          <Search className={`h-6 w-6 ${CONTROL_STYLING}`} />
        </TooltipTrigger>
        <Input
          ref={inputRef}
          placeholder="Type to search..."
          className={`h-6 ${
            isSearchOpen ? "w-[180px] opacity-100" : "w-0 opacity-0"
          } border-0 bg-transparent px-0 transition-all duration-200 ease-in-out focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0`}
          style={{ outline: "none", boxShadow: "none" }}
          onFocus={(e) => (e.target.style.outline = "none")}
          onBlur={(e) => (e.target.style.outline = "none")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <TooltipContent side="bottom">
          <span>Search</span>
        </TooltipContent>
      </div>
    </Tooltip>
  );
};

const MonthToggle = () => {
  const { setCurrentMonth, setPreviousMonth, setNextMonth } = useMyStore(
    (state) => state,
  );
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
  return (
    <div className="text-2xl font-medium tracking-tight">
      <button
        className={`${CONTROL_STYLING} opacity-60`}
        onClick={() => {
          setPreviousMonth();
          scrollToTop();
        }}
      >
        {"<"}
      </button>
      <button
        className={`${CONTROL_STYLING} px-3`}
        onClick={() => {
          setCurrentMonth();
          scrollToTop();
        }}
      >
        Today
      </button>
      <button
        className={`${CONTROL_STYLING} opacity-60`}
        onClick={() => {
          setNextMonth();
          scrollToTop();
        }}
      >
        {">"}
      </button>
    </div>
  );
};
