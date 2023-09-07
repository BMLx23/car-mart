import React, { useEffect, useState } from 'react'

function SalespeopleList() {
    const [salespeople, setSalespeople] = useState([])

    async function loadSalespeople() {
        const response = await fetch("http://localhost:8090/api/salespeople/")
        if (response.ok) {
            const data = await response.json()
            setSalespeople(data.salespeople)
        } else {
            console.error(response)
        }
    }

    useEffect(() => {
        loadSalespeople()
    }, [])

    return (
        <>
        <br />
        <h1>Salespeople</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                { salespeople?.map(salespeople => {
                    return (
                        <tr key={ salespeople.employee_id }>
                            <td>{ salespeople.employee_id }</td>
                            <td>{ salespeople.first_name }</td>
                            <td>{ salespeople.last_name }</td>
                        </tr>
                        )
                    })}
            </tbody>
        </table>
    </>

    )
}

export default SalespeopleList
