import React from 'react';
import { Card } from 'react-bootstrap';
/* eslint-disable */
function Job({ job }) {
  return (
    <Card>
      <Card.Body>
        <div className="justify-content-between">
          <div>
            <Card.Title>
              {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
            </Card.Title>
          </div>

        </div>
      </Card.Body>
    </Card>
  );
}

export default Job;
