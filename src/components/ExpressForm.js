import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Assignment from '@material-ui/icons/Assignment'
import AttachMoney from '@material-ui/icons/AttachMoney'
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CustomInput from '../losecomponents/CustomInput/CustomInput'


// no param pass in means current time
const now = moment();
// console.log(now.format('MMM Do, YYYY'))

const CustomAssigment = withStyles((theme) => ({
  "root": {
    fontSize: "19px"
  }

}))(Assignment)
const CustomMoneyIcon = withStyles(() => ({
  "root": {
    fontSize: "21px"
  }
}))(AttachMoney)

const PrimaryButton = withStyles(() => ({
  "extended": {
    width: "15rem",
    fontSize: "13px"
  }
}))(Fab)


export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    }

  }


  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }))
  }
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }))
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }))
    }

  }
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  }
  onFocusChange = ({ focused }) => {
    this.setState(() => ({
      calendarFocused: focused
    }))

  }
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount)
      this.setState(() => ({ error: "Please provide description and amount" }))
    else {
      this.setState(() => ({ error: '' }))
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      })
    }


  }
  render() {
    return (

      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit} >
          {/* <TextField
                id="input-with-icon-textfield"
                value={this.state.description}
                fullWidth
                onChange={this.onDescriptionChange}
                placeholder='Product Name'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CustomAssigment size="2.5rem"/>
                    </InputAdornment >),
                  style: {
                    fontSize: "2rem",
                    marginBottom: "12px"
                  }
                }}
              /> */}

          <CustomInput
            id="float"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CustomAssigment size="2.5rem" />
                </InputAdornment>
              ),
              placeholder: "Description",
            }}
            value={this.state.description}
            onChange={this.onDescriptionChange}

          />

          <div className="input-group">
            <div className="input-group__item">
              <CustomInput
                placeholder='Cost'
                id="float"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CustomMoneyIcon size="2.5rem" />
                    </InputAdornment >),
                  placeholder: "Cost",
                }}
                value={this.state.amount}
                onChange={this.onAmountChange}

              />
            </div>
            <div className="input-group__date">
              <SingleDatePicker
                date={this.state.createdAt}
                onDateChange={this.onDateChange}
                focused={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
              />
            </div>
          </div>

          <PrimaryButton type="submit" variant="extended" color="primary" aria-label="add"   >
            Save
        </PrimaryButton>
          {/* <button className="button-sytle__edit" >Save</button> */}



        </form>
      </div>
    )
  }
}