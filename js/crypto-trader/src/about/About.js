import React from 'react';
import {AboutDiv} from "../resources/Styles";


export const About = () => (
    <AboutDiv>
        <h2>What Is "Practice-Crypto"</h2>
        <p>Started in 2020, Practice-Crypto aims to allow users to try their hand at cryptocurrency trading with real
            time prices.
            By pulling information available live from Coinbase we can give a good estimation of your theoretical growth
            over time, and
            with the ability to practice trading with any number of the currencies on Coinbase, with any theoretical
            amount of seed money,
            this project can help you determine if this market is advantageous to you!</p>
        <p>To get started, you will need to make an account. Admittedly, this is a small scale project, with small scale
            security. We urge you to not enter a real email, and possibly to not use a real name.
            You will only need to remember your username and your password to return and login.</p>
        <p>Once an account is created, switch to your account tab. You will see a prompt to create a new "Wallet" which
            will allow you to select a seed amount. Then head to the trading page.</p>
        <p>At the trading page you will see a drop-down to select the wallet you wish to work with. Select the new
            wallet and start buying! Head back to your account to create
            new wallets, and to track the value of your existing "investments".</p>
        <h3>Who made this project?</h3>
        <p>Hi, we are the students who were challenged to complete this project.</p>
        <p>During the COVID pandemic, it was hard to find an internship, and with the uncertainty of the fall semester
            facing us, a course geared towards offering a internship-level experience sounded
            incredibly appealing. We were suggested to take on full stack work if we were to build an app. Heading into
            this project, only one member had worked with JavaScript before, so its
            a token of pride to us that we progressed as far as we have. We all decided this was one of the most
            rewarding projects we participated in as we watched our team work compile into a full reactive
            web app.</p>
        <h3>About the technology</h3>
        <p>Practice-Crypto was originally a Ubuntu installation on a desktop that was PPTP tunneled into a dedicated IP,
            running Apache2, and was aimed to be a React app with Express for interaction with MySQL.
            At the time of this writing, we moved to the Google Cloud Compute Engine platform for hosting, due to uptime
            inconsistencies, and steered to NGINX for routing on the server, with PM2 for running the local
            Express server. We utilized yarn for package management and development on the React based front end, where
            we spent time learning component based design, and partnered it with Redux along with many other useful
            tools. We utilize a middleware proxy to handle
            HTTP requests to the Express server, which utilizes Sequelize for connecting and editing the MySQL server,
            also running on the VM. Admittedly we arent cyber security majors, and considered many of the security
            concerns that
            a project this size would come with to be out of our scope. Regardless, going from our starting point in
            September 2020, to our current position in November of 2020, we have learned so much.</p>
    </AboutDiv>
)