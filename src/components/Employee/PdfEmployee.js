import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
class PdfEmployee extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      item: this.props.item
    }
  }
  render(){
    return(
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>ID: {this.state.item.idtableEmployeeId}</Text>
            <Text>Name: {this.state.item.name}</Text>
            <Text>Email Adress: {this.state.item.tableEmployeeEmailAddress}</Text>
            <Text>Date of Birth: {this.state.item.tableEmployeeDOB.split("T")[0]}</Text>
            <Text>Date of Joining: {this.state.item.tableEmployeeDOJ.split("T")[0]}</Text>
            <Text>Salary: {this.state.item.tableEmployeeSalary}</Text>
            <Text>Gender: {this.state.item.tableEmployeeGender}</Text>
            <Text>Role: {this.state.item.tableEmployeeRole}</Text>
          </View>
        </Page>
      </Document>
    );
  }
}

export default PdfEmployee;