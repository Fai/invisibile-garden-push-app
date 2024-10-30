// Import Push SDK & Ethers
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import { ethers } from 'ethers';
// Import restapi for function calls
import axios from 'axios';

// Creating a random signer from a wallet, ideally this is the wallet you will connect
const signer = ethers.Wallet.createRandom();

// Initialize wallet user
// 'CONSTANTS.ENV.PROD' -> mainnet apps | 'CONSTANTS.ENV.STAGING' -> testnet apps
const userAlice = await PushAPI.initialize(signer, {
  env: CONSTANTS.ENV.STAGING,
});

// Function to fetch disaster data
async function fetchDisasterData(country) {
    const url = `https://api.reliefweb.int/v1/disasters?filter[field]=country&filter[value]=${country}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data from ReliefWeb API:', error);
      throw error;
    }
  }

// Function to send notification
async function sendNotification(message) {
    const notification = {
      title: 'Disaster Alert',
      body: message,
      // Replace with actual recipient address
      recipient: '0xB88460Bb2696CAb9D66013A05dFF29a28330689D', 
    };
  
    try {
      await userAlice.notification.send(notification);
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
  
  // Main function to check disaster and send notification
  async function checkAndNotify(country) {
    const disasterData = await fetchDisasterData(country);
    if (disasterData.data.length > 0) {
      const disaster = disasterData.data[0];
      const message = `Alert: There is a disaster in your area. Check details: ${disaster.href}`;
      await sendNotification(message);
    }
  }
  
  // Example usage
  checkAndNotify('Philippines');