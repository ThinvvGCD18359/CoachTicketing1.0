import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import coachApi from '../../../../api/coachApi';
import Banner from '../../../../layouts/Banner';
import Footer from '../../../../layouts/Footer';
import Header from '../../../../layouts/Header';
import Coach from '../../components/CoachTable';


export default function CoachTable() {
  const [coach, setCoach] = useState([]);
  const currentUserId = useSelector(state => state.user.current.id);

  useEffect(() => {
    const getCoachDetail = async () => {
      if (!currentUserId) return
      const response = await coachApi.getOwnerCoaches({ currentUserId });
      setCoach(response);
    }
    getCoachDetail();
  }, [currentUserId]);

  const removeItem = (id) => {
    setCoach(prev => {
      return prev.filter(item => item.id !== id);
    });
  };

  const handleUpdateRowInCoach = (response) => {
    setCoach((prev) => {
      const findIndex = prev.findIndex(item => item.id === response.editCoach.id);
      prev[findIndex].name = response.editCoach.name;
      prev[findIndex].plates = response.editCoach.plates;
      prev[findIndex].phonenumber = response.editCoach.phonenumber;
      prev[findIndex].Route.starting = response.editRoute.starting;
      prev[findIndex].Route.destination = response.editRoute.destination;
      prev[findIndex].Route.departure = response.editRoute.departure;
      prev[findIndex].Route.price = response.editRoute.price;
      return [...prev]
    })
  };

  return (
    <Container maxWidth="lg">
      <Header />
      <Banner />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell >Name</TableCell>
              <TableCell >From</TableCell>
              <TableCell >To</TableCell>
              <TableCell >Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coach.map((row) => (
              <Coach key={row.id} row={row} removeItem={removeItem} handleUpdateRowInCoach={handleUpdateRowInCoach} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </Container>
  );
}
