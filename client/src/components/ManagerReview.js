import React from "react";

const ManagerReview = (props) => {
    const { quarterlyCheckIn, quarterlyCycle, feedback, rating } = props;

    if (!feedback) {
        return null;
    }
    return (
        <div className="managerReview">
            <h1 className="h3">Manager Review Comments</h1>
            <p>Quarterly CheckIn: {quarterlyCycle}</p>
            <p>Quarterly CheckIn: {quarterlyCheckIn}</p>
            <p>Manager Rating: {rating} </p>
            <textarea value={feedback} disabled></textarea>
        </div>
    );
}

export default ManagerReview;
