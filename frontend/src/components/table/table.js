import React from 'react'
import classes from './table.css';

const table = (props) => {
    return (
        <div className={classes.Table}>
            <table>
                <tr>
                    <th>WebsiteId</th>
                    <th>Chats</th>
                    <th>Missed Chats</th>
                </tr>
                {props.records.map(e => (
                    <tr>
                        <td >{e.websiteId}</td>
                        <td>{e.chats}</td>
                        <td>{e.missedChats}</td>
                    </tr>
                ))}

            </table>
        </div >
    )
}

export default table
