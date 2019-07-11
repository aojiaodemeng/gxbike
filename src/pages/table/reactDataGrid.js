import React,{Component} from 'react'
import ReactDataGrid from 'react-data-grid';


const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
  { key: 'count', name: 'Count' } ];

const rows = [{id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];

export default class ReactDataGridComponent extends Component{
	columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
  { key: 'count', name: 'Count' } ];
  rows = [{id: 0, title: 'row1', count: 20,width:100}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];
	render(){
		return(
			<div>
				<ReactDataGrid
				  columns={columns}
				  rowGetter={i => rows[i]}
				  rowsCount={2}
				  minHeight={150} 
			    />
			</div>
		)
	}
}