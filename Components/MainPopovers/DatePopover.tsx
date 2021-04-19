import { Popover } from "@material-ui/core";
import Calendar from "react-calendar";

type Props = {
  dateAnchor: null | HTMLElement;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleDate: (value: Date) => void;
  initValue: Date;
};

const DatePopover = ({
  dateAnchor,
  handleClose,
  handleDate,
  initValue,
}: Props) => {
  return (
    <Popover
      anchorEl={dateAnchor}
      keepMounted
      open={Boolean(dateAnchor)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Calendar
        className={["c1", "c2"]}
        value={initValue}
        onChange={handleDate}
      />
    </Popover>
  );
};

export default DatePopover;
