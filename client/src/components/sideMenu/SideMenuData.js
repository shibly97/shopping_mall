export const sideMenuData = [
    {
        title: "Profile",
        path: "/nav/dashboard",
        icon: <span class="iconify" data-icon="mdi:account-details" data-inline="false"></span>,
        
    },
    {
        title: "Payment Methods",
        path: "/nav/dashboard/payment",
        icon: <span class="iconify" data-icon="mdi:credit-card-outline" data-inline="false"></span>,
        
    },
    {
        title: "Profile Settings",
        path: '#',
        icon: <span class="iconify" data-icon="mdi:account-cog" data-inline="false"></span>,
        subMenu: [
            {
                title: "Edit Profile",
                path: "/nav/dashboard/editProfile"
            },
            {
                title: "Delete Profile",
                path: "/nav/dashboard/deleteProfile"
            },
            {
                title: "Edit Payment",
                path: "/nav/dashboard/editPayment"
            }
        ]
    },
    {
        title: "Orders",
        path: '#',
        icon: <span class="iconify" data-icon="mdi:truck-fast" data-inline="false"></span>,
        subMenu: [
            {
                title: "Ongoing",
                path: "/nav/dashboard/ongoingOrders"
            },
            {
                title: "Completed",
                path: "/nav/dashboard/completedOrders"
            }
        ]
    },
    {
        title: "Seller",
        path: '#',
        icon: <span class="iconify" data-icon="mdi:account-tie" data-inline="false"></span>,
        subMenu: [
            {
                title: "Seller Profile",
                path: "/nav/dashboard/sellerProfile"
            },
            {
                title: "Active Posts",
                path: "/nav/dashboard/activePosts"
            },
            {
                title: "Completed Sales",
                path: "/nav/dashboard/completedSales"
            }
        ]
    }

]