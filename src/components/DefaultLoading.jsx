import React from 'react';
import { Spinner } from 'reactstrap';

const DefaultLoading = () => (
    <div className="animated fadeIn pt-3 text-center">
        <Spinner color="primary" />
    </div>
);

export default DefaultLoading;