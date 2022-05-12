import React from 'react';
import "./home.css";
//import ImportData from '../import_data/import_data';
//import bilogo from '../../../public/img/bilogo';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form,Toast } from 'react-bootstrap';
import ImportData from '../import_data/import_data';
import ChartComponent from '../chart/chart_component';
var XLSX = require("xlsx");
class Home extends React.Component {
  constructor(props) {
    super(props)
    // Set initial state 
    this.state = {
      show: false,
      fileObj: {},
      excel_data: [],
      processing_done: false,
      columns: [],
      showChart:false,
      xAxis:"",
      yAxis:"",
      chartOpt:false,
      chart:"",
      chartData:{},
      showToast:false
    }
  }
  toggleShowA(){
    this.setState({showToast:false})
  }
  showToast(){
    this.setState({showToast:true})
  }
  dataLoad() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false });
  }
  inputFile(e) {
    this.setState({ fileObj: e.target.files[0] })
  }
  dataProcess() {
    this.handleClose();
    var reader = new FileReader();

    reader.readAsArrayBuffer(this.state.fileObj)
    reader.onload = (file) => {
      var data = new Uint8Array(reader.result)

      var workbook = XLSX.read(data, { type: 'array' });
      const ws = workbook.Sheets[workbook.SheetNames[0]];
      this.setState({ excel_data: XLSX.utils.sheet_to_json(ws) })
     // console.log(XLSX.utils.sheet_to_json(ws));
      this.setState({ processing_done: true });
      this.setState({ columns: Object.keys(XLSX.utils.sheet_to_json(ws)[0]) });
      this.showToast()
    }

  }

  selectX(e){
    
    this.setState({xAxis:e.target.value})
  }

  selectY(e){
    console.log("=y==>",e.target.value);
    this.setState({yAxis:e.target.value});
   
    if(this.state.xAxis!=''){
     
      this.setState({chartOpt:true})
    }
  }
  selectChart(e){
    this.setState({chart:e.target.value});
    let keys=Object.keys(this.state.excel_data[0])
    let level={"x":[],"y":[],"level":[],"chartType":e.target.value}
    level.level.push(this.state.xAxis)
    level.level.push(this.state.yAxis)
   for(let i=0;i<this.state.excel_data.length;i++){
     level.x.push(this.state.excel_data[i][this.state.xAxis])
     level.y.push(this.state.excel_data[i][this.state.yAxis])
     
   }
    console.log("====>",level);
    this.setState({chartData:level})
    this.setState({showChart:true});
  }

  render() {
    return <>
    {this.state.showChart?<div>
    <Button onClick={()=>{this.setState({showChart:false})}}>back</Button>
    <ChartComponent chartData={this.state.chartData}/></div>:<div>
      <button className="import" onClick={() => { this.dataLoad() }}>Import your data</button>
      {this.state.columns.length > 0 ? <div><Form.Label htmlFor="inputPassword5">select X axis</Form.Label>
      <Form.Select aria-label="Default select example" onChange={(e) => { this.selectX(e) }}>
        <option keys={0}>Open this select menu</option>
        {this.state.columns.map((data, i) => {

          return <option keys={i+1} value={data}>{data}</option>
        })

        }
      </Form.Select></div> : null}

      {/* y axis select */}
      {this.state.columns.length > 0 ? <div><Form.Label htmlFor="inputPassword5">select y axis</Form.Label><Form.Select aria-label="Default select example" onChange={(e) => { this.selectY(e) }}>
        <option keys={0}>Open this select menu</option>
        {this.state.columns.map((data, i) => {

          return <option keys={i+1} value={data}>{data}</option>
        })

        }
      </Form.Select></div> : null}
      {
        this.state.chartOpt?<div><Form.Label htmlFor="inputPassword5">select chart axis</Form.Label><Form.Select aria-label="Default select example" onChange={(e) => { this.selectChart(e) }}>
        <option keys={0}>Open this select menu</option>
        <option keys={1} value="bar">Bar char</option>
        <option keys={2} value="line">Line chartOpt</option>
        <option keys={3} value="pie">pie chart</option>
        
      </Form.Select></div>:null
      }
      {this.state.processing_done ? <ImportData TableData={this.state.excel_data} /> : null}

      {/* =============modal ========================*/}
      <Modal show={this.state.show} onHide={() => { this.handleClose() }}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><input className="" type="file" onChange={(e) => { this.inputFile(e) }} /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { this.handleClose() }}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { this.dataProcess() }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    }
    <Toast show={this.state.showToast} onClose={()=>{this.toggleShowA()}} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Bootstrap</strong>
            
          </Toast.Header>
          <Toast.Body>document upladed successfully!!</Toast.Body>
        </Toast>
    </>;
  }
}

export default Home;