import React,{useEffect} from "react";
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import History from '../../History/History';


function Dashboard(){

    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return(
        <DashboardStyles>
            <InnerLayout>
            <h1>Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                        <p>${incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : 0}</p>
                        <p>${incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : 0}</p>

                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                        <p>${expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : 0}</p>
                        <p>${expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : 0}</p>

                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyles>
    )
}

const DashboardStyles = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }
                .balance {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2rem; /* Thoda spacing adjust karna */

    p {
        display: flex;
        align-items: center;
        font-size: 2.5rem; /* Font size optimize karna */
        font-weight: bold;
        color: var(--color-green);
        white-space: nowrap; /* Ek line me rakhne ke liye */
    }

    .currency {
        font-size: 3rem; /* Dollar sign ka size adjust */
        margin-right: 0.3rem;
    }

    .amount {
        font-size: 3rem; /* Amount ka size bhi same rakhna */
    }
}

            }
        }
        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard