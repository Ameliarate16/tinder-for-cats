import React from 'react';
import CatSearch from './CatSearch';

function Profile (props) {
    return (
        <div className="profile">
            <h3>New Match!</h3>
            <CatSearch likeCallback={props.likeCallback}/>
        </div>
    );
};

export default Profile;