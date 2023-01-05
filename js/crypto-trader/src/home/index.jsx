import React from 'react';

import { accountService } from '@/_services';
import {HomePage} from "./HomePage";

function Home() {
    const user = accountService.userValue;
    
    return (
            <div className="container">
                <HomePage/>
            </div>

    );
}

export { Home };