import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = (props) => {

  const filterClicked = (value) => {
    props.filterChange(value)
  }

  return (
    <div>
      kaikki    
      <input 
        type="radio" 
        name="filter" 
        onChange={() => filterClicked('ALL')}
      />
      tärkeät   
      <input
        type="radio"
        name="filter"
        onChange={() => filterClicked('IMPORTANT')}
      />
      eitärkeät 
      <input
        type="radio"
        name="filter"
        onChange={() => filterClicked('NONIMPORTANT')}
      />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange,
}

export default connect(
  null,
  mapDispatchToProps
)(VisibilityFilter)