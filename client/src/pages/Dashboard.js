import React from 'react'
import {Switch,Route} from 'react-router-dom'
import './css/dashboard.css'

import SideMenu from '../components/sideMenu/SideMenu'
import Profile from './dashboardPages/Profile.js'
import Payment from './dashboardPages/Payment'
import EditProfile from './dashboardPages/EditProfile'
import DeleteProfile from './dashboardPages/DeleteProfile'
import EditPayment from './dashboardPages/EditPayment'
import OngoingOrders from './dashboardPages/OngoingOrders'
import CompletedOrders from './dashboardPages/CompletedOrders'
import SellerProfile from './dashboardPages/SellerProfile'
import ActivePosts from './dashboardPages/ActivePosts'
import CompletedSales from './dashboardPages/CompletedSales'


function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className="dashboard-sidemenu-container">
                <SideMenu/>
            </div>
            <div className="dashboard-page-container">
                <Switch>
                    <Route exact path="/nav/dashboard/" component={Profile}/>
                    <Route path="/nav/dashboard/payment" component={Payment}/>
                    <Route path="/nav/dashboard/editProfile" component={EditProfile}/>
                    <Route path="/nav/dashboard/deleteProfile" component={DeleteProfile}/>
                    <Route path="/nav/dashboard/editPayment" component={EditPayment}/>
                    <Route path="/nav/dashboard/ongoingOrders" component={OngoingOrders}/>
                    <Route path="/nav/dashboard/completedOrders" component={CompletedOrders}/>
                    <Route path="/nav/dashboard/sellerProfile" component={SellerProfile}/>
                    <Route path="/nav/dashboard/activePosts" component={ActivePosts}/>
                    <Route path="/nav/dashboard/completedSales" component={CompletedSales}/>
                </Switch>
            </div>
           
        </div>
    )
}

export default Dashboard
