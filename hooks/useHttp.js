import React from 'react';
import { View, Text } from 'react-native';
import useFetch from 'use-http'

export default function useHttp(options = {
  cachePolicy: 'no-cache' // important
}) {
  return useFetch('https://minor-project-uec-sky-dr-kj.herokuapp.com', options)
}
