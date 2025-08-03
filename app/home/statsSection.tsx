"use client"
import React from 'react';
import { Users, TrendingUp, Award, CheckCircle } from 'lucide-react';

const stats = [
  { icon: Users, value: '50K+', label: 'Happy Customers' },
  { icon: TrendingUp, value: '99.9%', label: 'Success Rate' },
  { icon: Award, value: '24/7', label: 'Support' },
  { icon: CheckCircle, value: '1M+', label: 'Transactions' }
];

export function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}