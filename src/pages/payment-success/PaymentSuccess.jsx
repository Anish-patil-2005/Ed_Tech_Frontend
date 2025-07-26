import React from 'react';
import { Link, useParams } from 'react-router-dom';

const PaymentSuccess = ({ user }) => {
  const params = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      {user && (
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center border border-green-200">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
          <p className="text-gray-700 mb-2">Your course subscription has been activated.</p>
          <p className="text-sm text-gray-500 mb-6">Reference Number: <span className="font-mono">{params.id}</span></p>
          <Link
            to={`/${user._id}/dashboard`}
            className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
