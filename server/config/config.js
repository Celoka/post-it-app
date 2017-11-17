import firebase from 'firebase';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV;
let checkProcess = '';


if (env === 'test') {
  checkProcess = 'TEST';
} else if (env === 'production') {
  checkProcess = '';
}
dotenv.config();
/**
 * @description This contains App confirguration from google firebase
 */

const config = {
  apiKey: process.env[`${checkProcess}apiKey`],
  authDomain: process.env[`${checkProcess}authDomain`],
  databaseURL: process.env[`${checkProcess}databaseURL`],
  projectId: process.env[`${checkProcess}projectId`],
  storageBucket: process.env[`${checkProcess}storageBucket`],
  messagingSenderId: process.env[`${checkProcess}messagingSenderId`]
};
const db = firebase.initializeApp(config);
export default db;

