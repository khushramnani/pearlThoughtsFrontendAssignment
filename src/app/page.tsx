'use client';

import { useState } from "react";
import { ContactInfo } from "@/Components/ContactInfo";
import { Qualifications } from "@/Components/Qualifications";
import { TeacherDetails } from "@/Components/TeacherDetails";
// import { ScheduleTable } from "@/Components/ScheduleTable";
import { Analytics } from "@/Components/AnalyticsContainer";
import { DashboardLayout } from "@/Components/DashboardLayout";
import { PaymentInterface } from "@/Components/PaymentInterface";

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 sm:space-y-8">
            {/* Teacher Profile Section */}
            <TeacherDetails />
            
            {/* Contact Information */}
            <ContactInfo />
            
            {/* Qualifications Section - Responsive Grid */}
            <div className="grid w-full gap-6 lg:gap-8">
              <Qualifications />
            </div>
            
            {/* Analytics Section */}
            <Analytics />
            
            {/* Schedule Section */}
            {/* <ScheduleTable /> */}
          </div>
        );
      
      case 'payment':
        return (
          <div className="flex justify-center items-start min-h-full pt-8">
            <div className="w-full max-w-2xl">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Center</h1>
                <p className="text-gray-600">Secure payment processing for your educational services</p>
              </div>
              <PaymentInterface />
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Comprehensive insights and performance metrics</p>
            </div>
            <Analytics />
          </div>
        );
      
      case 'teachers':
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Teachers Management</h1>
              <p className="text-gray-600">Manage teacher profiles and information</p>
            </div>
            <TeacherDetails />
            <ContactInfo />
            <Qualifications />
          </div>
        );
      
      case 'students':
        return (
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Students Management</h1>
            <p className="text-gray-600">Student management features coming soon...</p>
          </div>
        );
      
      case 'subjects':
        return (
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Subjects Management</h1>
            <p className="text-gray-600">Subject management features coming soon...</p>
          </div>
        );
      
      case 'schedule':
        return (
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Schedule Management</h1>
            <p className="text-gray-600">Schedule management features coming soon...</p>
          </div>
        );
      
      case 'assignments':
        return (
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Assignments</h1>
            <p className="text-gray-600">Assignment management features coming soon...</p>
          </div>
        );
      
      case 'messages':
        return (
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Messages</h1>
            <p className="text-gray-600">Messaging features coming soon...</p>
          </div>
        );
      
      case 'settings':
        return (
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6 sm:space-y-8">
            <TeacherDetails />
            <ContactInfo />
            <div className="grid w-full gap-6 lg:gap-8">
              <Qualifications />
            </div>
            <Analytics />
          </div>
        );
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={handleTabChange}>
      {renderContent()}
    </DashboardLayout>
  );
}
