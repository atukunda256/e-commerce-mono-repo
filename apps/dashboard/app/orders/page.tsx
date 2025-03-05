'use client';

import React, { useState } from 'react';
import { trpc } from '../../utils/trpc';

export default function OrdersPage() {
  const { data: orders, isLoading, refetch } = trpc.order.getAll.useQuery();
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl sm:truncate">Orders</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage customer orders from your store.
          </p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <svg className="animate-spin h-12 w-12 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-lg text-gray-600">Loading orders...</p>
            </div>
          ) : orders && orders.length > 0 ? (
            <div className="flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Order ID</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Items</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">View</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map((order) => (
                        <React.Fragment key={order.id}>
                          <tr className={expandedOrderId === order.id ? 'bg-indigo-50' : 'hover:bg-gray-50'}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">#{order.id}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.totalItems} items</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">${order.totalAmount.toFixed(2)}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Completed
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <button
                                onClick={() => toggleOrderDetails(order.id)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                {expandedOrderId === order.id ? 'Hide details' : 'View details'}
                                <span className="sr-only">, order #{order.id}</span>
                              </button>
                            </td>
                          </tr>
                          
                          {expandedOrderId === order.id && (
                            <tr>
                              <td colSpan={6} className="px-4 py-4 sm:px-6">
                                <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                                  <div className="px-4 py-5 sm:px-6 bg-gray-50">
                                    <h3 className="text-sm font-medium leading-6 text-gray-900">Order Details</h3>
                                  </div>
                                  <div className="border-t border-gray-200">
                                    <div className="px-4 py-5 sm:p-6">
                                      <h4 className="text-sm font-medium text-gray-500 mb-3">Items in Order</h4>
                                      <ul className="divide-y divide-gray-200">
                                        {order.items.map((item) => (
                                          <li key={item.id} className="py-3 flex justify-between items-center">
                                            <div className="flex items-center">
                                              <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">{item.product?.name || 'Unknown Product'}</p>
                                                <p className="text-sm text-gray-500">
                                                  ${item.priceAtOrder.toFixed(2)} × {item.quantity}
                                                </p>
                                              </div>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">
                                              ${(item.priceAtOrder * item.quantity).toFixed(2)}
                                            </p>
                                          </li>
                                        ))}
                                      </ul>
                                      
                                      <div className="mt-5 pt-5 border-t border-gray-200">
                                        <div className="flex justify-between text-sm">
                                          <p className="font-medium text-gray-500">Subtotal</p>
                                          <p className="font-medium text-gray-900">${order.totalAmount.toFixed(2)}</p>
                                        </div>
                                        <div className="mt-1 flex justify-between text-sm">
                                          <p className="font-medium text-gray-500">Shipping</p>
                                          <p className="font-medium text-gray-900">Free</p>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between">
                                          <p className="text-base font-medium text-gray-900">Total</p>
                                          <p className="text-base font-medium text-gray-900">${order.totalAmount.toFixed(2)}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <svg 
                className="mx-auto h-16 w-16 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-900">No orders found</h3>
              <p className="mt-2 text-lg text-gray-600">
                Your customers' orders will appear here once they make a purchase.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}