import React from 'react';
import api from '~/services/api';

// import { Container } from './styles';

export default function ListStudents() {
  api.get('plans');
  return <h1>ListaAlunos</h1>;
}
