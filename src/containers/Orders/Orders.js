import React, { useEffect } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const Orders = (props) => {
  const fetchOrders = props.onFetchOrders;
  const token = props.token;
  const userId = props.userId;

  useEffect(() => {
    fetchOrders(token, userId);
  }, [fetchOrders, token, userId]);

  let orders = <Spinner />;

  if (!props.loading) {
    orders = props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
      />
    ));
  }

  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
