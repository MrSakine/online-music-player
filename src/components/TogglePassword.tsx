import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { FC } from "react";

interface TogglePasswordProps {
  showPassword: boolean;
  onToggle: () => void;
}

const TogglePassword: FC<TogglePasswordProps> = ({
  showPassword,
  onToggle,
}) => {
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={onToggle}
        onMouseDown={handleMouseDownPassword}
        onMouseUp={handleMouseUpPassword}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};

export default TogglePassword;
