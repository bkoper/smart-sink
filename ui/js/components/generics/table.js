import React from 'react';
import Label from '../generics/warning-label';

export default (props) => {
    const items = props.items.map( (item, i) => {
        return (
            <tr key={i}>
                <td>{item.label}</td>
                <td>
                    {item.val1}&nbsp;
                    {item.val1Info && <Label txt={item.val1Info} type={item.val1Info} />}
                </td>
                <td>
                    {item.val2}&nbsp;
                    {item.val2Info && <Label txt={item.val2Info} type={item.val2Info} />}
                </td>
            </tr>
        )
    });

    return (
        <table className="table table-striped table-hover">
            <tbody>{items}</tbody>
        </table>
    )
};

