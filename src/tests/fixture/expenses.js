import moment from 'moment'
export default [
  {
    id:'1',
    description: 'Gum',
    note:'',
    amount:'500',
    createdAt:moment(0).valueOf()
  },
  {
    id:'2',
    description: 'item 2',
    note:'',
    amount:'5067000',
    createdAt:moment(0).subtract(4, 'days').valueOf()
  },
  {
    id:'3',
    description: 'item 3',
    note:'abcd',
    amount:'5067',
    createdAt:moment(0).add(4, 'days').valueOf()
  }

]