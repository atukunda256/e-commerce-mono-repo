'use client';

import React, { useState } from 'react';
import { Badge } from '@repo/ui';

interface OrderItem {
  id: number;
  quantity: number;
  priceAtOrder: number;
  productId: number;
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
  } | null;
}

interface Order {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  items: OrderItem[];
  totalAmount: number;
  totalItems: number;
}

interface OrdersTableProps {
  orders: Order[];
  isLoading: boolean;
}

export default function OrdersTable({ orders, isLoading }: OrdersTableProps) {
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

  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center">
        <svg className="animate-spin h-12 w-12 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg text-gray-600">Loading orders...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
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
    );
  }

  return (
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
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">{order.totalItems} items</span>
                        <div className="text-xs text-gray-500 mt-1">
                          {order.items.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="truncate max-w-[180px]">
                              • {item.product?.name || 'Unknown Product'}
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <div className="text-gray-400">• and {order.items.length - 2} more...</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">${order.totalAmount.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <Badge variant="success" rounded="full" className='p-2'>Completed</Badge>
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
                              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mb-4">
                                <table className="min-w-full divide-y divide-gray-300">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                      <th scope="col" className="px-3 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200 bg-white">
                                    {order.items.map((item) => (
                                      <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                                          <div className="flex items-center">
                                            <div className="h-8 w-8 flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                                              <span className="text-xs font-medium">
                                                {item.product?.name ? item.product.name.substring(0, 2).toUpperCase() : 'NA'}
                                              </span>
                                            </div>
                                            <div className="ml-3">
                                              <div className="font-medium text-gray-900">{item.product?.name || 'Unknown Product'}</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          ${item.priceAtOrder.toFixed(2)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          {item.quantity}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium text-gray-900">
                                          ${(item.priceAtOrder * item.quantity).toFixed(2)}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              
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
  );
}