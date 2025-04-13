import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function TestPopover() {
  return (
    <Popover>
      <PopoverTrigger>Click me</PopoverTrigger>
      <PopoverContent>Popover content</PopoverContent>
    </Popover>
  );
}
