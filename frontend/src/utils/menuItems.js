import { dashboard, expenses, transactions, trend } from "../utils/Icons"

export const menuItems =[
    {
        id:1,
        title: 'Dashbord',
        icon:dashboard,
        link:'/dashboard',
    },
    {
        id:2,
        title: 'Incomes',
        icon:trend,
        link:'/incomes',
    },
    {
        id:3,
        title: 'Expenses',
        icon:expenses,
        link:'/expenses',
    }
];