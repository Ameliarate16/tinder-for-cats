import React, { Component } from 'react';

class Likes extends Component{
    constructor(props){
        super(props);
    }



    render() {
        return (
            <div className="likes">
                <h3>Likes</h3>
                <ul>
                    {this.props.cats.map((cat) => {
                        return (
                            <li key={cat.name["$t"]}>
                                <a href={cat.contact.email?"mailto:"+cat.contact.email["$t"]:""}>
                                    {cat.name["$t"]}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
};

export default Likes;