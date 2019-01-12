import React, { Component } from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import { UserConsumer } from "../utils/UserContext";

class ImpulseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      impulses: null
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      if (this.props.user) {
        this.fetchImpulses();
      }
    }
  }
  
  fetchImpulses = () => {
    const userId = this.props.user.id;
    fetch(`http://localhost:3000/users/${userId}/impulses`, {
      method: "GET",
      credentials: "include"
    })
    .then(response => response.json())
    .then(data => this.setState({
      impulses: data.impulses
    }))
  }

  deleteImpulse = (id) => {
    const userId = this.props.user.id;
    fetch(`http://localhost:3000/users/${userId}/impulses/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
    .then(response => response.json())
    .then(data => this.setState({
      impulses: data.remaining_impulses
    }))
  }

  render() {
    const { classes } = this.props;
    if (!this.state.impulses) { return null; }
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Impulse</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Remind Me</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.impulses.map(impulse => {
              return (
                <TableRow key={impulse.id}>
                  <TableCell component="th" scope="impulse">
                    {impulse.name}
                  </TableCell>
                  <TableCell align="right">{impulse.price}</TableCell>
                  <TableCell align="right">{moment(impulse.remind_at).fromNow()}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => this.deleteImpulse(impulse.id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const StyledImpulseList = withStyles(styles)(ImpulseList)


export default React.forwardRef((props, ref) => (
  <UserConsumer>
    {user => <StyledImpulseList {...props} user={user} ref={ref} />}
  </UserConsumer>
));
