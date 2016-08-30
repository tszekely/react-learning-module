import React from 'react';

import { Image } from 'react-bootstrap';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

let src ='/images/404-page2.png';

if (canUseDOM) {
  src = require('../../images/404-page2.png');
}

// import img404 from ;

function NotFound() {
  return (
    <div>
      <Image
        src={src}
        alt="Page not found"
        className="img-responsive center-block" />
    </div>
  );
}

export default NotFound;