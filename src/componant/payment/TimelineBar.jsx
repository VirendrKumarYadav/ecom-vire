import React from 'react';
import '../../App.css';

const TimelineBar = ({ currentStep }) => {
  return (
    <div className="timeline-bar">
      <div className={`step ${currentStep === 'new-order' ? 'active' : ''}`}>
        <div className="step-icon">1</div>
        <div className="step-label">New Order</div>
      </div>
      <div className={`step ${currentStep === 'review-order' ? 'active' : ''}`}>
        <div className="step-icon">2</div>
        <div className="step-label">Review Order</div>
      </div>
      <div
        className={`step ${currentStep === 'order-confirmation' ? 'active' : ''}`}
      >
        <div className="step-icon">3</div>
        <div className="step-label">Order Confirmation</div>
      </div>
    </div>
  );
};

export default TimelineBar;