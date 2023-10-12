import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import cart from '../data/cart'
import CartListItem from '../../components/CartListItem'

const ShoppingCart = () => {
  return (
    <FlatList data={cart}
    renderItem={({item})=> <CartListItem cartItem={item} /> }
    />
  )
}
const styles = StyleSheet.create({})

export default ShoppingCart
