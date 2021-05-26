import { useQuery } from "@apollo/client";
import { Menu, MenuItem, useMediaQuery } from "@material-ui/core";
import { useSession } from "next-auth/client";
import { useState } from "react";
import { COMMISSIONS_QUERY } from "../../apollo/apolloQueries";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  CommissionData,
  CommissionVars,
} from "../../interfaces/QueryInterfaces";

const DynamicNormalComm = dynamic(() => import("./Wraps/NormalComm"));
const DynamicMobileComm = dynamic(() => import("./Wraps/MobileComm"));

const CommissionWrap = ({ children }) => {
  const mobile = useMediaQuery("(max-width: 700px)");
  const [session] = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { data, fetchMore, loading } = useQuery<CommissionData, CommissionVars>(
    COMMISSIONS_QUERY,
    {
      variables: {
        id: session?.id,
        limit: 4,
      },
      skip: !session,
    }
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {mobile ? (
        <DynamicMobileComm
          children={children}
          userId={data?.userId}
          loading={loading}
          fetchMore={fetchMore}
          handleClick={handleClick}
        />
      ) : (
        <DynamicNormalComm
          children={children}
          userId={data?.userId}
          loading={loading}
          fetchMore={fetchMore}
          handleClick={handleClick}
        />
      )}

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link href="/commissions/yourCommissions/">
          <MenuItem button onClick={handleClose}>
            General
          </MenuItem>
        </Link>
        <Link href="/commissions/yourCommissions/pending">
          <MenuItem button onClick={handleClose}>
            Pending
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default CommissionWrap;
