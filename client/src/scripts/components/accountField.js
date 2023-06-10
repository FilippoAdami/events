import React from 'react';


function AccountField(props)
{
    return(
        <>
        <label>
        <input type="text" name={props.field} defaultValue={props.value}/>
        </label><br/>
        </>
    )
}

export default AccountField;


