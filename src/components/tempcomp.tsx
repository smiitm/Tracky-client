import { useState } from "react";
import { format, differenceInMinutes } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Temp = () => {
  // State to store date, start time, end time, and duration
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>(""); // "HH:mm" format
  const [endTime, setEndTime] = useState<string>(""); // "HH:mm" format
  const [duration, setDuration] = useState<string | null>(null);

  // Handle Duration Calculation
  const calculateDuration = () => {
    if (selectedDate && startTime && endTime) {
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      const startDateTime = new Date(selectedDate);
      startDateTime.setHours(startHour, startMinute);

      const endDateTime = new Date(selectedDate);
      endDateTime.setHours(endHour, endMinute);

      // Calculate the difference in minutes
      const minutes = differenceInMinutes(endDateTime, startDateTime);
      if (minutes >= 0) {
        setDuration(`${Math.floor(minutes / 60)} hrs ${minutes % 60} mins`);
      } else {
        setDuration("End time must be after start time");
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Date Picker */}
      <div>
        <label className="block text-sm font-medium">Select Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={selectedDate|| undefined}
              onSelect={(date: Date | undefined) => setSelectedDate(date||null)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Start Time Picker */}
      <div>
        <label className="block text-sm font-medium">Start Time</label>
        <Input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="Start Time"
        />
      </div>

      {/* End Time Picker */}
      <div>
        <label className="block text-sm font-medium">End Time</label>
        <Input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="End Time"
        />
      </div>

      {/* Calculate Duration */}
      <div>
        <Button onClick={calculateDuration} disabled={!selectedDate || !startTime || !endTime}>
          Calculate Duration
        </Button>
      </div>

      {/* Show Duration */}
      {duration && (
        <div className="mt-4">
          <p className="text-sm font-medium">Session Duration: {duration}</p>
        </div>
      )}
    </div>
  );
};

export default Temp;
