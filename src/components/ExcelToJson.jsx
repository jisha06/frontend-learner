import React from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import NavbarComponent from "./Navbar";
import { Container, Row, Col } from "react-bootstrap";

class ExcelToJson extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: "",
    };
  }

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    console.log(file);
    this.setState({ file });

    console.log(this.state.file);
  }

  readFile() {
    var f = this.state.file;
    // var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      console.log("Data>>>" + data);// shows that excel data is read
      const jsonData = this.convertToJson(data);
      console.log(jsonData); // shows data in json format
      axios.post('http://localhost:3001/api/addlearnercsv', jsonData)
        .then(response => {
          console.log(response.data);
          // handle success
        })
        .catch(error => {
          console.log(error);
          // handle error
        });
    };
    reader.readAsBinaryString(f);
  }

  convertToJson(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  render() {
    return (
      <>
      <NavbarComponent/>
      <Container style={{marginLeft:'20%',
                        marginTop:'10em',
                        border:"1px solid black",
                        paddingTop:'15px',
                        width:'50%'}}>
        <Row>
          <Col xs={12} md={6}>
            <div className="mb-3">
              <input
                type="file"
                id="file"
                ref="fileUploader"
                onChange={this.filePathset.bind(this)}
              />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="mb-3">
              <button
                onClick={() => {
                  this.readFile();
                }}
              >
                Read File
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default ExcelToJson;


