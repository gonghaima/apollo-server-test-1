import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled, { css } from "react-emotion";
import galaxy from "../assets/images/galaxy.jpg";
import iss from "../assets/images/iss.jpg";
import moon from "../assets/images/moon.jpg";
import { useQuery } from "@apollo/react-hooks";
import Card from "../components/card"
import { unit } from "../styles";
import { Loading, Header } from "../components";
import { ALink } from "../components/button";
import { DisplayState } from '../components/helper';
import CreateProductForm from "../components/create-product-form"


export default function CreateProduct() {
  return (
    <Fragment>
      <Header />
      <CreateProductForm />
    </Fragment>
  );
}
