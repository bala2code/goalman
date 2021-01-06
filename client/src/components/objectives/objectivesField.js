import React from "react";

export const ObjectivesField = ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ width: '100%' }} />
            <div className="text-danger" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};

export const ObjectivesFieldTextArea = ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <textarea {...input} style={{ width: '100%' }}></textarea>
            <div className="text-danger" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};

export const ObjectivesFieldSelect = ({ input, label, meta: { error, touched }, children, horizontal }) => {
    return (
        <div className="row-fluid no-gutters">
            <label className={horizontal ? 'col-3 ' : null}>{label}</label>
            <select className={horizontal ? 'col-3 no-gutters' : null} {...input} style={{ width: '100%' }}>
                {children}
            </select>
            <div className="text-danger" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};

