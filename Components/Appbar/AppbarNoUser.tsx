import { IconButton, Avatar } from "@material-ui/core";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicNoUserPop = dynamic(() => import("./Popovers/NoUserPopover"));

const AppbarNoUser = () => {
  const [profAnchor, setprofAnchor] = useState<null | HTMLElement>(null);
  const handleProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setprofAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setprofAnchor(null);
  };

  return (
    <div>
      <IconButton onClick={handleProfile}>
        <Avatar src="" />
      </IconButton>
      <DynamicNoUserPop
        profAnchor={profAnchor}
        handleProfileClose={handleProfileClose}
      />
    </div>
  );
};

export default AppbarNoUser;
