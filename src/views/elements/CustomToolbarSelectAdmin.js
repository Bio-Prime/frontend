import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { withStyles } from "@material-ui/core/styles";
import UserDetails from "../pages/UserDetails";
import UsersColumns from "./UsersColumns";
import { Delete } from "@material-ui/icons";
import UserService from "../../services/UserService";

const defaultToolbarSelectStyles = {
  iconButton: {},
  iconContainer: {
    marginRight: "24px",
  },
  inverseIcon: {
    transform: "rotate(90deg)",
  },
};

function CustomToolbarSelectAdmin(props) {
  // the row that was selected
  let selectedRow = props.selectedRows.data[0].index;

  // the data of the row that was selected
  let dataArray = props.displayData[selectedRow].data;

  // data json
  let dataJson = {};
  const columns = UsersColumns.getUsersColumns();
  columns.forEach((item, index) => {
    dataJson[item.name] = dataArray[index];
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const { classes } = props;

  const handleClickDelete = () => {
    console.log(dataJson);
    UserService.delete(dataJson.username).then((ok) => {
      if (ok) window.location.reload();
    });
  };

  return (
    <div className={classes.iconContainer}>
      <Tooltip title={"Open selected"}>
        <IconButton className={classes.iconButton} onClick={handleClickOpen}>
          <OpenInNewIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
      <UserDetails open={open} setOpen={setOpen} data={dataJson} />
      <Tooltip title={"Delete"}>
        <IconButton className={classes.iconButton} onClick={handleClickDelete}>
          <Delete className={classes.icon} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelectAdmin",
})(CustomToolbarSelectAdmin);
