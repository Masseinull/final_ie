import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { styled } from "@material-ui/styles";
import { Box } from "@mui/system";
import { useMediaQuery } from "@material-ui/core";

// box style
const BoxStyle = styled(Box)(({ theme }) => ({
  margin: `${theme.spacing(4)}px auto`,
  borderRadius: theme.spacing(2),
  boxShadow: `rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px`,
  overflow: "hidden",

  //border: "2px solid teal",
}));
export default function Term() {
    // media queries
    const less400 = useMediaQuery("(max-width:400px)");
    const less480 = useMediaQuery("(max-width:480px)");
    const less600 = useMediaQuery("(max-width:600px)");
    const less768 = useMediaQuery("(max-width:768px)");
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/terms`, 
        {
          headers: {Authorization : `Bearer ${sessionStorage.getItem("token")}`
        }}).then((response) => {
                console.log(response.data)
                setAPIData(response.data);
            })
    }, []);

    const setData = (data) => {
        let { id, current, } = data;
        localStorage.setItem('Name', id);
        localStorage.setItem('Current', current);
    }

    const getData = () => {
      axios.get(`http://localhost:8080/api/terms`, 
      {
        headers: {Authorization : `Bearer ${sessionStorage.getItem("token")}`
      }}).then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
      console.log("we are here")
      console.log(id)
        axios.delete(`http://localhost:8080/api/term/${id}`,
        {headers: {Authorization : `Bearer ${sessionStorage.getItem("token")}`}
        }).then(() => {
            getData();
        })
    }

    return (    
    <>
      <Helmet>
        <title>ترم ها | انتخاب واحد</title>
      </Helmet>

      <BoxStyle
          sx={{
            width: less400
              ? 300
              : less480
              ? 360
              : less600
              ? 540
              : less768
              ? 440
              : "100%",
          }}
        >
                <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>شماره ترم</Table.HeaderCell>
                        <Table.HeaderCell>وضعیت</Table.HeaderCell>
                        <Table.HeaderCell>آپدیت</Table.HeaderCell>
                        <Table.HeaderCell>حذف</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.term_id}</Table.Cell>
                                <Table.Cell>{data.current_term ? 'Checked' : 'Unchecked'}</Table.Cell>
                                <Link to='/uTerm'>
                                    <Table.Cell> 
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.term_id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </BoxStyle>

            </>

    )
}
