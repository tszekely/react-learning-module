import React from 'react';

import { Image } from 'react-bootstrap';

function NotFound() {
  return (
    <div>
      <Image
        src="http://techfar.com/wp-content/uploads/2013/03/404-page2.png"
        alt="Page not found"
        className="img-responsive center-block" />
    </div>
  );
}

export default NotFound;